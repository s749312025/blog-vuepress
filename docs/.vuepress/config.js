module.exports = {
    title: "clarence's blog",
    port: 3000,
    description: "clarence's blog",
    shouldPrefetch: () => false,
    head: [
        // ['meta', { name: 'theme-color', content: '#409EFF' }],
    ],
    markdown: { // markdown 配置
        // lineNumbers: true
    },
    // theme: require.resolve('./theme/'),
    themeConfig: {
        blogName: "clarence's blog",
        creed: '敦琢其玉 客信与人',
        logo: 'https://img12.360buyimg.com/img/jfs/t1/54050/14/8277/26915/5d5b7a59E619bbb77/079bf85340568851.png',
        nav : [
            { text: '首页', link: '/' },
            { text: '标签', link: '/tags' },
            { text: '关于', link: '/about' },
            { text: '博客技术', link: '/blog/关于此博客-vuepress.html' },
        ],
        footer: { // 页脚
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com/s749312025/blog-vuepress',
                }
            ],
        }
    }
}