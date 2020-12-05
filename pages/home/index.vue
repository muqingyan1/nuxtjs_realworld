<template>
<div class="home-page">

    <div class="banner">
        <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place</p>
        </div>
    </div>

    <div class="container page">
        <div class="row">

            <div class="col-md-9">
                <div class="feed-toggle">
                    <ul class="nav nav-pills outline-active">
                        <li v-if="user" class="nav-item">
                            <nuxt-link
                                class="nav-link"
                                :class="{
                                    active: tab === 'your_feed'
                                }"
                                exact
                                :to="{
                                    name: 'home',
                                    query: {
                                        tab: 'your_feed'
                                    }
                                }"
                            >Your Feed</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link
                                class="nav-link"
                                :class="{
                                    active: tab === 'global_feed'
                                }"
                                exact
                                :to="{
                                    name: 'home',
                                    query: {
                                        tab: 'global_feed'
                                    }
                                }">Global Feed
                            </nuxt-link>
                        </li>
                        <li v-if="tag" class="nav-item">
                            <nuxt-link
                                class="nav-link"
                                exact
                                :class="{
                                    active: tab === 'tag'
                                }"
                                :to="{
                                    name: 'home',
                                    query: {
                                        tab: 'tag',
                                        tag: tag
                                    }
                                }"> # {{ tag }}
                            </nuxt-link>
                        </li>
                    </ul>
                </div>

                <div
                    class="article-preview"
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
                        <button
                            class="btn btn-outline-primary btn-sm pull-xs-right"
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
                                name: 'home',
                                query: {
                                    page: item,
                                    tag: $route.query.tag,
                                    tab: tab
                                }
                            }"
                        >{{ item }}</nuxt-link>
                    </li>
                    </ul>
                </nav>

            </div>

            <div class="col-md-3">
                <div class="sidebar">
                    <p>Popular Tags</p>

                    <div class="tag-list">
                        <nuxt-link
                            v-for="tag in tags"
                            :key="tag"
                            :to="{
                                name: 'home',
                                query: {
                                    tag: tag,
                                    tab: 'tag'
                                }
                            }"
                            class="tag-pill tag-default">{{ tag }}
                        </nuxt-link>
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>
</template>


<script>
import { getArticles, getYourFeedArticles, addFavorite, deleteFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'

export default {
    name: 'HomeIndex',
    watchQuery: ['page', 'tag', 'tab'],
    computed: {
        ...mapState(['user']),
        totalPage () {
            return Math.ceil(this.articlesCount / this.limit)
        }
    },
    async asyncData ({ query }) {
        const page = Number.parseInt(query.page|| 1)
        const limit = 5
        const tab = query.tab || 'global_feed'
        const tag = query.tag

        const loadArticles = tab === 'your_feed'
            ? getYourFeedArticles
            : getArticles

        const [ articleRes, tagRes ] = await Promise.all([
            loadArticles({
                limit,
                offset: (page - 1) * limit,
                tag
            }),
            getTags()
        ])
        // const articleRes = await getArticles({
        //     limit,
        //     offset: (page - 1) * limit,
        //     tag
        // })

        // const tagRes = await getTags()
        const { articles, articlesCount } = articleRes.data
        const { tags } = tagRes.data

        articles.forEach(article => article.favoriteDisabled = false)

        return {
            articles, // 文章列表
            articlesCount, // 文章总数
            tags, // 标签列表
            limit, // 每页大小
            page, // 页码
            tab, // 选项卡
            tag // 数据标签
        }
    },
    methods: {
        async onFavorite (article) {
            if (!this.user ) return this.$router.push('/login')

            article.favoriteDisabled = true
            if (article.favorited) {
                await deleteFavorite(article.slug)
                article.favorited = false
                article.favoritesCount += -1
            } else {
                await addFavorite(article.slug)
                article.favorited = true
                article.favoritesCount += 1
            }
            article.favoriteDisabled = false

        }
    }
}
</script>

<style>

</style>