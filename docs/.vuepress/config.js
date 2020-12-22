module.exports = {
    // title: '引流河API文档',
    // description: '引流河API文档',
    port: 3000,
    head: [
        // ['meta', { name: 'theme-color', content: '#409EFF' }],
    ],
    markdown: { // markdown 配置
        // lineNumbers: true
    },
    // theme: require.resolve('./theme/'),
    themeConfig: {
        // logo: '/logo.png',
        // nav : [
        //     { text: '首页', link: '/' }
        // ],
        // smoothScroll: true,
        // sidebarDepth: 2,
        // sidebar: sidebarConfig

        // docsDir: '',

        dateFormat: 'YYYY-MM-DD',
        nav: [ // 导航
            {
                text: 'Blog',
                link: '/posts/',
            },
            {
                text: 'Tags',
                link: '/tag/',
            },
        ],
        directories: [ // 目录分类器
            {
                id: 'post',
                dirname: '_posts',
                path: '/posts/',
                itemPermalink: '/posts/:year/:month/:day/:slug'
            },
        ],
        footer: { // 页脚
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com/zhb333/readme-blog',
                }
            ],
            copyright: [
                {
                    text: '粤ICP备20016112号',
                    link: 'http://beian.miit.gov.cn',
                },
                {
                    text: 'MIT Licensed | Copyright © 2020-present forapi.cn',
                    link: 'https://github.com/zhb333/readme-blog',
                },
            ]
        }
    }
}