"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * HIGH-INTENSITY GLASS VOLUME
 * Features: Zero-asset dependencies, high-contrast colors, huge scale.
 */
function HighIntensityGlass({ position, scale, color, speed }: {
  position: [number, number, number],
  scale: number | [number, number, number],
  color: string,
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rapid Anti-Gravity Drift
    meshRef.current.position.y += speed;
    if (meshRef.current.position.y > 8) meshRef.current.position.y = -8;

    // Dynamic Crystalline Rotation
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.z += 0.005;
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {/* Faceted Icosahedron for Glass Chunk feel */}
        <icosahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={10}
          thickness={4.0}
          chromaticAberration={0.8}
          anisotropy={0.5}
          roughness={0.01}
          distortion={0.5}
          ior={1.8}
          color={color} // Using vibrant tints to ensure visibility
          transmission={1}
        />
      </mesh>
    </Float>
  );
}

function CursorLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport, mouse } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    lightRef.current.position.lerp(new THREE.Vector3(x, y, 4), 0.2);
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={80} // Ultra-strong specular hits
      distance={25}
      color="#ffffff"
      decay={1.2}
    />
  );
}

export default function AntiGravityBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-white">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        style={{ width: '100vw', height: '100vh', background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <CursorLight />

        {/* MASSIVE GLASS VOLUMES - VIBRANT TINTS FOR GUARANTEED VISIBILITY */}
        <HighIntensityGlass
          position={[-3, -1, 0]}
          scale={[2.2, 1.5, 1.8]}
          color="#e0f2fe" // Sky-tinted crystal
          speed={0.008}
        />
        <HighIntensityGlass
          position={[3, 2, -1]}
          scale={[1.8, 2.5, 1.5]}
          color="#f5f3ff" // Lavender-tinted crystal
          speed={0.012}
        />
        <HighIntensityGlass
          position={[-1, 5, -2]}
          scale={2.0}
          color="#ffffff" // Pure white crystal
          speed={0.006}
        />
        <HighIntensityGlass
          position={[0, -6, 0]}
          scale={[1.5, 1.2, 2.2]}
          color="#dcfce7" // Emerald-tinted crystal
          speed={0.005}
        />
      </Canvas>

      {/* High-visibility texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
        }}
      />
    </div>
  );
}
