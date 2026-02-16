'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Glass Sphere Component
interface GlassSphereProps {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}

function GlassSphere({ position, scale = 1, speed = 1 }: GlassSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.3;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.7) * 0.2;
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.z = t * 0.05;
  });

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={512}
          transmission={0.95}
          roughness={0.05}
          thickness={2}
          ior={1.5}
          chromaticAberration={0.03}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#f0f4ff"
        />
      </mesh>
    </Float>
  );
}

// Particle Field Component
function ParticleField({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5; // z
      sz[i] = Math.random() * 0.03 + 0.01;
    }
    return [pos, sz];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += 0.002; // drift upward
      if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10; // reset to bottom
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#93c5fd"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Glow Ring Component
function GlowRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    ringRef.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -15]}>
      <torusGeometry args={[8, 0.03, 16, 100]} />
      <meshBasicMaterial color="#60a5fa" transparent opacity={0.15} />
    </mesh>
  );
}

// Main Hero Scene Export
export function HeroScene() {
  // Positions for 8 glass spheres at various depths and positions
  const spherePositions: Array<{
    position: [number, number, number];
    scale: number;
    speed: number;
  }> = [
    { position: [-4, 2, -5], scale: 1.2, speed: 0.8 },
    { position: [3.5, -1, -8], scale: 1.8, speed: 0.5 },
    { position: [-2, -2.5, -3], scale: 0.7, speed: 1.2 },
    { position: [5, 1.5, -12], scale: 2.2, speed: 0.3 },
    { position: [-5.5, 0, -10], scale: 1.5, speed: 0.6 },
    { position: [1, 3, -7], scale: 0.9, speed: 0.9 },
    { position: [6, -2, -15], scale: 2.5, speed: 0.2 },
    { position: [-3, 3.5, -18], scale: 1.0, speed: 0.7 },
  ];

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0.5, 12], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} color="#ffffff" />
        <directionalLight position={[5, 8, 5]} intensity={1.0} color="#f0f8ff" />
        <pointLight position={[0, 0, 5]} intensity={0.3} color="#8b5cf6" distance={20} />

        {/* Environment for realistic glass reflections */}
        <Environment preset="studio" />

        {/* Glass Spheres - scattered at different positions and scales */}
        {spherePositions.map((sphere, i) => (
          <GlassSphere
            key={i}
            position={sphere.position}
            scale={sphere.scale}
            speed={sphere.speed}
          />
        ))}

        {/* Atmospheric particles */}
        <ParticleField count={250} />

        {/* Background glow ring */}
        <GlowRing />
      </Canvas>
    </div>
  );
}
