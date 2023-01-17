<template>
  <div class="menu-container">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col">
          <h5>Меню <span class="button" @click="showMenu()">{{ isVisible? "(Свернуть)": "(Развернуть)" }}</span></h5>
        </div>
      </div>
      <div class="row" v-show="isVisible">
        <div class="container">
          <div class="row">
            <div class="col menu-item" @click="showForm">
              <h6>Добавить сущность</h6>
            </div>
          </div>
          <div class="row" v-if="!isAdding">
            <div class="col menu-item" @click="addRelation">
              <h6>Добавить связь</h6>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col menu-item" @click="cancel">
              <h6>Отменить</h6>
            </div>
          </div>
          <div class="row">
            <div class="col menu-item" @click="save">
              <h6>Сохранить изменения</h6>
            </div>
          </div>
          <div class="row">
            <div class="col menu-item" @click="backToMain()">
              <h6>На главную</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { eventBus } from "@/eventBus";
import AddForm from "@/components/AddForm";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Menu",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AddForm
  },
  data() {
    return {
      isVisible: true,
    }
  },
  computed: {
    isAdding: {
      get() {
        return this.$store.state.isAdding
      },
      set(value) {
        this.$store.commit('changeIsAdding', value)
      }
    }
  },
  methods: {
    showMenu() {
      this.isVisible = !this.isVisible
    },
    cancel() {
      this.isAdding = false
      eventBus.$emit('cancelAddLink')
    },
    backToMain() {
      this.$router.push('/');
    },
    save() {
      eventBus.$emit('saveJson')
    },
    addRelation() {
      eventBus.$emit('clickAddRelation')
    },
    showForm() {
      this.$modal.show(AddForm,)
    },
    addBlock() {
      let node = {
        name: "Professor",
        properties: [
          { name: "classes", type: "List", visibility: "public" }
        ],
        methods: [
          { name: "teach", parameters: [{ name: "class", type: "Course" }], visibility: "private" }
        ]
      }
      eventBus.$emit('addedNode', node)
    }
  }
}
</script>

<style scoped>
.menu-container {
  position: absolute;
  width: 300px;
  top: 0;
  z-index: 9999;
  left: calc(100% - 300px);
  background-color: white;
  border-radius: 5px;
  -webkit-box-shadow: -8px 6px 26px -4px rgba(34, 60, 80, 0.3);
  -moz-box-shadow: -8px 6px 26px -4px rgba(34, 60, 80, 0.3);
  box-shadow: -8px 6px 26px -4px rgba(34, 60, 80, 0.3);
}

.button {
  cursor: pointer;
  font-size: 15px;
}

.button:hover {
  color: #275e11;
}

.menu-item {
  border-bottom: 1px solid grey !important;
}

.menu-item:hover {
  background-color: whitesmoke;
  cursor: pointer;
}

.vm--modal {
  overflow: scroll !important;
}
</style>
