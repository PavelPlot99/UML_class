<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-4"><h5>Добавить блок</h5></div>
    </div>
    <div class="scroll row justify-content-center">
      <form>
        <div class="form-group">
          <label>Название</label>
          <input class="form-control" type="text" v-model="createNode.name">
        </div>
        <h6>Свойства</h6>
        <div class="row">
          <div class="col-1" @click.prevent="deleteProp('prop')">
            <button class="btn btn-custom btn-primary">-</button>
          </div>
          <div class="col">
            <template v-for="(prop, i) in createNode.properties">
              <div class="form-group" :key="i">
                <div class="row">
                  <div class="col">
                    <label>Имя</label>
                    <input class="form-control" type="text" v-model="prop.name">
                  </div>
                  <div class="col">
                    <label>тип</label>
                    <input class="form-control" type="text" v-model="prop.type">
                  </div>
                  <div class="col">
                    <label>Об. вид.</label>
                    <select class="form-select">
                      <option v-for="(v, key) in visible" :key="'A'+key" :value="v">{{ v }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr :key="'AB' + i">
            </template>
          </div>
          <div class="col-1">
            <button @click.prevent="addElement('prop')" class="btn btn-custom btn-primary">+</button>
          </div>

        </div>

        <h6>Методы</h6>
        <div class="row">
          <div class="col-1">
            <button @click.prevent="deleteProp('method')" class="btn btn-custom btn-primary">-</button>
          </div>
          <div class="col">
            <template v-for="(prop, key) in createNode.methods">
              <div class="form-group" :key="'B'+key">
                <div class="row">
                  <div class="col">
                    <label>Имя</label>
                    <input class="form-control" type="text" v-model="prop.name">
                  </div>
                  <div class="col">
                    <label>Об. вид.</label>
                    <select class="form-select" v-model="prop.visibility">
                      <option v-for="(v, i) in visible" :key="'C'+i" :value="v">{{ v }}</option>
                    </select>
                  </div>
                </div>
              </div>

              <h6 :key="'D'+key">Параметры</h6>
              <div :key="'F'+key" class="row">
                <div class="col-1">
                  <button @click.prevent="deleteProp('param', key)" class="btn btn-custom btn-primary">-</button>
                </div>
                <div class="col">
                  <template v-for="(param, index) in prop.parameters">
                    <div class="form-group" :key="'G'+index">
                      <div class="row">
                        <div class="col">
                          <label>Имя</label>
                          <input class="form-control" type="text" v-model="param.name">
                        </div>
                        <div class="col">
                          <label>Тип</label>
                          <input class="form-control" type="text" v-model="param.type">
                        </div>
                      </div>
                    </div>

                  </template>
                </div>
                <div class="col-1">
                  <button @click.prevent="addElement('param', key)" class="btn btn-custom btn-primary">+</button>
                </div>

              </div>

              <hr :key="'ABC' + key">
            </template>
          </div>
          <div class="col-1">
            <button @click.prevent="addElement('method')" class="btn btn-custom btn-primary">+</button>
          </div>
        </div>
        <div class="row py-2 ">
          <div class="col">
            <button class="btn btn-primary" @click.prevent="addNode">Добавить</button>
          </div>

        </div>

      </form>
    </div>
  </div>
</template>

<script>
import {eventBus} from "@/eventBus";

export default {
  name: "AddForm",
  data() {
    return {
      createNode: {
        name: "Имя класса",
        properties: [
          {name: "Имя св-ва", type: "Тип", visibility: "public"},
        ],
        methods: [
          {name: "Имя метода", parameters: [{name: "Параметр", type: "Тип"}], visibility: "public"},
        ]
      },
      visible: ['public', 'private', 'protected']
    }
  },
  methods: {
    addNode(){
      eventBus.$emit('addedNode', this.createNode)
    },
    addElement(element, key) {
      switch (element) {
        case "prop":
          this.createNode.properties.push({name: "Имя св-ва", type: "Тип", visibility: "public"})
          break
        case "method":
          this.createNode.methods.push({
            name: "Имя метода",
            parameters: [{name: "Параметр", type: "Тип"}],
            visibility: "public"
          })
          break
        case "param":
          this.createNode.methods[key].parameters.push({name: "Параметр", type: "Тип"})
          break
      }
    },
    deleteProp(element, key) {
      switch (element) {
        case "prop":
          this.createNode.properties.splice(this.createNode.properties.length - 1, 1)
          break
        case "method":
          this.createNode.methods.splice(this.createNode.methods.length - 1, 1)
          break
        case "param":
          this.createNode.methods[parseInt(key)].parameters.splice(this.createNode.methods[parseInt(key)].parameters.length - 1, 1)
          break
      }
    }
  }
}
</script>

<style scoped>
.btn-custom {
  margin-top: 90%;
}
</style>
