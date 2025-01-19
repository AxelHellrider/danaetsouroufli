<template>
    <section id="hero">
      <canvas id="heroCanvas"></canvas> <!-- For Three.js -->
      <div class="hero-content">
        <h1>Danae Tsouroufli</h1>
        <p>Graphic Designer & Book Illustrator</p>
        <div class="cta-buttons">
          <button @click="scrollToPortfolio">View Portfolio</button>
          <button @click="scrollToContact">Contact Me</button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import * as THREE from 'three';
  
  export default {
    name: 'HeroSection',
    methods: {
      scrollToPortfolio() {
        const portfolio = document.getElementById('projects');
        portfolio?.scrollIntoView({ behavior: 'smooth' });
      },
      scrollToContact() {
        const contact = document.getElementById('contact');
        contact?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    mounted() {
      this.initThreeJS();
    },
    methods: {
      initThreeJS() {
        // THREE.js scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('heroCanvas'), alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 5;
  
        // Add rotating geometry
        const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
        const torus = new THREE.Mesh(geometry, material);
        scene.add(torus);
  
        // Lighting
        const pointLight = new THREE.PointLight(0xffffff, 4, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
  
        // Animation
        const animate = () => {
          requestAnimationFrame(animate);
          torus.rotation.x += 0.01;
          torus.rotation.y += 0.01;
          renderer.render(scene, camera);
        };
        animate();
      },
    },
  };
  </script> 