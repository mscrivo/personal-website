import { useReducedMotion } from 'motion/react'
import { Camera, Mesh, Program, Renderer, Sphere, Texture } from 'ogl'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec3 normal;

  uniform mat4 modelMatrix;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  varying vec3 vObjNormal;
  varying vec3 vObjPos;

  void main() {
    vObjNormal = normal;
    vObjPos = position;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;

  uniform sampler2D tLogo;
  uniform vec3 cameraPosition;

  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  varying vec3 vObjNormal;
  varying vec3 vObjPos;

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 L = normalize(vec3(0.5, 0.7, 0.9));
    float diff = clamp(dot(N, L), 0.0, 1.0);
    vec3 color = vec3(0.23) * (0.45 + diff * 1.05);

    // Fresnel rim for a bit of depth.
    vec3 V = normalize(cameraPosition - vWorldPos);
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0);
    color += vec3(0.18) * fres;

    // Logo decal, planar-projected from +Z in object space so it rides the
    // surface and only shows on the front-facing hemisphere.
    vec2 uv = vObjPos.xy * 0.74 + 0.5;
    float facing = smoothstep(0.05, 0.35, vObjNormal.z);
    if (uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0) {
      vec4 logo = texture2D(tLogo, vec2(uv.x, uv.y));
      color = mix(color, logo.rgb, logo.a * facing);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`

// One WebGL context (via OGL — a fraction of three.js's weight) renders every
// ball by scissoring the shared canvas to each tracked grid cell. The canvas is
// scoped to the skills grid rather than the viewport, so the drawing buffer
// stays small and scrolls with the section instead of compositing a fixed
// fullscreen layer over the whole page while scrolling.
const TechBallsOGL = ({
  technologies,
  cellRefs,
  containerRef,
  hoveredIndex,
}) => {
  // The render loop reads these through refs so it never restarts on hover or
  // motion-preference changes.
  const hoveredRef = useRef(hoveredIndex)
  const reduceMotion = useReducedMotion()
  const reduceRef = useRef(reduceMotion)

  useEffect(() => {
    hoveredRef.current = hoveredIndex
  }, [hoveredIndex])

  useEffect(() => {
    reduceRef.current = reduceMotion
  }, [reduceMotion])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    })
    const { gl } = renderer
    gl.clearColor(0, 0, 0, 0)

    const canvas = gl.canvas
    Object.assign(canvas.style, {
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
    })
    container.appendChild(canvas)

    const camera = new Camera(gl, { fov: 35, aspect: 1 })
    camera.position.set(0, 0, 5)
    camera.updateMatrixWorld()

    const geometry = new Sphere(gl, {
      radius: 1,
      widthSegments: 48,
      heightSegments: 48,
    })

    const textures = technologies.map((tech) => {
      const texture = new Texture(gl, {
        generateMipmaps: false,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        wrapS: gl.CLAMP_TO_EDGE,
        wrapT: gl.CLAMP_TO_EDGE,
      })
      const image = new Image()
      image.onload = () => (texture.image = image)
      image.src = tech.icon
      return texture
    })

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: { tLogo: { value: textures[0] } },
      cullFace: gl.BACK,
    })
    const mesh = new Mesh(gl, { geometry, program })

    const resize = () =>
      renderer.setSize(container.clientWidth, container.clientHeight)
    resize()
    window.addEventListener('resize', resize)

    let raf
    const start = performance.now()
    const render = () => {
      raf = requestAnimationFrame(render)
      const time = (performance.now() - start) / 1000
      const { dpr } = renderer
      const canvasRect = canvas.getBoundingClientRect()

      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.disable(gl.SCISSOR_TEST)
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.enable(gl.SCISSOR_TEST)
      gl.enable(gl.DEPTH_TEST)

      const reduce = reduceRef.current
      for (let i = 0; i < cellRefs.length; i += 1) {
        const el = cellRefs[i].current
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (
          rect.bottom < canvasRect.top ||
          rect.top > canvasRect.bottom ||
          rect.right < canvasRect.left ||
          rect.left > canvasRect.right
        ) {
          continue
        }

        const x = Math.round((rect.left - canvasRect.left) * dpr)
        const y = Math.round((canvasRect.bottom - rect.bottom) * dpr)
        const w = Math.round(rect.width * dpr)
        const h = Math.round(rect.height * dpr)
        gl.viewport(x, y, w, h)
        gl.scissor(x, y, w, h)

        const hovered = hoveredRef.current === i
        // Gentle float + wobble (no full spin) so the logo stays facing front.
        // Keep scale + bob within the camera frustum (~1.58 half-height) so the
        // per-cell scissor never clips the ball when it enlarges on hover.
        mesh.rotation.y = reduce ? 0 : Math.sin(time * 0.6 + i) * 0.45
        mesh.rotation.x = reduce ? 0 : Math.sin(time * 0.4 + i) * 0.15
        mesh.position.y = reduce ? 0 : Math.sin(time * 0.8 + i) * 0.07
        const scale = hovered ? 1.38 : 1.25
        mesh.scale.set(scale, scale, scale)
        mesh.program.uniforms.tLogo.value = textures[i]
        mesh.updateMatrixWorld()
        mesh.draw({ camera })
      }
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.remove()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [technologies, cellRefs, containerRef])

  return null
}

TechBallsOGL.propTypes = {
  technologies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }),
  ).isRequired,
  cellRefs: PropTypes.arrayOf(
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ).isRequired,
  containerRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
  hoveredIndex: PropTypes.number,
}

export default TechBallsOGL
