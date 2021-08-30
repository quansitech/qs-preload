# 轻量首屏加载进度效果

1. 2KB的文件大小，非常轻量
2. 简单易用
3. 分析了多个获奖网站的首屏加载效果，选取了一种logo透明渐变的加载效果，设计感十足。

## 用法
```javascript
<script src="./qs-preload.min.js"></script>
```

js会自动往window变量注册一个preload函数
```javascript
//第一个参数设置logo
//第二个参数接受数组，需要进行监控加载的js文件
window.preload('https://domain/favicon.ico', ['https://domain/Public/js/main.js', 'https://domain/Public/js/main1.js']);  
```



## 效果



<img src="https://user-images.githubusercontent.com/1665649/131285496-df2db6ee-7f86-4110-9715-cba7ceb070a6.gif" />

