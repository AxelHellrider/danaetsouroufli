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
      <div 
        v-for="(project, index) in filteredProjects" 
        :key="index" 
        class="project-card"
      >
        <img :src="getImageURL(project.image)" :alt="project.title" />
        <h3 class="title">{{ project.title }}</h3>
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
        { name: "Animation", folderId: "ANIMATION_FOLDER_ID" }, // Replace with actual folder ID
        { name: "Graphic Design", folderId: "GRAPHIC_DESIGN_FOLDER_ID" }, // Replace with actual folder ID
        { name: "Illustration", folderId: "ILLUSTRATION_FOLDER_ID" }, // Replace with actual folder ID
      ],
      projects: [],
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
      this.fetchProjectsByCategory(category);
    },

    // Fetch projects from Google Drive based on the folder ID
    async fetchProjectsByCategory(category) {
      const folderId = this.categories.find(c => c.name === category).folderId;
      try {
        const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&key=YOUR_API_KEY`);
        const data = await response.json();
        
        this.projects = data.files.map(file => ({
          category: category,
          type: this.getFileType(file.name), // Extract type from filename or metadata
          title: file.name,
          description: `${file.name} description`, // You can enhance this by adding metadata or a specific description field
          image: file.id,
        }));
      } catch (error) {
        console.error("Error fetching files from Google Drive:", error);
      }
    },

    // Dynamically generate the image URL from the fileId
    getImageURL(fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    },

    // Example method to extract project type from filename (you can adjust this based on your naming conventions)
    getFileType(fileName) {
      if (fileName.includes("2D")) {
        return "2D";
      } else if (fileName.includes("3D")) {
        return "3D";
      } else {
        return "Unknown";
      }
    },
  },

  created() {
    this.fetchProjectsByCategory(this.activeCategory); // Fetch the initial category projects on load
  },
};
</script>
