<template>
  <video autoplay muted loop id="myVideo">
    <source src="../public/3D_Animation/Synthwave Path.mp4" type="video/mp4">
  </video>
  <HeroSection />
  <AboutSection />
  <ProjectsSection />
  <ContactSection />
</template>

<script>
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import ContactSection from './components/ContactSection.vue';

export default {
  components: {
    HeroSection,
    AboutSection,
    ProjectsSection,
    ContactSection,
  },
};
</script>
