<template>
  <section id="projects" class="projects-section">
    <h2>My Projects</h2>
    <div class="category-tabs">
      <button 
        v-for="category in categories" 
        :key="category.name" 
        :class="{ active: activeCategory === category.name }" 
        @click="setActiveCategory(category.name)"
      >
        {{ category.name }}
      </button>
    </div>
    <div class="projects-gallery">
      <div 
        v-for="(project, index) in filteredProjects" 
        :key="index" 
        class="project-card"
      >
        <img :src="project.image" :alt="project.title" />
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <span class="tag">{{ project.type }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProjectsSection",
  data() {
    return {
      activeCategory: "Animation",
      categories: [
        { name: "Animation" },
        { name: "Graphic Design" },
        { name: "Illustration" },
      ],
      projects: [
        // Animation projects
        {
          category: "Animation",
          type: "2D",
          title: "2D Animated Short",
          description: "A hand-drawn animated short film.",
          image: "/assets/images/2d-animation.jpg",
        },
        {
          category: "Animation",
          type: "3D",
          title: "3D Character Animation",
          description: "A 3D animated character walkthrough.",
          image: "/assets/images/3d-animation.jpg",
        },
        // Graphic Design projects
        {
          category: "Graphic Design",
          type: "2D",
          title: "Brand Identity Package",
          description: "A complete branding guide for a studio.",
          image: "/assets/images/branding.jpg",
        },
        {
          category: "Graphic Design",
          type: "3D",
          title: "3D Logo Design",
          description: "A modern logo rendered in 3D.",
          image: "/assets/images/3d-logo.jpg",
        },
        // Illustration projects
        {
          category: "Illustration",
          type: "2D",
          title: "Children's Book Illustration",
          description: "Hand-drawn illustrations for a children's story.",
          image: "/assets/images/childrens-book.jpg",
        },
        {
          category: "Illustration",
          type: "3D",
          title: "3D Environment Art",
          description: "A 3D-rendered fantasy landscape.",
          image: "/assets/images/3d-landscape.jpg",
        },
      ],
    };
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(
        (project) => project.category === this.activeCategory
      );
    },
  },
  methods: {
    setActiveCategory(category) {
      this.activeCategory = category;
    },
  },
};
</script>