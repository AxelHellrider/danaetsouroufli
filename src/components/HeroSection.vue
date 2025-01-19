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
          0.01,
          500
        );
        const renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById("heroCanvas"),
          alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 6;

        // Lighting (optional, not needed for wireframe, but keeping for later use)
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        // Create random wireframe elements
        const objects = [];
        const objectTypes = [
          { geometry: new THREE.SphereGeometry(1, 25, 25), color: 0xfb6347 },
          { geometry: new THREE.BoxGeometry(1, 1, 1), color: 0x00fcfc },
          { geometry: new THREE.ConeGeometry(1, 1, 4), color: 0xffcc00 },
        ];

        for (let i = 0; i < 50; i++) {
          // Randomly pick an object type
          const { geometry, color } = objectTypes[Math.floor(Math.random() * objectTypes.length)];
          const material = new THREE.MeshBasicMaterial({ color, wireframe: true });
          const mesh = new THREE.Mesh(geometry, material);

          // Randomize position
          mesh.position.set(
            (Math.random() - 0.5) * 20, // Random X between -10 and 10
            (Math.random() - 0.5) * 20, // Random Y between -10 and 10
            (Math.random() - 0.5) * 20  // Random Z between -10 and 10
          );

          // Store random rotation speeds for animation
          mesh.rotationSpeed = {
            x: Math.random() * 0.02 - 0.01, // Random speed between -0.01 and 0.01
            y: Math.random() * 0.02 - 0.01,
          };

          scene.add(mesh);
          objects.push(mesh);
        }

        // Animation
        const animate = () => {
          requestAnimationFrame(animate);

          // Rotate each object with its own random speed
          objects.forEach((obj) => {
            obj.rotation.x += obj.rotationSpeed.x;
            obj.rotation.y += obj.rotationSpeed.y;
          });

          renderer.render(scene, camera);
        };
        animate();
      },
    },
  };
  </script> 