<template>
<div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <ul class="error-messages">
            <template v-for="(messages, field) in errors">
                <li v-for="(message, index) in messages" :key="index">{{ field }} {{ message }}</li>
            </template>
        </ul>

        <form>
          <fieldset>
            <fieldset class="form-group">
              <input :disabled="disabled" v-model="article.title" required type="text" class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
              <input :disabled="disabled" v-model="article.description" required type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
              <textarea :disabled="disabled" v-model="article.body" required class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input :disabled="disabled" v-model="curtag" type="text" class="form-control" placeholder="Enter tags" @keyup.enter="savetags">
              <div class="tag-list">
                <span v-for="(item,index) in article.tagList" class="tag-default tag-pill">
                  <i class="ion-close-round" @click="deltag(index)"></i>
                  {{ item }}
                </span>
              </div>
            </fieldset>
            <button :disabled="disabled" class="btn btn-lg pull-xs-right btn-primary" type="button" @click="onSubmit">
              Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from '@/api/article'

export default {
    name: 'Editor',
    middleware: 'auth',
    data () {
        return {
            article: {
                title: '',
                description: '',
                body: '',
                tagList: []
            },
            curtag: '',
            disabled: false,
            errors: {} // 错误信息
        }
    },
    async mounted () {
        const slug = this.$route.params.slug
        if (slug) {
            this.slug = slug
            const { data } = await getArticle(slug)
            this.article = data.article
        }
    },
    methods: {
        savetags(){
          if(!this.article.tagList.includes(this.curtag)){
              this.article.tagList.push(this.curtag)
              this.curtag = ''
          }
        },
        deltag(index) {
            // const index = this.article.tagList.indexOf(item)
            this.article.tagList.splice(index,1)
        },
        async onSubmit () {
            this.disabled = true
            try {
                if(this.slug){
                    const { data } = await updateArticle(this.slug, {article: this.article})
                    this.$router.push(`/article/${data.article.slug}`)
                }else{
                    const { data } = await createArticle({
                        article: this.article
                    })
                    this.$router.push(`/article/${data.article.slug}`)
                    // 成功后跳转到该文章页面 /article/slug
                    // const { slug } = data
                    // this.$router.push({
                    //     name: 'article',
                    //     params: {
                    //         slug
                    //     }
                    // })
                }
                
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