---
title: pod install 太慢
tag: javascript
date: 2020-05-02
---

#### 最后我亲测有效的方法，也是觉得蛮靠谱的方法（前提你有Shadow和谐和谐socks，如果没有，请当没见过这篇文章，如果有，请忽略上面的三个方法）

通常pod命令走代理，git download的时候不会走代理，因此在下载过程中就会很慢。所以我们可以通过设置git在访问github上面的库时走代理即可。操作如下，

##### 1、查看自己的Shadow和谐和谐socks默认代理端口

![null](https://pic.rmb.bdstatic.com/29ed5c6736f6cdbed53f5109ba16de6d.png)

##### 2、因为我的默认代理端口是1086，所以输入

git config --global [http.https://github.com.proxy](https://links.jianshu.com/go?to=http.https%3A%2F%2Fgithub.com.proxy) socks5://127.0.0.1:1086

##### 3、嘿嘿嘿，看看配置之后的速度吧（我宿舍就10M的小水管）

![null](https://pic.rmb.bdstatic.com/1688578158590691213c1444a57b8e83.png)

##### 4、最后，恢复git代理的配置

git config --global --unset [http.https://github.com.proxy](https://links.jianshu.com/go?to=http.https%3A%2F%2Fgithub.com.proxy)
