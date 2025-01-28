<template>
  <section id="hero">
    <div class="hero-content">
      <h1 class="title">Danae Tsouroufli</h1>
      <p>Graphic Designer - Illustrator - 3D Artist</p>
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
};
</script>
