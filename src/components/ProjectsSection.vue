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
    <div class="projects-gallery">
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
      projects: []
    };
  },
  methods: {
    async fetchProjectsByCategory(folderId) {
      try {
        const response = await fetch(`/.netlify/functions/getGoogleDriveFiles?folderId=${folderId}`);
        const files = await response.json();

        console.log('API Response:', files);  // Log the full response to see its structure

        this.projects = files.map(file => {
          if (file.mimeType !== "application/vnd.google-apps.folder") {
            return {
              category: this.activeCategory,
              title: file.name || 'Untitled',
              description: file.description || 'No description available.',
              mediaUrl: file.mimeType !== "video/mp4"?this.getFileURL(file.id, 'image/jpeg'):this.getFileURL(file.id, 'video/mp4'),
              type: file.mimeType,
            };
          }
        }).filter(project => project !== null);
      } catch (error) {
        console.error('Error fetching projects:', error);
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
          } else {
            files.push(file);
          }
        }
      } catch (error) {
        console.error('Error fetching files from folder:', error);
      };
      return files;
    },

    setActiveCategory(category) {
      this.activeCategory = category;
      const folderId = this.categories.find(c => c.name === category).folderId;
      this.fetchProjectsByCategory(folderId);
    },

    getFileURL(fileId, mimeType) {
      if (mimeType.includes('video')) {
        // For videos, return the video URL
        return `https://drive.google.com/uc?id=${fileId}&export=view`;
      } else if (mimeType.includes('image')) {
        // For images, return the image URL
        return `https://drive.google.com/uc?id=${fileId}&export=view`;
      }
      return '';  // Fallback URL (you can handle this case differently)
    }
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project => project.category === this.activeCategory);
    }
  },
};
</script>
