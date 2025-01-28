<template>
  <section class="contact-section">
    <div id="contact">
      <h2 class="title">Contact Me</h2>
      <p>If you’d like to work together or say hello, feel free to reach out!</p>
    </div>
    <footer>
      <div class="socials">
        <div class="social-row">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" fill="#ffffff"></path> <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" fill="#ffffff"></path> <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="#ffffff"></path> </g></svg>
          <a href="https://www.linkedin.com/in/danae-tsouroufli-81a1b419b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">Danae Tsouroufli @ Linkedin</a>
        </div>
        <div class="social-row">
          <svg width="30px" height="30px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.00977 21.39H19.0098C20.0706 21.39 21.0881 20.9685 21.8382 20.2184C22.5883 19.4682 23.0098 18.4509 23.0098 17.39V7.39001C23.0098 6.32915 22.5883 5.31167 21.8382 4.56152C21.0881 3.81138 20.0706 3.39001 19.0098 3.39001H7.00977C5.9489 3.39001 4.93148 3.81138 4.18134 4.56152C3.43119 5.31167 3.00977 6.32915 3.00977 7.39001V12.39" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M1.00977 18.39H11.0098" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M1.00977 15.39H5.00977" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22.209 5.41992C16.599 16.0599 9.39906 16.0499 3.78906 5.41992" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          <a href="mailto:danaetsouroufli@outlook.com">Danae Tsouroufli @ Outlook</a>
        </div>
      </div>
      <hr />
      <span
        >Copyright {{ getCurrentYear() }} &copy; Danae Tsouroufli, All Rights
        Reserved.</span
      >
      <hr />
      <span>Website created by Alexandros Nomikos.</span>
      <button class="scroll-top" @click="smoothScrollToTop" v-show="showScrollButton">
        Back to top
      </button>
    </footer>
  </section>
</template>

<script>
export default {
  name: "ContactSection",
  data() {
    return {
      showScrollButton: false, // Controls button visibility
    };
  },
  methods: {
    getCurrentYear() {
      return new Date().getFullYear();
    },
    handleScroll() {
      // Show button only when scrolled away from the top
      this.showScrollButton = window.scrollY > 100;
    },
    smoothScrollToTop() {
      // Smoothly scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    // Add scroll event listener when the component is mounted
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
