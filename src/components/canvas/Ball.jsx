/* eslint-disable react/no-unknown-property */
import { Decal } from '@react-three/drei/core/Decal'
import { Float } from '@react-three/drei/core/Float'
import { Preload } from '@react-three/drei/core/Preload'
import { useTexture } from '@react-three/drei/core/Texture'
import { Html } from '@react-three/drei/web/Html'
import { View } from '@react-three/drei/web/View'
import { Canvas } from '@react-three/fiber'
import PropTypes from 'prop-types'
import { Suspense, useState } from 'react'

const Ball = ({ imgUrl, hoverText }) => {
  const [hovered, setHovered] = useState(false)
  const [decal] = useTexture([imgUrl])

  return (
    <>
      {/* Lights live outside <Float> so they stay fixed while the ball turns —
          the facets catch the key light as it rotates, which reads far more 3D
          than lighting that spins along with the mesh. */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 5, 6]} intensity={1.6} />
      <directionalLight
        position={[-4, -2, 2]}
        intensity={0.5}
        color="#88aaff"
      />
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
        <mesh
          castShadow
          receiveShadow
          scale={2.75}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#3d3d3d"
            metalness={0.35}
            roughness={0.45}
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            flatShading
            map={decal}
          />
          {hovered && (
            <Html position={[0, 1, 0]} center>
              <div className="p-2 bg-black/75 text-white rounded">
                {hoverText}
              </div>
            </Html>
          )}
        </mesh>
      </Float>
    </>
  )
}

// A single WebGL context renders every ball. Each ball is a <View> scissored to
// its tracked grid cell, so the DOM flexbox grid keeps driving the (responsive)
// layout while we avoid spinning up one canvas/context per icon.
const BallCanvas = ({ technologies, cellRefs, eventSource }) => {
  return (
    <Canvas
      frameloop="always"
      eventSource={eventSource}
      className="!fixed inset-0 !h-screen !w-screen"
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        {technologies.map((technology, index) => (
          <View key={technology.name} track={cellRefs[index]}>
            <Ball imgUrl={technology.icon} hoverText={technology.name} />
          </View>
        ))}
        <Preload all />
      </Suspense>
      <View.Port />
    </Canvas>
  )
}

Ball.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  hoverText: PropTypes.string.isRequired,
}

BallCanvas.propTypes = {
  technologies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }),
  ).isRequired,
  cellRefs: PropTypes.arrayOf(
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ).isRequired,
  eventSource: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
}

export default BallCanvas
