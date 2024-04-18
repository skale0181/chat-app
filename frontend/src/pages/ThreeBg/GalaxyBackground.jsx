import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const GalaxyBackground = () => {
  const containerRef = useRef();
  let camera, scene, renderer;
  let mouseX = 0, mouseY = 0;

  useEffect(() => {
    // Set up scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Set up camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1000;

    // Set up renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create galaxy particles
    const particleCount = 10000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate galaxy
      particleSystem.rotation.x += 0.001;
      particleSystem.rotation.y += 0.001;

      // Update camera position based on mouse position
      const distance = 1000;
      const mouseXNorm = (mouseX / window.innerWidth) * 2 - 1;
      const mouseYNorm = -(mouseY / window.innerHeight) * 2 + 1;
      camera.position.x = mouseXNorm * distance;
      camera.position.y = mouseYNorm * distance;

      renderer.render(scene, camera);
    };

    animate();

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('wheel', onMouseWheel);
    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('wheel', onMouseWheel);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  const onMouseMove = event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  const onMouseWheel = event => {
    const delta = Math.sign(event.deltaY);
    camera.position.z += delta * 20;
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default GalaxyBackground;
