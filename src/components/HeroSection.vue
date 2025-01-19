<template>
  <section id="hero">
    <canvas id="heroCanvas"></canvas> <!-- For Three.js -->
    <div class="hero-content">
      <h1 class="title">Danae Tsouroufli</h1>
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
      camera.position.z = 200;

      // Lighting
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      // Create 3D objects
      const objects = [];
      let objCount = window.innerWidth > 1024?200:70
      const objectTypes = [
        { geometry: new THREE.TorusGeometry(10, 4.3, 15, 15), color: 0xfb6347 },
        { geometry: new THREE.BoxGeometry(12, 12, 12), color: 0x00fcfc },
        { geometry: new THREE.ConeGeometry(12, 12, 4), color: 0xffcc00 },
      ];

      for (let i = 0; i < objCount; i++) {
        const { geometry, color } = objectTypes[Math.floor(Math.random() * objectTypes.length)];
        const material = new THREE.MeshBasicMaterial({ color, wireframe: true });
        const mesh = new THREE.Mesh(geometry, material);

        // Randomize position
        mesh.position.set(
          (Math.random() - 0.2) * window.innerWidth,
          (Math.random() - 0.2) * window.innerHeight,
          (Math.random() * 25)
        );

        // Store random rotation speeds
        mesh.rotationSpeed = {
          x: Math.random() * 0.01111 - 0.005,
          y: Math.random() * 0.0125 - 0.005,
          z: Math.random() * 0.0125 - 0.005,
        };

        scene.add(mesh);
        objects.push(mesh);
      }

      // Create 2D sine wave lines
      const lines = [];
      let lineCount = window.innerWidth > 1024?10:5; // Reduce the number of lines to simplify
      let lineCamOffset = window.innerWidth > 1024?180:190;

      for (let i = 0; i < lineCount; i++) {
        const points = [];
        const amplitude = Math.random() * 5; // Increase amplitude for more intensity
        const frequency = Math.random() * 3 + 0.2; // Higher frequency for tighter waves
        const offsetX = Math.random() * window.innerWidth / 2; // Offset for wave motion
        const offsetY = Math.random() * window.innerHeight / lineCount; // Random Y position

        // Generate sine wave points with more intensity
        for (let j = 0; j < window.innerWidth; j++) {
          const x = j - window.innerWidth / 2; // Centering the wave
          const y = Math.sin(frequency * (x + offsetX)) * amplitude + offsetY; // Adding random vertical offset
          points.push(new THREE.Vector3(x, y, lineCamOffset)); // 100 for z position (depth)
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: Math.random() * 0x00fcfc,
          linewidth: 1.5,
        });
        const line = new THREE.Line(geometry, material);

        // Store wave's properties for later animation
        line.userData = {
          offsetX,       // The initial horizontal offset for each wave
          velocityX: Math.random() * 0.075, // Horizontal movement speed
        };

        scene.add(line);
        lines.push(line);
      }

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);

        // Animate 3D objects (spinning objects)
        objects.forEach((obj) => {
          obj.rotation.x += obj.rotationSpeed.x;
          obj.rotation.y += obj.rotationSpeed.y;
          obj.rotation.z += obj.rotationSpeed.z;
        });

        // Animate sine wave lines
        lines.forEach((line) => {
          const points = line.geometry.attributes.position.array;
          // Move sine wave horizontally and modify points to create wave motion
          line.userData.offsetX += line.userData.velocityX;

          // Update the wave’s points based on the sine function
          for (let i = 0; i < points.length / 3; i++) {
            const x = points[i * 3];
            const y = Math.sin(0.05 * (x + line.userData.offsetX)) * 5.6; // Sine wave motion
            points[i * 3 + 1] = y;
          }

          // Mark that the geometry needs to update
          line.geometry.attributes.position.needsUpdate = true;
        });

        renderer.render(scene, camera);
      };
      animate();

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  },
  mounted() {
    this.initThreeJS();
  },
};
</script>
