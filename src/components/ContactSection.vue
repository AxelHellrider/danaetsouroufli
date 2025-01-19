<template>
  <section id="contact" class="contact-section">
    <h2>Contact Me</h2>
    <p>If you’d like to work together or say hello, feel free to reach out!</p>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Your Name" v-model="form.name" required />
      <input type="email" placeholder="Your Email" v-model="form.email" required />
      <textarea placeholder="Your Message" v-model="form.message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      alert('Thank you for your message!');
      this.form = { name: '', email: '', message: '' };
    },
  },
};
</script>
