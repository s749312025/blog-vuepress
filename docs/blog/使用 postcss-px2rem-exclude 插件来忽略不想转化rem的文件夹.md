---
title: 使用 postcss-px2rem-exclude 插件来忽略不想转化rem的文件夹
tag: vue
date: 2020-04-21
---

## 使用 postcss-px2rem-exclude 插件来忽略不想转化rem的文件夹

### 起因：

vue多页面(`multi-page`)，有pc端的页面，也有app端的页面。
pc端使用的是`element-ui`
app端使用的是`cube-ui`
使用postcss-px2rem时连着pc端的`element-ui`也转化成了rem

### 解决：

```bash
npm install postcss-px2rem-exclude --save-dev
```

在`package.json`中修改原来的
```json
"postcss-px2rem": {
     "remUnit": 37.5
}
```

变成
```json
"postcss-px2rem-exclude": {
    "remUnit": 37.5,
    "exclude": "/node_modules/element-ui|floder_name/i|src/index"
}
```
### 结果
`element-ui`内的css 和 pc入口下的css中的px没有转化成rem
app端的css都按照预想转化成了rem

#### 成功！！！