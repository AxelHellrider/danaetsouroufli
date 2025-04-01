<template>
  <section id="projects" class="projects-section">
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

    <!-- Loading Indicator -->
    <div v-if="loading" class="loading-spinner">
      <span>Loading...</span>
    </div>

    <div class="projects-gallery" v-if="!loading">
      <div v-for="(project, index) in filteredProjects" :key="index" class="project-card" @click="openPreview(project)">
        <div v-if="project.type === 'video'">
          <video controls preload="metadata" :src="project.mediaUrl" :alt="project.title"></video>
        </div>
        <div v-else>
          <img loading="lazy" :src="project.mediaUrl" :alt="project.title"/>
        </div>
        <h3 class="title">{{ project.title }}</h3>
        <p>{{ project.description }}</p>
      </div>
    </div>

    <div v-if="preview" class="preview-overlay" @click="closePreview">
      <div class="preview-content" @click.stop>
        <div v-if="previewProject.type === 'video'">
          <video controls preload="metadata" muted allowfullscreen="false" :src="previewProject.mediaUrl" :alt="previewProject.title" />
        </div>
        <div v-else>
          <img loading="lazy" :src="previewProject.mediaUrl" :alt="previewProject.title" />
        </div>
        <button class="close-btn" @click="closePreview">Close</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProjectsSection',
  data() {
    return {
      activeCategory: "Animation",
      categories: [
        { name: "Animation", folderPath: '3D_Animation' },
        { name: "Graphic Design", folderPath: 'Graphics_Design' },
        { name: "Illustration", folderPath: 'Illustrations' },
      ],
      projects: [],
      loading: false,
      cachedProjects: {},
      preview: false,
      previewProject: null, 
    };
  },
  methods: {
    async getBlobURL(folderPath, fileName) {
      const fileUrl = `/${folderPath}/${fileName}`;
      if (sessionStorage.getItem(fileUrl)) return sessionStorage.getItem(fileUrl);

      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      sessionStorage.setItem(fileUrl, blobUrl);
      return blobUrl;
    },
    async fetchProjectsByCategory(folderPath) {
      // Check sessionStorage first
      const cachedData = sessionStorage.getItem(folderPath);
      if (cachedData) {
        this.projects = JSON.parse(cachedData);
        return;
      }

      this.loading = true;
      try {
        const response = await fetch(`/${folderPath}/metadata.json`);
        const files = await response.json();

        const projectData = files.map(file => ({
          category: this.activeCategory,
          title: file.title || 'Untitled',
          description: file.description || 'No description available.',
          mediaUrl: this.getBlobURL(folderPath, file.fileName),
          type: file.type || (file.fileName.endsWith('.mp4') ? 'video' : 'image'),
        }));

        // Store in sessionStorage for persistence
        sessionStorage.setItem(folderPath, JSON.stringify(projectData));
        this.projects = projectData;
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        this.loading = false;
      }
    },
    setActiveCategory(category) {
      this.activeCategory = category;
      const folderPath = this.categories.find(c => c.name === category).folderPath;
      this.fetchProjectsByCategory(folderPath);
    },
    openPreview(project) {
      this.previewProject = project;
      document.body.style.overflow = "hidden";
      this.preview = true;
    },
    closePreview() {
      this.preview = false;
      document.body.style.overflow = "auto";
      this.previewProject = null;
    },
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project => project.category === this.activeCategory);
    }
  },
  mounted() {
    const folderPath = this.categories.find(c => c.name === this.activeCategory).folderPath;
    this.fetchProjectsByCategory(folderPath); // Fetch initial projects when the component is mounted
  },
};
</script>
