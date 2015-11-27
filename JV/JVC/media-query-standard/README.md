#跨平台响应式设计规范#

##什么是跨平台响应式##

响应式布局是Ethan Marcotte在2010年5月份提出的一个概念，简而言之，就是一个网站能够兼容多个终端——而不是为每个终端做一个特定的版本。这个概念是为解决移动互联网浏览而诞生的。


响应式布局可以为不同终端的用户提供更加舒适的界面和更好的用户体验，而且随着目前大屏幕移动设备的普及，用“大势所趋”来形容也不为过。随着越来越多的设计师采用这个技术，我们不仅看到很多的创新，还看到了一些成形的模式。

> 跨平台（宽度）

- 4K屏PC端：4096 x 3112 （Full Aperture 4K）
- 普通PC端：1024-2560
- pad端：768-1024
- mobile端：320-768

##具体实施和设计##

一般来说通常情况下，设计需要提供4个尺寸：

![](https://raw.githubusercontent.com/jv-fe/jv-fe.github.com/master/JV/JVC/media-query-standard/media-query.jpg)

> 平台尺寸



平台 | PC端台式机 | PC端笔记本 | pad端页面 | 移动端大屏幕 | 移动端小屏幕
--- | --- | --- | --- | --- | ---
显示宽度 | 1200~1920 | 1024~1366（1440） | 768~980 | 480~640（768） | 320~480
设计尺寸 | 1920 | 1200 | 1024 | 640 | 640

> 实际设计尺寸

按照国外标准化的响应式设计尺寸为6个版本，但是从实际应用和减少设计工作量来说可以精简到4个尺寸


平台 | PC端大屏幕 | PC端笔记本or小屏幕 | pad端页面  | 移动端小屏幕
--- | --- | --- | --- | ---
设计稿宽度 | 1920 | 1200 | 980 | 640
主视觉区域 | 1200~1400 | 980（pad的边界尺寸！） | 640 | 640以下


总体上说：

主要根据页面的复杂程度来确定单个页面需要几个尺寸，具体例子：

风暴英雄--英雄页面：[http://us.battle.net/heroes/en/heroes/](http://us.battle.net/heroes/en/heroes/)

实际过渡变化就2种，所以这类只要2个尺寸。

![](https://raw.githubusercontent.com/jv-fe/jv-fe.github.com/master/JV/JVC/media-query-standard/heroes.jpg)

风暴英雄--新闻页面：[http://us.battle.net/heroes/en/blog/](http://us.battle.net/heroes/en/blog/)

变化众多的，就要提供4~5种。


**主要取决于设计给予前端的“自由度”是多大，如果希望前端来把控页面过渡展示，就可以给3个尺寸，如果希望各个过渡区间都能按照设计要求来的，就要给到4~6个尺寸。**


> 响应式优点和缺点

优点：
- 面对不同分辨率设备灵活性强
- 能够快捷解决多设备显示适应问题
- 一站式不用制作多个版本的页面，不需要跳转地址。

缺点：
- 兼容各种设备工作量大，效率低下
- 代码累赘，会出现隐藏无用的元素，**加载时间加长**(这也是设计上要去材质的重要原因)
- 其实这是一种折中性质的设计解决方案，多方面因素影响而**达不到最佳效果**（如果需要酷炫效果还是要定制化）
- 一定程度上改变了网站原有的布局结构，会出现**用户混淆**的情况(过渡要平滑)


###响应式的一些准则（根据国外MEDIA-QUERY社区经验分享）###

1. 在页面设计上使用轻材质（yahoo风格），扁平化（apple系），纯色系（win8，google系）
2. 每个尺寸下的过渡要平滑，整体模块做减法或者下移
3. 不同平台下的交互要符合各个平台的用户习惯，交互上如PC端：click，hover事件，移动端：touch，拖移行为
4. mobile尺寸时，太多花哨的背景和重材质的元素尽可能少，这是考虑到中国的2G用户，所谓**本土化**



> 相关资料:

经典设计案例：[http://mediaqueri.es/](http://mediaqueri.es/)

工具和组织：[http://froont.com/](http://froont.com/)

“响应式之父” Ethan Marcotte 主页：[http://ethanmarcotte.com/](http://ethanmarcotte.com/)

使命召唤：[https://www.callofduty.com/](https://www.callofduty.com/)

overwatch：[http://us.battle.net/overwatch/en/](http://us.battle.net/overwatch/en/)

三星：[http://www.samsung.com/cn/home](http://www.samsung.com/cn/home)