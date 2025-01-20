<template>
  <section id="projects" class="projects-section">
    <h2 class="title">My Projects</h2>
    <h2 class="title">My Projects</h2>
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
        <img :src="getImageURL(project.image)" :alt="project.title" />
        <h3 class="title">{{ project.title }}</h3>
        <img :src="getImageURL(project.image)" :alt="project.title" />
        <h3 class="title">{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <span class="tag">{{ project.type }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { log } from 'three/tsl';

export default {
  name: 'ProjectsSection',
  data() {
    return {
      activeCategory: "Animation",
      categories: [
        { name: "Animation", folderId: '1O3FZspn-Kv6espDh3x4Kats4JdV7GWTK' },
        { name: "Graphic Design", folderId: 'your-folder-id-graphic-design' },
        { name: "Illustration", folderId: 'your-folder-id-illustration' },
      ],
      projects: []
    };
  },
  methods: {
    async fetchProjectsByCategory(folderId) {
      try {
        const response = await fetch(`/.netlify/functions/getGoogleDriveFiles?folderId=${folderId}`);
        const files = await response.json();
        console.log("Fetched files:", files);

        this.projects = files.map(file => ({
          category: this.activeCategory,
          title: file.name || 'Untitled',
          description: 'No description available',
          image: `https://drive.google.com/uc?export=view&id=${file.id}`,
        }));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
    setActiveCategory(category) {
      this.activeCategory = category;
      const folderId = this.categories.find(c => c.name === category).folderId;
      this.fetchProjectsByCategory(folderId);
    }
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project => project.category === this.activeCategory);
    }
  },
};
</script>
