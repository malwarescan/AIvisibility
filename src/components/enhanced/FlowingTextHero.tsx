"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Float } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

interface FlowingLetter {
  char: string;
  position: THREE.Vector3;
  targetPosition: THREE.Vector3;
  velocity: THREE.Vector3;
  delay: number;
}

function FlowingText() {
  const groupRef = useRef<THREE.Group>(null);
  const [isAssembled, setIsAssembled] = useState(false);
  
  // Create flowing letters for "neuralcommand"
  const letters = useMemo(() => {
    const text = "neuralcommand";
    const spacing = 1.2;
    const startX = -(text.length * spacing) / 2;
    
    return text.split('').map((char, i) => ({
      char,
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20, // Random starting position
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      ),
      targetPosition: new THREE.Vector3(
        startX + i * spacing,
        0,
        0
      ),
      velocity: new THREE.Vector3(0, 0, 0),
      delay: i * 100 // Staggered assembly
    })) as FlowingLetter[];
  }, []);

  // Animate letters flowing into position
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    letters.forEach((letter, i) => {
      const letterMesh = groupRef.current?.children[i];
      if (!letterMesh) return;

      // Gentle floating animation when assembled
      if (isAssembled) {
        letterMesh.position.y = Math.sin(state.clock.elapsedTime + i * 0.5) * 0.1;
        letterMesh.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.02;
        return;
      }

      // Flow to target position
      const targetDistance = letter.position.distanceTo(letter.targetPosition);
      
      if (targetDistance > 0.1) {
        // Smooth approach using lerp
        letter.position.lerp(letter.targetPosition, delta * 2);
        letterMesh.position.copy(letter.position);
      } else if (!isAssembled && i === letters.length - 1) {
        // All letters assembled
        setTimeout(() => setIsAssembled(true), 500);
      }
    });

    // Gentle group rotation
    if (isAssembled) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {letters.map((letter, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={0.1}
          floatIntensity={0.2}
        >
          <Text
            position={letter.position}
            fontSize={1.5}
            color="#007AFF"
            anchorX="center"
            anchorY="middle"
            font="/fonts/SF-Pro-Display-Thin.woff"
          >
            {letter.char}
            <meshPhysicalMaterial
              color="#007AFF"
              emissive="#001a33"
              emissiveIntensity={0.1}
              metalness={0.1}
              roughness={0.2}
              transparent
              opacity={0.9}
            />
          </Text>
        </Float>
      ))}
    </group>
  );
}

export function FlowingTextHero() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
      >
        {/* Apple-style lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.5}
          castShadow
        />
        <pointLight 
          position={[-10, -10, -5]} 
          intensity={0.3}
          color="#4FC3F7"
        />
        
        <FlowingText />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
} 