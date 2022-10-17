<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <h5>Добавить связь от {{ this.first.name }} к {{ this.second.name }}</h5>
      </div>
    </div>
    <div class="row py-2">
        <div class="form-group">
          <label>Выберите связь</label>
          <select class="form-select" v-model="selectRelation">
            <option v-for="(relation, key) in relations" :key="key" :value="relation.link" >{{relation.name}}</option>
          </select>
        </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-primary" @click.prevent="addRelation()">Добавить</button>
      </div>
    </div>
  </div>

</template>

<script>
import {eventBus} from "@/eventBus";
export default {
  name: "AddLinkForm",
  data(){
    return{
      selectRelation: null,
      relations:[
        {name:'Наследование', link: 'generalization'},
        {name:'Агрегация', link: 'aggregation'},
        {name:'Композиция', link: 'composition'},
        {name:'Ассоциация', link: 'association'},
        {name:'Реализация', link: 'realization'},
        {name:'Зависимость', link: 'dependence'},
      ]
    }
  },
  props: ['first', 'second'],
  methods:{
    addRelation(){
     let relation = {
        from: this.first.key,
        to: this.second.key,
       relationship: this.selectRelation,
      }
      eventBus.$emit('addRelation', relation)
      this.$modal.hideAll()
    }
  },
  mounted() {
    console.log(this.first)
  }
}
</script>

<style scoped>

</style>
