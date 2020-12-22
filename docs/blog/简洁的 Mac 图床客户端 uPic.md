---
title: 简洁的 Mac 图床客户端 uPic
tag: 福利
date: 2020-04-26
---

## 📑 简介

> **uPic(upload Picture) 是一款 Mac 端的图床(文件)上传客户端**  
> 可将图片、各种文件上传到配置好的指定提供商的对象存储中。  
> 然后快速获取可供互联网访问的文件 URL

**💡 特点：** 无论是本地文件、或者屏幕截图都可自动上传，菜单栏显示实时上传进度。上传完成后文件链接自动复制到剪切板，让你无论是在写博客、灌水聊天都能快速插入图片。  
连接格式可以是普通 URL、HTML 或者 Markdown，仍由你掌控。

**🔋 支持图床：** [smms](https://sm.ms/)、 [又拍云 USS](https://www.upyun.com/products/file-storage)、[七牛云 KODO](https://www.qiniu.com/products/kodo)、 [阿里云 OSS](https://www.aliyun.com/product/oss/)、 [腾讯云 COS](https://cloud.tencent.com/product/cos)、[微博](https://weibo.com/)、[Github](https://github.com/settings/tokens)、 [Gitee](https://gitee.com/profile/personal_access_tokens)、 [Amazon S3](https://aws.amazon.com/cn/s3/)、[自定义上传接口](https://blog.svend.cc/upic/tutorials/custom)、…

## 🚀 如何安装

### 下载安装

#### [](https://blog.svend.cc/upic/#1-Homebrew "1.Homebrew:")1.Homebrew:


```bash
brew cask install upic 
 ```

#### 2.手动

从 [Github release](https://github.com/gee1k/uPic/releases) 下载。  
**如果访问 Github 下载困难的，可以从[Gitee release](https://gitee.com/gee1k/uPic/releases)下载。**

###  检查 Finder 扩展权限

* 1.打开 uPic
    
* 2.打开`系统偏好设置` - `扩展` - `访达扩展` 确保 `uPicFinderExtension`是勾选状态
    
      
    [![null](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/finder-extension.png)](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/finder-extension.png)  
    

## 🕹 使用方式

| 功能 |  描述 |  预览 |
| :-- |  :-- |  :-- |
| **🖥 选择文件上传** |  从`Finder`选择文件上传。`可设置全局快捷键` |  [![](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/selectFile.gif)](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/selectFile.gif) |
| **⌨️ 复制文件上传** |  上传已拷贝到剪切板的文件。`可设置全局快捷键` |  [![](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/pasteboard.gif)](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/pasteboard.gif) |
| **📸 截图上传** |  直接拉框截图上传。`可设置全局快捷键` |  [![](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/screenshot.gif)](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/screenshot.gif) |
| **🖱 拖拽本地文件上传** |  拖拽文件到状态栏上传 |  [![](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/dragFile.gif)](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/dragFile.gif) |
| **🖱 拖拽浏览器图片上传** |  从浏览器拖拽图片到状态栏上传 |  [![](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/dragFromBrowser.gif)](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/dragFromBrowser.gif) |
| **📂 Finder 中右键上传** |  右击文件上传 |  [![](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/contextmenu.gif)](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/contextmenu.gif) |
| **⌨️ 命令行上传** |  通过执行命令调用 uPic 上传文件 |  [![](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/cli.gif)](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/cli.gif) |

## 🧰 更多功能

### 1.全局快捷键

[![null](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/shortcuts.png)](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/shortcuts.png)

###  2. 上传历史

[![null](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/history.png)](https://cdn.jsdelivr.net/gh/gee1k/oss@master/screenshot/uPic-cn/history.png)


转过来的，方便自己查看 [原文链接](https://blog.svend.cc/)