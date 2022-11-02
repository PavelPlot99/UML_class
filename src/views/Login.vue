<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col text-center">
        <h1>Вход</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8">
        <form>
          <div class="mb-3">
            <label for="login" class="form-label">Логин</label>
            <input type="password" class="form-control" v-model="data.login" id="login" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label" >Пароль</label>
            <input type="password" class="form-control"  v-model="data.password" id="password">
          </div>
          <button type="submit" class="btn btn-primary" style="margin-right: 30px" @click.prevent="login">Войти</button>
          <span>Нет аккаунта? <router-link :to="'register'">Зарегистрируйтесь</router-link></span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data(){
    return{
      data:{
        login:null,
        password: null,
      },
      loading: false,
    }
  },
  methods:{
    async login(){
      this.loading = true
      let data = await this.$store.dispatch('LOGIN', this.data)
      this.loading = false
      this.$notify({
        type: data.type,
        title: data.title,
        text: data.message,
      })
      if(data.type === 'success'){
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>

</style>
