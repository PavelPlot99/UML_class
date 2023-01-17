<template>
  <div class="container-fluid" style="margin-top: 15%;">
    <div class="row justify-content-center">
      <div class="col text-center">
        <h1>Регистрация</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-5">
        <form>
          <div class="mb-3">
            <label for="login" class="form-label">Логин</label>
            <input type="password" class="form-control" v-model="data.login" id="login" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input type="password" class="form-control" v-model="data.password" id="password">
          </div>
          <button type="submit" class="btn btn-primary" style="margin-right: 30px"
            @click.prevent="register">Зарегистрироваться</button>
          <span>Уже есть аккаунт <router-link :to="'login'">Войти</router-link></span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    return {
      data: {
        login: null,
        password: null,
      },
      loading: false,
    }
  },
  methods: {
    async register() {
      this.loading = true
      let data = await this.$store.dispatch('REGISTER', this.data)
      this.loading = false
      this.$notify({
        type: data.type,
        title: data.title,
        text: data.message,
      })
      if (data.type == 'success') {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>

</style>
