
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { MousePointer } from 'lucide-react';

export const AIEngineerAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    
    renderer.setSize(200, 100);
    mountRef.current.appendChild(renderer.domElement);
    
    // Brain mesh (representing AI)
    const brainGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const brainMaterial = new THREE.MeshPhongMaterial({
      color: 0x64E9EE,
      emissive: 0x0EA5E9,
      emissiveIntensity: 0.3,
      wireframe: true,
    });
    const brain = new THREE.Mesh(brainGeometry, brainMaterial);
    
    // Neural network connections (representing neural connections in AI)
    const neuralGroup = new THREE.Group();
    
    // Add some random neural connections
    for (let i = 0; i < 10; i++) {
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5
        ),
        new THREE.Vector3(
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5
        ),
      ]);
      
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x64E9EE, 
        transparent: true,
        opacity: 0.7
      });
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      neuralGroup.add(line);
    }
    
    // Add neural nodes (representing neurons)
    for (let i = 0; i < 8; i++) {
      const nodeGeometry = new THREE.SphereGeometry(0.08, 8, 8);
      const nodeMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        emissive: 0x64E9EE,
        emissiveIntensity: 0.5,
      });
      
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(
        (Math.random() - 0.5) * 1.8,
        (Math.random() - 0.5) * 1.8,
        (Math.random() - 0.5) * 1.8
      );
      
      neuralGroup.add(node);
    }
    
    scene.add(brain);
    scene.add(neuralGroup);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0x64E9EE, 1);
    pointLight.position.set(5, 5, 5);
    
    scene.add(ambientLight);
    scene.add(pointLight);
    
    // Position camera
    camera.position.z = 4;
    
    // Animation variables
    let rotationSpeed = 0.01;
    let pulseValue = 0;
    
    // Mouse interaction
    const handleMouseEnter = () => {
      rotationSpeed = 0.03;
      setIsInteracting(true);
    };
    
    const handleMouseLeave = () => {
      rotationSpeed = 0.01;
      setIsInteracting(false);
    };
    
    mountRef.current.addEventListener('mouseenter', handleMouseEnter);
    mountRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    // Animation
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      // Rotate brain
      brain.rotation.x += rotationSpeed;
      brain.rotation.y += rotationSpeed * 0.8;
      
      // Rotate neural network
      neuralGroup.rotation.x += rotationSpeed * 0.7;
      neuralGroup.rotation.y += rotationSpeed * 0.9;
      
      // Pulse effect
      pulseValue += 0.05;
      const pulseFactor = Math.sin(pulseValue) * 0.1 + 1;
      brain.scale.set(pulseFactor, pulseFactor, pulseFactor);
      
      // Make neural connections pulse
      neuralGroup.children.forEach((child, index) => {
        if (child instanceof THREE.Line) {
          const material = child.material as THREE.LineBasicMaterial;
          material.opacity = (Math.sin(pulseValue + index * 0.2) * 0.3 + 0.7);
        }
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      renderer.setSize(200, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      mountRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      
      scene.remove(brain);
      scene.remove(neuralGroup);
      
      // Dispose geometries and materials
      brainGeometry.dispose();
      brainMaterial.dispose();
      
      neuralGroup.children.forEach((child) => {
        if (child instanceof THREE.Line) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        } else if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
      
      renderer.dispose();
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center">
      <div 
        ref={mountRef} 
        className="w-[200px] h-[100px] cursor-pointer relative"
        aria-label="Interactive AI Brain Animation"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isInteracting ? 1 : 0,
          y: isInteracting ? 0 : 10
        }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1"
      >
        <MousePointer className="h-3 w-3" />
        <span>{isInteracting ? "AI in motion!" : ""}</span>
      </motion.div>
    </div>
  );
};
