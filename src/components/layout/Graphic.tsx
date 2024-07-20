import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type {
  BufferGeometry,
  Group,
  Material,
  NormalBufferAttributes,
  Object3DEventMap,
  Points,
} from 'three';

// PixelatedSphere component
const PixelatedSphere = () => {
  const sphereRef =
    useRef<
      Points<BufferGeometry<NormalBufferAttributes>, Material | Material[]>
    >(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 1.2;
      sphereRef.current.rotation.z = clock.getElapsedTime() * 0.7;
    }
  });

  return (
    <points ref={sphereRef}>
      <icosahedronGeometry args={[1, 4]} />
      <pointsMaterial color='#eb2754' size={0.05} />
    </points>
  );
};

// Birds component
const Birds = () => {
  const groupRef = useRef<Group<Object3DEventMap>>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const elapsedTime = clock.getElapsedTime();
    groupRef.current.children.forEach(
      (
        bird: { position: { x: number; y: number; z: number } },
        index: number,
      ) => {
        const angle = (elapsedTime + index * 0.2) % (2 * Math.PI);
        const radius = 2.3 + Math.random() * 0.0001;
        bird.position.x =
          radius * Math.cos(angle) - Math.sin(elapsedTime * 0.5 + index);
        bird.position.y =
          radius * Math.sin(angle) * Math.sin(elapsedTime * 0.5 + index);
        bird.position.z = radius * Math.cos(elapsedTime * 0.5 + index);
      },
    );
  });

  const birds = [...Array(36)].map((_, i) => {
    const size = i % 2 === 0 ? 0.03 : 0.05;
    return (
      <mesh key={i} position={[1, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial color='#eb2754' />
      </mesh>
    );
  });

  return <group ref={groupRef}>{birds}</group>;
};

const Graphic = () => {
  return (
    <div>
      <Canvas
        camera={{ fov: 40, position: [0, 0, 5] }}
        gl={{ antialias: false }}
      >
        <PixelatedSphere />
        <Birds />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Graphic;
