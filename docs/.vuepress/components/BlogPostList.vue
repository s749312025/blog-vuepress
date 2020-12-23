<template>
	<div class="posts">
		<div v-for="(item, index) in blogList" :key="index" class="post pinned">
			<h1>
				<a :href="item.path">{{ item.frontmatter.title || item.title }}</a>
			</h1>
			<div clsss="meta">
				<span class="date" v-if="item.frontmatter.date"> {{ new Date(item.frontmatter.date).toLocaleDateString() }} </span>
				<ul class="tag">
					<li v-for="(tag, i) in item.frontmatter.tag.split(',')" :key="i">
						<a :href="`/tags/?tag=${tag}`"> {{ tag }} </a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			blogList: [],
		};
	},
	mounted() {
		this.blogList = this.list.filter(
			(item) => item.regularPath.indexOf("/blog/") > -1
		).sort((a, b) => {
			return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
		});
	},
};
</script>