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
      <div v-for="(project, index) in filteredProjects" :key="index" class="project-card">
        <div v-if="project.type.includes('video')">
          <video controls :src="project.mediaUrl" :alt="project.title"></video>
        </div>
        <div v-else>
          <img :src="project.mediaUrl" :alt="project.title" />
        </div>
        <h3 class="title">{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <span class="tag">{{ project.type }}</span>
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
        { name: "Animation", folderId: '1O3FZspn-Kv6espDh3x4Kats4JdV7GWTK' },
        { name: "Graphic Design", folderId: '1AUGL_HlYPrpnh7jgHQWPY8H_6fcKoTZB' },
        { name: "Illustration", folderId: '1tdXBf3wIWU1Z1mR6SGlQ6Clr5ngSrdXF' },
      ],
      projects: [],
      loading: false,
      cachedProjects: {}  // Cache to store the projects for each category
    };
  },
  methods: {
    async fetchProjectsByCategory(folderId) {
      if (this.cachedProjects[folderId]) {
        // If data is cached, use it directly
        this.projects = this.cachedProjects[folderId];
        return;
      }

      this.loading = true;
      try {
        const files = await this.fetchFilesInFolder(folderId);
        const projectData = files.map(file => ({
          category: this.activeCategory,
          title: file.name || 'Untitled',
          description: file.description || 'No description available.',
          mediaUrl: this.getFileURL(file.id),
          type: file.mimeType,
        }));

        // Cache the data for future use
        this.cachedProjects[folderId] = projectData;
        this.projects = projectData;
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchFilesInFolder(folderId) {
      let files = [];
      try {
        const response = await fetch(`/.netlify/functions/getGoogleDriveFiles?folderId=${folderId}`);
        const fileList = await response.json();

        for (const file of fileList) {
          if (file.mimeType === "application/vnd.google-apps.folder") {
            const subFolderFiles = await this.fetchFilesInFolder(file.id);
            files = files.concat(subFolderFiles); // Merge results
          } else files.push(file);
        }
      } catch (error) {
        console.error('Error fetching files from folder:', error);
      }
      return files;
    },
    setActiveCategory(category) {
      this.activeCategory = category;
      const folderId = this.categories.find(c => c.name === category).folderId;
      this.fetchProjectsByCategory(folderId); // Fetch only when the category is first accessed
    },
    getFileURL(fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}?authuser=0`;
    },
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project => project.category === this.activeCategory);
    }
  },
  mounted() {
    const folderId = this.categories.find(c => c.name === this.activeCategory).folderId;
    this.fetchProjectsByCategory(folderId); // Fetch when the component is mounted
  },
};
</script>

