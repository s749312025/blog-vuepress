export default {
    data() {
        return {
            tags: [],
        }
    },
    mounted () {
        for (const key in this.$site.pages) {
            if(this.$site.pages[key].frontmatter.tag) {
                let blogTagsArr = this.$site.pages[key].frontmatter.tag.split(',')
                blogTagsArr.map(item => {
                    if (this.tags[item]) {
                        this.tags[item].push(this.$site.pages[key])
                    } else {
                        this.tags[item] = [this.$site.pages[key]]
                    }
                })
            }
        }
        console.log(this.tags);
    },
}