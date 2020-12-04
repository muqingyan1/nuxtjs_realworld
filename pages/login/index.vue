<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ islogin ? "Sign in" : "Sign up" }}
          </h1>
          <p class="text-xs-center">
            <nuxt-link v-if="islogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">{{ field }} {{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!islogin" class="form-group">
              <input v-model="user.username" :disabled="disabled" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" :disabled="disabled" class="form-control form-control-lg" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" :disabled="disabled" class="form-control form-control-lg" type="password" placeholder="Password" required minlength="8">
            </fieldset>
            <button :disabled="disabled" class="btn btn-lg btn-primary pull-xs-right">
              {{ islogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'

// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'LoginIndex',
  middleware: 'notAuth',
  computed: {
    islogin () {
      return this.$route.path === '/login'
    }
  },
  data(){
    return{
      user:{
        email:'lpzmail@163.com',
        password: '12345678',
        username: ''
      },
      disabled: false,
        errors: {} // 错误信息
    }
  },
  methods: {
    async onSubmit(){
      this.disabled = true
      try{
        const { data } = this.islogin
        ? await login({user: this.user})
        : await register({user: this.user})

        this.$store.commit('setUser', data.user)
        Cookie.set('user', data.user)
        this.$router.push('/')
      } catch (err) {
        this.disabled = false
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>

<style>

</style>