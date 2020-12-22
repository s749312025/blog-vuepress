<template>
  <div class="wrapper-sidebar">
	<header class="sidebar clearfix">
	  <div class="site-info">
		<a href="/" class="site-avatar">
		  <img :src="$themeConfig.logo" />
		</a>
		<h1 class="site-name"><a href="/">{{$themeConfig.blogName}}</a></h1>
		<p class="site-description">{{$themeConfig.creed}}</p>
	  </div>
	</header>

	<div class="navlist">
	  <nav>
		  <a v-for="(nav, index) in $themeConfig.nav" :key="index" :href="nav.link">{{nav.text}}</a>
	  </nav>
	</div>
  </div>
</template>

<script>
export default {};
</script>
