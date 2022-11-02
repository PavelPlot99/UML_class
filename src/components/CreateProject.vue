<template>
<div>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Название проекта</label>
            <input type="text" class="form-control" id="name" v-model="project.name"><br>
            <button class="btn btn-primary" @click.prevent="createProject">Создать</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {eventBus} from "@/eventBus";

export default {
  name: "CreateProject",
  data(){
    return{
      project:{
        name:null
      },
      loadingForm:true
    }
  },
  methods:{
    async createProject(){
      this.loadingForm = true
      let result = await this.$store.dispatch('CREATE_PROJECT', this.project)
      this.loadingForm = false
      eventBus.$emit('onCreateProject')
      this.$notify({
        type: result.type,
        title: result.title,
        text: result.message,
      })
    }
  }
}
</script>

<style scoped>

</style>
