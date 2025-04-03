
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { MousePointer } from 'lucide-react';

export const SoftwareEngineerAnimation = () => {
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
    
    // Create a cute software engineer character
    const characterGroup = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.7, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0xF8D7B6, // skin tone
      emissive: 0xF8D7B6,
      emissiveIntensity: 0.1,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.8;
    characterGroup.add(head);
    
    // Hair
    const hairGeometry = new THREE.BoxGeometry(1, 0.4, 0.8);
    const hairMaterial = new THREE.MeshPhongMaterial({
      color: 0x3A3A3A, // dark hair
    });
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.set(0, 1.3, 0);
    characterGroup.add(hair);
    
    // Laptop
    const laptopBaseGeometry = new THREE.BoxGeometry(1.2, 0.08, 0.8);
    const laptopScreenGeometry = new THREE.BoxGeometry(1.1, 0.7, 0.05);
    const laptopMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888,
      emissive: 0x222222,
      emissiveIntensity: 0.1,
    });
    const laptopScreenMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222,
      emissive: 0x64E9EE,
      emissiveIntensity: 0.3,
    });
    
    const laptopBase = new THREE.Mesh(laptopBaseGeometry, laptopMaterial);
    laptopBase.position.set(0, -0.2, 0.4);
    
    const laptopScreen = new THREE.Mesh(laptopScreenGeometry, laptopScreenMaterial);
    laptopScreen.position.set(0, 0.3, 0.8);
    laptopScreen.rotation.x = Math.PI / 6;
    
    characterGroup.add(laptopBase);
    characterGroup.add(laptopScreen);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0x333333,
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.25, 0.9, 0.6);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.25, 0.9, 0.6);
    
    characterGroup.add(leftEye);
    characterGroup.add(rightEye);
    
    // Glasses
    const glassesGeometry = new THREE.TorusGeometry(0.18, 0.02, 16, 20);
    const glassesMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
    });
    
    const leftGlass = new THREE.Mesh(glassesGeometry, glassesMaterial);
    leftGlass.position.set(-0.25, 0.9, 0.65);
    leftGlass.rotation.y = Math.PI / 2;
    
    const rightGlass = new THREE.Mesh(glassesGeometry, glassesMaterial);
    rightGlass.position.set(0.25, 0.9, 0.65);
    rightGlass.rotation.y = Math.PI / 2;
    
    const glassesBridge = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.02, 0.02),
      glassesMaterial
    );
    glassesBridge.position.set(0, 0.9, 0.65);
    
    characterGroup.add(leftGlass);
    characterGroup.add(rightGlass);
    characterGroup.add(glassesBridge);
    
    // Smile
    const smileGeometry = new THREE.TorusGeometry(0.2, 0.02, 16, 8, Math.PI);
    const smileMaterial = new THREE.MeshPhongMaterial({
      color: 0x333333,
    });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.position.set(0, 0.7, 0.62);
    smile.rotation.z = Math.PI;
    characterGroup.add(smile);
    
    // "Code" on laptop screen
    const createCodeLine = (y: number, width: number) => {
      const lineGeometry = new THREE.BoxGeometry(width, 0.02, 0.01);
      const lineMaterial = new THREE.MeshPhongMaterial({
        color: 0x64E9EE,
        emissive: 0x64E9EE,
        emissiveIntensity: 0.5,
      });
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.set(0, y, 0.83);
      return line;
    };
    
    // Add multiple code lines
    for (let i = 0; i < 5; i++) {
      const width = 0.6 + Math.random() * 0.3;
      const offset = (Math.random() - 0.5) * 0.2;
      const codeLine = createCodeLine(0.4 - i * 0.08, width);
      codeLine.position.x = offset;
      characterGroup.add(codeLine);
    }
    
    // Add to scene and position
    scene.add(characterGroup);
    characterGroup.rotation.x = 0.2;
    characterGroup.position.y = -0.5;
    
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
      rotationSpeed = 0.02;
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
      
      // Gentle rotation of the character
      characterGroup.rotation.y += rotationSpeed;
      
      // Small bobbing motion
      pulseValue += 0.05;
      const pulseFactor = Math.sin(pulseValue) * 0.1;
      characterGroup.position.y = -0.5 + pulseFactor;
      
      // Blink occasionally
      if (Math.floor(pulseValue * 10) % 60 === 0) {
        leftEye.scale.y = 0.1;
        rightEye.scale.y = 0.1;
      } else {
        leftEye.scale.y = 1;
        rightEye.scale.y = 1;
      }
      
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
      
      // Dispose geometries and materials
      headGeometry.dispose();
      headMaterial.dispose();
      hairGeometry.dispose();
      hairMaterial.dispose();
      laptopBaseGeometry.dispose();
      laptopScreenGeometry.dispose();
      laptopMaterial.dispose();
      laptopScreenMaterial.dispose();
      eyeGeometry.dispose();
      eyeMaterial.dispose();
      glassesGeometry.dispose();
      glassesMaterial.dispose();
      smileGeometry.dispose();
      smileMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center">
      <div 
        ref={mountRef} 
        className="w-[200px] h-[100px] cursor-pointer relative"
        aria-label="Interactive Software Engineer Animation"
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
        <span>{isInteracting ? "Coding in progress!" : ""}</span>
      </motion.div>
    </div>
  );
};
