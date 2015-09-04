#SVG Practice

##SVG
SVG是"Scalable Vector Graphics"的简称。中文可以理解成“可缩放矢量图形”。于2013年成为W3C推荐标准。简单说：

* SVG用来定义用于网络的基于矢量的图形
* SVG使用XML格式定义图形
* SVG图像在放大或缩小（改变尺寸）的情况下，其图形质量不会受受损失
* SVG是W3C的一个标准
* SVG支持的浏览器：IE9+

##SVG vs Icon Font
从SVG是矢量这个特点可以看出它非常适合做页面上的图标，方便放大缩小和更换颜色。那它跟同样有这种特点的Icon Font有什么区别呢？我们看下Icon Font的一些缺陷就知道了：

* Icon Font本质上是文字，系统会对文字进行抗锯齿优化。不同系统下对文字进行抗锯齿的算法不同，可能会导致显示效果不大相同。
* Icon Font显示的位置大小会受font-size,line-height,word-spacing等css属性影响，调整起来比较麻烦。
* Icon Font为了实现最大程度的浏览器支持，可能要提供至少四种不同类型的字体文件。包括TTF、WOFF、EOT 以及一个使用 SVG 格式定义的字体。

##How to import svg

###1.img/object tag
```html
/* svg as object */
<object type="image/svg+xml" data="image.svg" class="logo"></object>
/* svg as img */
<img src="image.svg" class="logo"/>
```
使用 img 和 object 标签直接引用 SVG 是早期常见的使用方法。 这种方法的缺点主要在于要求每个图标都单独保存成一个 SVG 文件，使用时也是单独请求的。 如果在页面中使用的多个图标，每个都是单独请求的话会产生很多请求数，增加服务端的负载和拖慢页面加载速度， 因此现在很少使用了。

###2.Inline SVG
```html
<!-- 画一个半径50的圆 -->
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50"></circle>
</svg>
```
 Inline SVG，就是直接把SVG写入HTML中，这种方法简单直接。它作为 HTML 文档的一部分，不需要单独请求。但大量的SVG会造成HTML的臃肿。
 
###3.Data URIs
```css
.icon{
  background: url(data:text/svg+xml;base64,<base64 encoded data>)
}
```
使用base64来引用SVG。如果使用grunt这样的构建工具，那么将SVG整合到一个CSS当中是可以非常方便地自动化完成的。但这种方法的缺点是不能方便地使用CSS修改icon的颜色。

###4.SVG Sprite
```css
.icon{
  background: url(sprite.svg) -180px -180px;
}
```
SVG Sprite类似于IMG Sprite,把各个svg图标合并在一张svg里面，然后通过background-position来定位，这样能有效减少请求。可看下这个[网站](http://www.wikiwand.com/)底部几个设备的图标，用的就是SVG Sprite。目前有些网站（如[icomoon](https://icomoon.io/app/)）已经提供在线输出SVG Sprite功能。同样grunt也有这样的构建工具能自动地把某个文件夹中的svg自动拼合成Sprite并输出对应CSS。使用SVG Sprite还有个好处是使用时能fallback到位图的PNG Sprite，这样可以兼容到IE7/8。
```css
.icon{
  /* IE7/8 */
  background: url(sprite.png) -180px -180px;
  /* IE9+ */
  background: url(sprite.svg) -180px -180px;
}
```
但和SVG Sprite和Data URIs方法一样它同样存在不能方便调整颜色样式的问题。

###5.SVG Symbols
```html
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="film" viewBox="0 0 32 32">
      <title>film icon</title>
      <path d="M0 0"/><path d="M0 4v24h32V4H0zm6 22H2v-4h4v4zm0-8H2v-4h4v4zm0-8H2V6h4v4zm18 16H8V6h16v20zm6 0h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4V6h4v4zm-18 0v12l8-6z"/>
    </symbol>
    <symbol id="home" viewBox="0 0 32 32">
      <title>home icon</title>
      <path d="M0 0"/><path d="M16 2L0 18l3 3 3-3 2 12h6v-6h4v6h6l2-12 3 3 3-3L16 2zm0 12.828c-1.562 0-2.83-1.266-2.83-2.828S14.438 9.172 16 9.172c1.562 0 2.828 1.266 2.828 2.828S17.562 14.828 16 14.828z"/>
    </symbol>
</svg>
```
SVG Symbols区别于第二种Inline SVG。它用symbol元素来定义每个图标元件的信息，包括图标的引用(id)，图标的标题(title)还有图标的绘画路径(path)等等。这样在html页面定义好了，后面的引用就方便了。直接用use元素引用对应的symbol id即可。
```html
<svg class="u-svg u-svg-film">
  <use xlink:href="film"></use>
</svg>
<svg class="u-svg u-svg-home">
  <use xlink:href="home"></use>
</svg>
```
这种方式我们可以灵活的用css控制svg的大小和颜色。
```css
/* css控制svg大小 */
.u-svg{width:30px;height:30px;}
/* css控制svg不同颜色 */
.u-svg-film{fill:red;}
.u-svg-film:hover{fill:green;}
.u-svg-home{fill:#999;}
.u-svg-home:hover{fill:#333;}
```
同样这种方式有个不好地方就是会造成html的臃肿。所以可以用下面完整路径引用svg。
```html
<!-- 外链svg文件，不用写在html里 -->
<svg class="u-svg u-svg-film">
  <use xlink:href="/img/svg-icons.svg#film"></use>
</svg>
<svg class="u-svg u-svg-home">
  <use xlink:href="/img/svg-icons.svg#home"></use>
</svg>
```
这种外链引用的方式可以说是最优雅完美的。但…IE9-11不支持这种外链的方式引用svg，可以通过[Ajax请求](https://css-tricks.com/svg-use-external-source/)来hack问题，但总感觉不够纯粹。

##SVG Practice
这次做魔兽暗黑联合活动专题，尝试着用svg来做分享的icon图标。因为分享的这几个图标通用于各个专题，但它的大小和hover颜色则根据专题每次都不同的。我们前端每次都单独切一份图，还是挺烦的。而SVG的特点正好可以满足我们灵活更换大小颜色的需求。

首先我们需要矢量的svg分享图标。一般来说，这个是由视觉提供。但我找到了个非常好的工具，可以方便地把位图转成svg矢量图——[ Vector Magic](http://pan.baidu.com/s/1dDnqdxf)，这样就不用设计师介入了(当然设计师提供的肯定会更精细)。

这个工具比较简单，直接把图标的png图片导进去，一步步往下就能输出svg的矢量图了。


## Reference
1. [SVG系列教程](http://www.w3cplus.com/html5/svg-introduction-and-embedded-html-page.html)
2. [SVG的用法](http://www.webhek.com/svg/)
3. [未来必热：SVG Sprite技术介绍](http://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/)
4. [icomoon](https://icomoon.io/app/)
5. [icon-fonts-vs-svg](https://css-tricks.com/icon-fonts-vs-svg/)
6. [Web 设计新趋势: 使用 SVG 代替 Web Icon Font](http://io-meter.com/2014/07/20/replace-icon-fonts-with-svg/)
7. [使用SVG中的Symbol元素制作Icon](http://isux.tencent.com/16292.html)