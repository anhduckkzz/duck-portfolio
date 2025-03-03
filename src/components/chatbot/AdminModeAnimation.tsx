
import { useEffect, useRef } from "react";
import * as THREE from 'three';

interface AdminModeAnimationProps {
  show: boolean;
}

export const AdminModeAnimation = ({ show }: AdminModeAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!show || !containerRef.current) return;
    
    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create wave geometry
    const waveGeometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    const waveMaterial = new THREE.MeshPhongMaterial({
      color: 0x1EAEDB,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    wave.rotation.x = Math.PI / 2;
    scene.add(wave);
    
    // Create robot head (simplified)
    const robotHead = new THREE.Group();
    
    // Head cube
    const headGeometry = new THREE.BoxGeometry(2, 2, 2);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x33C3F0,
      emissive: 0x0EA5E9,
      emissiveIntensity: 0.5,
      shininess: 80
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    robotHead.add(head);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x0FA0CE, emissive: 0x0FA0CE });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.5, 0.3, 1.1);
    robotHead.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.5, 0.3, 1.1);
    robotHead.add(rightEye);
    
    robotHead.position.set(0, 2, 0);
    scene.add(robotHead);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x0EA5E9, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    camera.position.z = 10;
    camera.position.y = 3;
    camera.lookAt(0, 0, 0);
    
    // Animation
    let frame = 0;
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      frame += 0.03;
      
      // Animate wave
      const positions = waveGeometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const distance = Math.sqrt(x * x + y * y);
        
        const z = Math.sin(distance * 0.5 + frame) * 0.5;
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;
      
      // Animate robot
      robotHead.rotation.y = Math.sin(frame * 0.5) * 0.5;
      robotHead.position.y = 2 + Math.sin(frame) * 0.2;
      
      renderer.render(scene, camera);
      
      // Stop animation after 3 seconds
      if (frame > 6) {
        cancelAnimationFrame(animationId);
        if (containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      headGeometry.dispose();
      headMaterial.dispose();
      eyeGeometry.dispose();
      eyeMaterial.dispose();
    };
  }, [show]);
  
  return <div ref={containerRef} className="fixed inset-0 z-50 pointer-events-none" />;
};
