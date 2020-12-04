<template>
    <div class="article-meta">
        <nuxt-link :to="{
            name: 'profile',
            params: {
                username: article.author.username
            }
        }">
            <img :src="article.author.image" />
        </nuxt-link>
        <div class="info">
            <nuxt-link class="author" :to="{
                name: 'profile',
                params: {
                    username: article.author.username
                }
            }">
                {{ article.author.username }}
            </nuxt-link>
            <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
        </div>
        <template v-if="user.username !== article.author.username">
            <button
                class="btn btn-sm btn-outline-secondary"
                :class="{
                    active: article.author.following
                }"
                @click="onFollow(article.author)"
            >
                <i class="ion-plus-round"></i>
                &nbsp;
                {{ article.author.following ? 'UnFollow': 'Follow'  }} {{ article.author.username }}
            </button>
            &nbsp;&nbsp;
            <button
                class="btn btn-sm btn-outline-primary"
                :class="{
                    active: article.favorited
                }"
                @click="onFavorite(article)"
            >
                <i class="ion-heart"></i>
                &nbsp;
                {{ article.favorited ? 'UnFavorite': 'Favorite'  }} Post <span class="counter">({{ article.favoritesCount }})</span>
            </button>
        </template>
        <template v-else>
            <nuxt-link
                class="btn btn-outline-secondary btn-sm"
                :to="{
                    name: 'editor',
                    params: {
                        slug: article.slug,
                    },
                }"
            >
                <i class="ion-edit"></i> Edit Article
            </nuxt-link>

            <button
                class="btn btn-outline-danger btn-sm"
                :class="{ disabled: article.isDeleting }"
                @click="handleDelete(article)"
            >
                <i class="ion-trash-a"></i> Delete Article
            </button>
        </template>

    </div>
</template>

<script>
import { mapState } from "vuex"
import { deleteFavorite, addFavorite, deleteFollow, addFollow } from '@/api/article'
import { deleteArticle } from '@/api/article'

export default {
    name: 'ArticleMeta',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState(["user"]),
    },
    methods: {
        async handleDelete(article) {
            this.article.isDeleting = true
            await deleteArticle(article.slug)
            this.article.isDeleting = false
            this.$router.push('/')
        },
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
    },
}
</script>

<style>

</style>