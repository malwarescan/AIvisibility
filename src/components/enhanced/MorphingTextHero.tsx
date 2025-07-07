"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function MorphingText() {
  const textRef = useRef<THREE.Mesh>(null);
  const [currentText, setCurrentText] = useState("neural");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Apple-style text morphing sequence
  useEffect(() => {
    const sequence = ["neural", "command", "intelligence", "neuralcommand"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % sequence.length;
        setCurrentText(sequence[currentIndex]);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (textRef.current) {
      // Gentle breathing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      textRef.current.scale.setScalar(scale);
      
      // Subtle floating
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      // Transition effects
      if (isTransitioning) {
        const material = textRef.current.material as THREE.MeshPhysicalMaterial;
        material.opacity = Math.max(0, Math.sin(state.clock.elapsedTime * 10) * 0.5 + 0.5);
      } else {
        const material = textRef.current.material as THREE.MeshPhysicalMaterial;
        material.opacity = 1;
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
      <Text
        ref={textRef}
        position={[0, 0, 0]}
        fontSize={2}
        color="#1d1d1f"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SF-Pro-Display-Thin.woff"
        letterSpacing={-0.05}
      >
        {currentText}
        <meshPhysicalMaterial
          color="#1d1d1f"
          metalness={0.1}
          roughness={0.1}
          transparent
        />
      </Text>
    </Float>
  );
}

export function MorphingTextHero() {
  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white to-gray-50">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.4} />
        
        <MorphingText />
      </Canvas>
    </div>
  );
} 