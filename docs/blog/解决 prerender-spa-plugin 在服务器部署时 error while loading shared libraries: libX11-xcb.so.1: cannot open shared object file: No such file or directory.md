---
title: '解决 prerender-spa-plugin 在服务器部署时 error while loading shared libraries: libX11-xcb.so.1: cannot open shared object file: No such file or directory'
tag: javascript,centos,ubuntu
date: 2019-10-10
---

### 解决 prerender-spa-plugin 在服务器部署时 error while loading shared libraries: libX11-xcb.so.1: cannot open shared object file: No such file or directory

 vue使用`prerender-spa-plugin`进行预渲染，在ubuntu服务器部署时，出现报错：
``` bash
 error while loading shared libraries: libX11-xcb.so.1: cannot open shared object file: No such file or directory
```
解决方案：
---
`ubuntu`
```bash
sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
 
如果有的安装不上
```bash
sudo apt-get update
```
---
`centos`同需要安装一些依赖
```bash
sudo yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc
```

附录 
我的配置文件

```js
configureWebpack: config => {
        let plugins = []
        plugins.push(
            new PrerenderSPAPlugin({
                staticDir: path.resolve(__dirname, 'dist'),
                routes: ['/', '/home'],
                minify: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    decodeEntities: true,
                    keepClosingSlash: true,
                    sortAttributes: true
                },
                renderer: new Renderer({
                    // renderAfterDocumentEvent: 'custom-render-trigger'
                })
            })
        )
        config.plugins = [...config.plugins, ...plugins]
    },
```