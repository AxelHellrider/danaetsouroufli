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
          <img :src="project.mediaUrl" :alt="project.title" loading="lazy"/>
        </div>
        <h3 class="title">{{ project.title }}</h3>
        <p>{{ project.description }}</p>
      </div>
    </div>

    <div v-if="preview" class="preview-overlay" @click="closePreview">
      <div class="preview-content" @click.stop>
        <div v-if="previewProject.type === 'video'">
          <video controls muted preload="metadata" allowfullscreen="false" :src="previewProject.mediaUrl" :alt="previewProject.title" />
        </div>
        <div v-else>
          <img :src="previewProject.mediaUrl" :alt="previewProject.title"  loading="lazy"/>
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
    async fetchProjectsByCategory(folderPath) {
      // Check if the category is already cached
      if (this.cachedProjects[folderPath]) {
        this.projects = this.cachedProjects[folderPath];
        return;
      }

      this.loading = true;
      try {
        // Fetch project metadata from a local JSON file or predefined data
        const response = await fetch(`/${folderPath}/metadata.json`);
        const files = await response.json();

        const projectData = files.map(file => ({
          category: this.activeCategory,
          title: file.title || 'Untitled',
          description: file.description || 'No description available.',
          mediaUrl: this.getBlobURL(folderPath, file.fileName), // Using the correct URL
          type: file.type || (file.fileName.endsWith('.mp4') ? 'video' : 'image'),
        }));

        // Cache the projects
        this.cachedProjects[folderPath] = projectData;
        this.projects = projectData;
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        this.loading = false;
      }
    },
    getBlobURL(folderPath, fileName) {
      return `/${folderPath}/${fileName}`;
    },
    setActiveCategory(category) {
      this.activeCategory = category;
      const folderPath = this.categories.find(c => c.name === category).folderPath;
      this.fetchProjectsByCategory(folderPath); // Fetch projects when the category is first accessed
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
