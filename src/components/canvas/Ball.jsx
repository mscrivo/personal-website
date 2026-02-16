/* eslint-disable react/no-unknown-property */
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
  Html,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import PropTypes from 'prop-types'
import { Suspense, useState } from 'react'

import Loader from '../Loader'

const Ball = ({ imgUrl, hoverText }) => {
  const [hovered, setHovered] = useState(false)
  const [decal] = useTexture([imgUrl])

  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
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
  )
}

const BallCanvas = ({ icon, name }) => {
  return (
    <Canvas frameloop="always" gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<Loader />}>
        <OrbitControls enableZoom={false} position0={0} />
        <Ball imgUrl={icon} hoverText={name} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

Ball.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  hoverText: PropTypes.string.isRequired,
}

BallCanvas.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default BallCanvas
