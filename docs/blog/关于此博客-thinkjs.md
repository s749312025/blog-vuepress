---
title: 关于此博客-thinkjs
tag: nodejs,javascript
date: 2019-05-09
---

> 早就有了一个自建博客的想法，作为一个前端从业者，自然就想到要用nodejs。利用时间使用Thinkjs 实现了包括文章，评论，分类等功能的一个博客。

### 此博客使用了哪些技术
1. `Thinkjs` 作为后端，提供接口。
`Thinkjs`提供标准的RESTful接口，给后台管理系统使用。
2.  `Vue`开发博客后台。
开发完成，打包成静态文件，利用`Thinkjs`访问静态文件功能，直接访问后台打包后的文件。
3. `ejs`模板引擎来开发博客前台页面。
考虑到seo，最后还是选择了让服务端来渲染页面。好在`Thinkjs`支持模板引擎渲染。

### 设计数据表
写后端，还是得要先设计好数据表。目前博客包含了下面几张表
```js 
/*
user - 用户表
cate - 分类表
article - 文章表
comment - 评论表
cate-article - 分类与文章 多对多关系表
*/
```
结合Thinkjs的数据库模型关联功能
```js
// 文章表 关联查询 分类、用户与评论
module.exports = class extends think.Model {
    get relation() {
        return {
            cate: {
                type: think.Model.MANY_TO_MANY,
                rModel: 'cate_article',
                rfKey: 'cate_id',
                key: 'id',
                fKey: 'article_id',
                field: 'id, cate'
            },
            user: {
                type: think.Model.BELONG_TO,
                field: (rModel, model) => {
                    return 'id,username,email,profile'
                }
            },
            comment: {
                type: think.Model.HAS_MANY,
                order: 'create_time desc'
            }
        }
    }
}
```
*分类关联文章、评论关联用户等就不展开了*

### 接口session验证
后台需要登录，通过标准RESTful来操作数据表。
`Thinkjs`提供了__before 前置处理。通过验证才会继续执行下面的逻辑。
```js
async __before() {
    this.userInfo = await this.session('userinfo').catch(_ => ({}));
    const isLogin = !think.isEmpty(this.userInfo);
    
    if (!isLogin) {
      return this.fail(401, '请登录后操作');
    }
  }
```
### 后台功能
* 操作文章，增删改查，显示/隐藏 文章
* 分类的增删改查
![QQ20190905-021713@2x.png](https://i.loli.net/2019/09/05/XEwUuvNaWO7Kh5b.png)
### markdown渲染
markdown 采用了强大的社区markdown编辑器 [Vditor](https://hacpai.com/article/1549638745630?r=Vanessa)，也是本人喜欢的为数不多的markdown编辑器。
包含了：
* 支持任务列表、at、Echarts图表、流程图、甘特图、时序图、五线谱
* 自定义工具栏按钮、提示、插入文案及快捷键
* 可使用拖拽、剪切板粘贴上传，显示实时上传进度
* 实时保存内容，防止意外丢失
* 录音支持，用户可直接发布语音
* 粘贴 HTML 自动转换为 Markdown
* 粘贴外链图片可通过指定接口上传到服务器
* 支持 CORS 跨域上传
* 提供实时预览、滚动同步定位
* 支持主窗口大小拖拽、字符计数
* 支持自定义 duplicate、delete 快捷键操作
* 多主题支持、内置黑白两套
* 支持主流浏览器和移动端
...

### 前端ejs模板引擎渲染
考虑到seo，最后还是采用了服务端来渲染页面。

### 评论系统
目前本博客主要是以技术博客为主。所以评论系统使用了github的OAuth登录，登录完才能评论。
在GitHub的`Developer settings`的`OAuth Apps` 下建立一个`clarence's blog`。拿到`Client ID`
与 `Client Secret`，实现github的第三方登录。
登录完在用户表存储此github用户的username和头像。然后才可以发布评论。
```js
const insertId = await this.model('user').add(data)
```

### 服务端部署
阿里云的一台小鸡。安装node环境和nginx环境。
pm2启动node服务
页面用nginx来转发node的服务。
静态的内容则直接使用nginx来访问。如 css js文件，还有后台打包后的静态文件。
```nginx
server {
    listen 80;
    server_name test.com www.test.com;
    root /my_client/testBlog/www;
    set $node_port 8360;

    index index.js index.html index.htm;
    if ( -f $request_filename/index.html ){
        rewrite (.*) $1/index.html break;
    }
    if ( !-f $request_filename ){
        rewrite (.*) /index.js;
    }
    location = /index.js {
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://127.0.0.1:$node_port$request_uri;
        proxy_redirect off;
    }

    location ~ /static/ {
        etag         on;
        expires      max;
    }
}
```