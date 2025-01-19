<template>
  <section id="contact" class="contact-section">
    <div>
      <h2 class="title">Contact Me</h2>
      <p>If you’d like to work together or say hello, feel free to reach out!</p>
      <span>Social Media & E-mail</span>
    </div>
    <footer>
      <hr>
      <span>Copyright {{ getCurrentYear() }} &copy; Danae Tsouroufli, All Rights Reserved.</span>
      <hr>
      <span>Website created by Alexandros Nomikos.</span>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
  methods: {
    getCurrentYear() {
      let year = new Date().getFullYear();
      return year;
    }
  }
};
</script>
