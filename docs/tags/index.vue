<template>
    <div class="container menu">
        <div v-if="tagQuery">标签：{{tagQuery}}</div>
        <BlogPostList v-if="tagQuery && allTags[tagQuery]" :list="allTags[tagQuery]"></BlogPostList>
        <div v-else class="posts">
            <h1>所有标签</h1>
            <div class="meta">
                <ul class="tag">
                    <li v-for="(item, index) in allTags" :key="index">
                        <a :href="`/tags/?tag=${index}`">{{index}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BlogPostList from '../.vuepress/components/BlogPostList';
import blogCate from '../.vuepress/theme/mixins/blogCate'
export default {
    mixins: [blogCate],
    components: {
        BlogPostList,
    },
    data() {
        return {
            allTags: [],
            tagQuery: this.$route.query.tag || ''
        }
    },
    mounted () {
        this.allTags = {...this.tags}
    },
}
</script>
