<template>
  <div class="container">
    <div class="row py-2 justify-content-center">

      <div class="col">
        <h1>Мои проекты ({{ userLogin }}) </h1>
      </div>
      <div class="col-2 text-center" style="padding:0%">
        <button @click="logout()" class="btn btn-custom btn-custom-animation">Выйти</button>
      </div>
    </div>
    <div class="row row-bg">
      <div class="col-3 card-project  border text-center align-content-center" v-for="project in projects"
        :key="project.id" @dblclick="deleteProject(project.id)" @click="showDiagramm(project.id)">
        <h4 class="text-card">{{ project.name }}</h4>
      </div>
      <div class="col-3 card-project  border text-center align-content-center" @click="showForm">
        <h4 class="text-card add-project">+</h4>
      </div>
    </div>
  </div>
</template>

<script>
import CreateProject from "@/components/CreateProject";
import { eventBus } from "@/eventBus";
export default {
  name: "HomePage",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CreateProject
  },
  data() {
    return {
      projects: [],
      loading: false,
    }
  },
  computed: {
    userLogin() {
      return this.$store.state.userLogin
    }
  },
  methods: {
    async getProjects() {
      this.loading = true
      let data = await this.$store.dispatch('GET_PROJECTS')
      this.loading = false
      if (data.type === 'error') {
        this.$notify({
          type: data.type,
          title: data.title,
          text: data.message,
        })
        return
      }
      this.projects = data.data

    },
    logout() {
      this.$notify({
        type: 'success',
        title: 'Выход',
        text: 'Вы успешно вышли!',
      });
      setTimeout(() => {
        localStorage.removeItem("JWT");
        this.$router.push({ name: 'Login' })
      }, 1000)
    },
    async showDiagramm(id) {
      this.$router.push({ path: '/diagramm', query: { id } })
    },
    async deleteProject(id) {
      if (confirm("Вы действительно хотите удалить проект?")) {
        let data = await this.$store.dispatch('DELETE_PROJECT', id)
        await this.getProjects()
        this.$notify({
          type: data.type,
          title: data.title,
          text: data.message,
        })
      }
    },
    async showForm() {
      this.$modal.show(CreateProject)
    },
    async onCreated() {
      this.$modal.hideAll()
      await this.getProjects()
    },

  },
  mounted() {
    eventBus.$on('onCreateProject', this.onCreated)
    this.getProjects()
  },
  destroyed() {
    eventBus.$off('onCreateProject')
  }
}
</script>

<style scoped>
.row-bg {
  background-color: rgba(252, 247, 247, 0.74);
}

.card-project {
  transition: all 0.4s ease;
  height: 200px;
}

.border:hover {
  box-shadow: inset 0 0 0 25px #53a7ea;
  cursor: pointer;
}

.text-card {
  line-height: 190px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.add-project {
  line-height: 150px;
  font-size: 150pt;

}

.add-project:hover {
  transform: rotate(180deg);
  transition: all 0.3s ease;
  line-height: 250px;
}
</style>
