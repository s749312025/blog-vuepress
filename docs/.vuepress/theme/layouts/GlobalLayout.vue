<template>
  <div id="global-layout">
	<left></left>
	<div class="main wrapper-content" role="main" id="main">
	  	<navBar></navBar>
		<component :is="layout" />
		<div class="wrapper-footer-mobile">
			<footer class="footer">
				<p>我的每一步都是在尝试</p>
			</footer>
		</div>
	</div>
  </div>
</template>

<script>
import left from "../global-components/left"
import navBar from '../global-components/navBar';
export default {
  components: { left, navBar },
  computed: {
	layout() {
	  if (this.$page.path) {
		if (this.$frontmatter.layout) {
		  // 你也可以像默认的 globalLayout 一样首先检测 layout 是否存在
		  return this.$frontmatter.layout;
		}
		return "Layout";
	  }
	  return "NotFound";
	},
  },
};
</script>