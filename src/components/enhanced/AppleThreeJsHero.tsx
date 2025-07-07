"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Text, 
  Float, 
  Environment, 
  ContactShadows,
  OrbitControls
} from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

// Apple's signature glass material
function AppleGlassSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.05}
          transparent
          opacity={0.6}
          transmission={0.9}
          thickness={0.5}
          ior={1.5}
        />
      </mesh>
    </Float>
  );
}

// Apple's minimalist particle system
function AppleParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(100 * 3);
    
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} geometry={particles}>
      <pointsMaterial 
        size={0.02} 
        color="#007AFF" 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Apple's camera animation
function CameraController() {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Gentle camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Flowing text component (reused from FlowingTextHero)
function FlowingText() {
  const groupRef = useRef<THREE.Group>(null);
  const [isAssembled, setIsAssembled] = useState(false);
  
  const letters = useMemo(() => {
    const text = "neuralcommand";
    const spacing = 1.2;
    const startX = -(text.length * spacing) / 2;
    
    return text.split('').map((char, i) => ({
      char,
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      ),
      targetPosition: new THREE.Vector3(
        startX + i * spacing,
        0,
        0
      ),
      velocity: new THREE.Vector3(0, 0, 0),
      delay: i * 100
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    letters.forEach((letter, i) => {
      const letterMesh = groupRef.current?.children[i];
      if (!letterMesh) return;

      if (isAssembled) {
        letterMesh.position.y = Math.sin(state.clock.elapsedTime + i * 0.5) * 0.1;
        letterMesh.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.02;
        return;
      }

      const targetDistance = letter.position.distanceTo(letter.targetPosition);
      
      if (targetDistance > 0.1) {
        letter.position.lerp(letter.targetPosition, delta * 2);
        letterMesh.position.copy(letter.position);
      } else if (!isAssembled && i === letters.length - 1) {
        setTimeout(() => setIsAssembled(true), 500);
      }
    });

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

export function AppleThreeJsHero() {
  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-50 to-gray-100">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        shadows
      >
        {/* Apple's signature studio lighting */}
        <Environment preset="studio" />
        
        {/* Soft ambient lighting */}
        <ambientLight intensity={0.4} />
        
        {/* Key light */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Fill light */}
        <pointLight 
          position={[-5, 5, 5]} 
          intensity={0.4}
          color="#4FC3F7"
        />

        {/* Apple glass elements */}
        <AppleGlassSphere position={[-2, 1, -1]} />
        <AppleGlassSphere position={[2, -1, -2]} />
        <AppleGlassSphere position={[0, 2, -3]} />

        {/* Minimalist particle system */}
        <AppleParticles />

        {/* Flowing text */}
        <FlowingText />

        {/* Subtle contact shadows */}
        <ContactShadows 
          position={[0, -3, 0]} 
          opacity={0.1} 
          scale={20} 
          blur={2} 
        />

        {/* Camera animation */}
        <CameraController />
      </Canvas>

      {/* Apple-style overlay content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6 px-8">
          {/* Space for the flowing text to appear */}
          <div className="h-20 mb-8" />
          
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
            The intelligence platform that thinks ahead
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-600 transition-all duration-300 backdrop-blur-sm">
              Experience Neural Command
            </button>
            <button className="bg-white/80 backdrop-blur-lg border border-gray-200 text-gray-900 px-8 py-3 rounded-xl font-medium hover:bg-white transition-all duration-300">
              See How It Works
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 