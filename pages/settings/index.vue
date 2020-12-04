<template>
<div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <ul class="error-messages">
          <template v-for="(messages, field) in errors">
            <li v-for="(message, index) in messages" :key="index">{{ field }} {{ message }}</li>
          </template>
        </ul>

        <form>
          <fieldset>
              <fieldset class="form-group">
                <input v-model="author.image" :disabled="disabled" class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="author.username" :disabled="disabled" class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="author.bio" :disabled="disabled" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="author.email" :disabled="disabled" class="form-control form-control-lg" type="email" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="author.password" :disabled="disabled" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="onSubmit">
                Update Settings
              </button>
          </fieldset>
        </form>

        <hr>
        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
const Cookie = process.client ? require('js-cookie'): undefined
import { updateUser } from '@/api/user'
import { mapState } from 'vuex'

export default {
    name: 'SettingIndex',
    middleware: 'auth',
    data() {
        return {
            author: {
              username: '',
              email: '',
              bio: '',
              image: '',
              password: ''
            },
            disabled: false,
            errors: {}
        }
    },
    computed: {
      ...mapState(['user'])
    },
    mounted () {
        this.author.bio = this.user.bio
        this.author.email = this.user.email
        this.author.image = this.user.image
        this.author.password = this.user.password
        this.author.username = this.user.username
    },
    methods: {
        async onSubmit () {
            this.disabled = true
            try {
                const { data } = await updateUser({
                  user: this.author
                })

                // 成功后跳转到该文章页面 /article/slug
                // 更新用户的登录状态
                this.$store.commit('setUser', data.user)
                // 为了防止刷新页面数据丢失，数据需要持久化
                Cookie.set('user', data.user)

                this.$router.push(`/profile/${data.user.username}`)
                // const { slug } = data
                // this.$router.push({
                //   name: 'article',
                //   params: {
                //     slug
                //   }
                // })

            } catch (err) {
                this.disabled = false
                this.errors = err.response.data.errors
            }
        },
        logout () {
            // 删除用户的登录状态
            this.$store.commit('setUser', null)

            // 删除数据持久化
            Cookie.set('user', null)

            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>