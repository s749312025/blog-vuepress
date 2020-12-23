<template>
    <div class="container theme-default-content posts">
        <h1>{{$page.title}}</h1>
        <div clsss="meta">
            <span class="date">
                {{new Date($frontmatter.date).toLocaleDateString()}}
            </span>
            <ul class="tag">
                <li v-for="(tag, i) in $frontmatter.tag.split(',')" :key="i">
                    <a :href="`/tags/?tag=${tag}`"> {{ tag }} </a>
                </li>
            </ul>
        </div>
        <Content></Content>
    </div>
</template>

<script>
export default {
    
}
</script>