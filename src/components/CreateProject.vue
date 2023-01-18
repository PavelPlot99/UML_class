<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col">
          <form>
            <div class="mb-3">
              <label for="name" class="form-label">Название проекта</label>
              <input type="text" class="form-control" id="name" v-model="project.name"><br>
              <button v-show="!isImport" class="btn btn-primary" @click.prevent="createProject">Создать</button>
            </div>
            <div class="mb-3" v-show="isImport">
              <label for="name" class="form-label">Файлы</label><br>
              <file-pond name="JavaFiles" ref="pond" class-name="my-pond" label-idle="Перетащите файлы"
                allow-multiple="true" :allow-file-type-validation="false" /> <br>
              <button class="btn btn-primary" @click.prevent="createWithImport()">Создать</button>
            </div>
            <div class="mb-3">
              <div class="checkbox">
                <label>
                  <input type="checkbox" v-model="isImport"> Импортировать из Java
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/eventBus";
import vueFilePond from 'vue-filepond'
// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js'

// Import styles
import 'filepond/dist/filepond.min.css'
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
)
export default {
  name: "CreateProject",
  components: {
    FilePond
  },
  data() {
    return {
      project: {
        name: null
      },
      loadingForm: true,
      isImport: false,
    }
  },
  methods: {
    async createProject() {
      this.loadingForm = true
      let result = await this.$store.dispatch('CREATE_PROJECT', this.project)
      this.loadingForm = false
      eventBus.$emit('onCreateProject')
      this.$notify({
        type: result.type,
        title: result.title,
        text: result.message,
      })
    },
    async createWithImport() {
      let files = this.$refs.pond.getFiles();
      let project = new FormData();
      project.append('name', this.project.name);
      files.forEach((file, key) => {

        if (this.validateFile(file.file.name) === true) {
          project.append(`files[${key}]`, file.file)
        } else {
          this.$notify({
            type: "error",
            title: "Неверный формат файла",
            text: `Требуется .java у вас - ${this.validateFile(file.file.name)}`,
          });
          return false;
        }
      })

      let data = await this.$store.dispatch('CREATE_PROJECT_WITH_IMPORT', project);
      this.$notify({
        type: data.type,
        title: data.title,
        text: data.message,
      })
      eventBus.$emit('onCreateProject');
    },
    validateFile(fileName) {
      let arrFileName = fileName.split(".");
      if (arrFileName[arrFileName.length - 1] !== "java") {
        return arrFileName[arrFileName.length - 1];
      }
      return true
    }

  }
}
</script>

<style scoped>

</style>
