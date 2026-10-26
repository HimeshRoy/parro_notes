"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Sparkles,
  useTexture,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function LogoObject() {
  const texture = useTexture("/parro-logo.png");

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    groupRef.current.rotation.y =
      Math.sin(time * 0.7) * 0.18;

    groupRef.current.rotation.x =
      Math.sin(time * 0.5) * 0.05;
  });

  return (
    <Float
      speed={1.4}
      rotationIntensity={0.25}
      floatIntensity={0.8}
    >
      <group ref={groupRef}>
        {/* Back 3D body */}
        <mesh position={[0, 0, -0.12]}>
          <boxGeometry args={[2.75, 2.75, 0.22]} />

          <meshStandardMaterial
            color="#f8fafc"
            metalness={0.15}
            roughness={0.25}
          />
        </mesh>

        {/* Logo */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[2.5, 2.5]} />

          <meshBasicMaterial
            map={texture}
            transparent
            toneMapped={false}
          />
        </mesh>

        {/* Blue edge */}
        <mesh position={[0, 0, -0.18]}>
          <boxGeometry args={[2.9, 2.9, 0.06]} />

          <meshStandardMaterial
            color="#2563eb"
            metalness={0.35}
            roughness={0.3}
          />
        </mesh>

        {/* Green front accent */}
        <mesh
          position={[0, -1.45, 0.02]}
          rotation={[0, 0, 0]}
        >
          <boxGeometry args={[1.1, 0.06, 0.04]} />

          <meshStandardMaterial
            color="#16a34a"
            emissive="#16a34a"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.8} />

      <directionalLight
        position={[3, 4, 5]}
        intensity={2}
      />

      <pointLight
        position={[-3, -2, 3]}
        intensity={1.5}
        color="#3b82f6"
      />

      <pointLight
        position={[3, 2, 2]}
        intensity={1.2}
        color="#22c55e"
      />

      <LogoObject />

      <Sparkles
        count={35}
        scale={5}
        size={2}
        speed={0.35}
        opacity={0.45}
        color="#3b82f6"
      />

      <Sparkles
        count={20}
        scale={4}
        size={1.5}
        speed={0.2}
        opacity={0.3}
        color="#22c55e"
      />
    </>
  );
}

export default function ParroLogo3D() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 38,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Scene />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}