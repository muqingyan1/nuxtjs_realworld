<template>
<div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{ profile.username }}</h4>
          <p>
            {{ profile.bio }}
          </p>
          <nuxt-link class="btn btn-sm btn-outline-secondary action-btn"
            to="/settings"
          >
            <i class="ion-gear-a"></i>
            &nbsp;
            Edit Profile Settings
          </nuxt-link>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link class="nav-link"
                :class="{
                    active: tab === 'my'
                }"
                exact
                :to="{
                    name: 'profile',
                    query: {
                        tab: 'my'
                    }
              }">My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link"
                :class="{
                    active: tab === 'feed'
                }"
                exact
                :to="{
                    name: 'profile',
                    query: {
                        tab: 'feed'
                    }
                }">Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview"
            v-for="article in articles"
            :key="article.slug"
        >
            <div class="article-meta">
                <nuxt-link
                    :to="{
                        name: 'profile',
                        params: {
                            username: article.author.username
                        }
                    }"
                >
                    <img :src="article.author.image" />
                </nuxt-link>
                <div class="info">
                    <nuxt-link
                        :to="{
                            name: 'profile',
                            params: {
                                username: article.author.username
                            }
                        }"
                        class="author"
                    >
                        {{ article.author.username }}
                    </nuxt-link>
                    <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right"
                    :class="{ active: article.favorited }"
                    @click="onFavorite(article)"
                    :disabled="article.favoriteDisabled"
                >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
            </div>

            <nuxt-link
                class="preview-link"
                :to="{
                    name: 'article',
                    params: {
                        slug: article.slug
                    }
                }"
            >
                <h1> {{ article.title }} </h1>
                <p> {{ article.description }} </p>
                <span
                    @click="$router.push({
                        name: 'article',
                        params: {
                            slug: article.slug
                        }
                    })">Read more...</span>
                <ul class="tag-list">
                    <li
                        v-for="tag in article.tagList"
                        :key="tag"
                        class="tag-default tag-pill tag-outline">{{ tag }}</li>
                </ul>
            </nuxt-link>
        </div>

        <nav>
            <ul class="pagination">
            <li
                class="page-item"
                v-for="item in totalPage"
                :key="item"
                :class="{
                    active: item === page
                }"
            >
                <nuxt-link
                    class="page-link"
                    :to="{
                        name: 'profile',
                        query: {
                            page: item,
                            tab: tab
                        }
                    }"
                >{{ item }}</nuxt-link>
            </li>
            </ul>
        </nav>

      </div>

    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { getProfiles } from '@/api/profile'
import { getArticles, deleteFavorite, addFavorite, deleteFollow, addFollow } from '@/api/article'

export default {
    name: 'ProfileIndex',
    watchQuery: ['tab', 'page'],
    middleware: 'auth',
    computed: {
        ...mapState(['user']),
        totalPage () {
            return Math.ceil(this.articlesCount / this.limit)
        },
    },
    async asyncData ({params, query}) {

        const username = params.username

        const tab =  query.tab || 'my'  // 初始化 tab为my
        const page = Number.parseInt(query.page|| 1)
        const limit = 5
        const offset = ( page - 1 ) * limit
        const articleParams = tab === 'my'
            ? { author: username }
            : { favorited: username }

        articleParams.limit = limit
        articleParams.offset = offset

        const [profileRes, articlesRes] = await Promise.all([
            // 查询该作者相关信息
            getProfiles(username),
            // 查看该作者文章 或者 作者喜欢的文章
            getArticles(articleParams)
        ])
        const { profile } = profileRes.data
        const { articles, articlesCount } = articlesRes.data
        articles.forEach(article => article.favoriteDisabled = false)
        profile.followDisabled = false

        return {
            tab,
            limit,
            page,
            profile,
            articles,
            articlesCount,
        }
    },
    methods: {
        async onFavorite (article) {
            if (!this.user ) return this.$router.push('/login')
            article.favoriteDisabled = true
            if(article.favorited) {
                // 取消点赞
                await deleteFavorite(article.slug)
                article.favorited = false
                article.favoritesCount -= 1
            } else {
                // 添加点赞
                await addFavorite(article.slug)
                article.favorited = true
                article.favoritesCount += 1
            }
            article.favoriteDisabled = false
        },
        async onFollow (author) {
            if (!this.user ) return this.$router.push('/login')
            author.followDisabled = true
            if(author.following) {
                // 取消关注
                await deleteFollow(author.username)
                author.following = false
                author.favoritesCount -= 1
            } else {
                // 添加关注
                await addFollow(author.username)
                author.following = true
                author.followesCount += 1
            }
            author.followDisabled = false
        }
    }
}
</script>

<style>

</style>