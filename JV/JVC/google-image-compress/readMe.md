#google的视频和图片压缩技术WebM+WebP介绍和使用#

google发布这2种全新的压缩技术，主要好处是极大的减少视频和图片的大小和占用空间。

##视频压缩格式WebM##

> **介绍:**

WebM由Google提出，是一个开放、免费的媒体文件格式。WebM 影片格式其实是以 Matroska（即 MKV）容器格式为基础开发的新容器格式，里面包括了 VP8 影片轨和 Ogg Vorbis 音轨，其中Google将其拥有的VP8视频编码技术以类似BSD授权开源，Ogg Vorbis 本来就是开放格式。 WebM标准的网络视频更加偏向于开源并且是基于HTML5标准的，WebM 项目旨在为对每个人都开放的网络开发高质量、开放的视频格式，其重点是解决视频服务这一核心的网络用户体验。Google 说 WebM 的格式相当有效率，应该可以在 netbook、tablet、手持式装置等上面顺畅地使用。

WebM在同等大小下不仅清晰度比MP4要清楚很多，而且加载速度也要比MP4快。


> **使用:**

![WebM兼容性](https://raw.githubusercontent.com/jv-fe/jv-fe.github.com/master/JV/JVC/google-image-compress/webm-use.png)

    
        <video loop="true" autoplay="autoplay">
            <source src="http://heroes.nos.netease.com/1/images/landing2/header.webm" type="video/webm">
            <source src="http://heroes.nos.netease.com/1/images/landing2/header.mp4" type="video/mp4">
        </video>

注意这是一种兼容性写法，因为IE9 以下 和 Safari不支持 WebM格式的视频，FF高版本和chrome都支持这类格式。

> **转化工具:**

软件：Miro Video Converter

下载地址：[http://dlsw.baidu.com/sw-search-sp/soft/1d/10139/MiroConverterSetup.exe?version=3510155372](http://dlsw.baidu.com/sw-search-sp/soft/1d/10139/MiroConverterSetup.exe?version=3510155372 "百度下载地址")

官网：[http://www.mirovideoconverter.com/](http://www.mirovideoconverter.com/)


## 图片压缩格式WebP ##

> **介绍:**


由于目前互联网上传输的数据有65%都是图片，WebP就是出于减少数据量、加速网络传输的目的而开发的。为了改善JPEG的图片压缩技术，他们使用了一种基于VP8编码(已在2010五月开源)的图片压缩器，利用预测编码技术，同时还采用了一种基于RIFF的非常轻量级的容器。这种容器只会给每张图片增加20字节，但能让图片作者保存他们想要存储的元数据。



与JPEG相同，WebP是一种有损压缩利用预测编码技术。但谷歌表示，这种格式的主要优势在于高效率。他们发现，“在质量相同的情况下，WebP格式图像的体积要比JPEG格式图像 **小40%**, 对于PNG来说更是高达 **50%~70%**。

**互联网流量60%产生于图片，用.webp格式，网站访问速度将大大提升**

WebP的优势显而易见，但缺少主流浏览器的支持，目前只有chrome支持，手机上只有Android手机支持这一功能，而Apple手机不支持这种格式。

> **使用:**

WebP 的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都相当优秀、稳定和统一。

之前做过一个测试，对比 PNG 原图、PNG 无损压缩、PNG 转 WebP（无损）、PNG 转 WebP（有损）的压缩效果：

![PNG图片比较](https://raw.githubusercontent.com/jv-fe/jv-fe.github.com/master/JV/JVC/google-image-compress/webp-compare2.png)

可以得出结论：

- PNG 转 WebP 的压缩率要高于 PNG 原图压缩率，同样支持有损与无损压缩
- 转换后的 WebP 体积大幅减少，图片质量也得到保障（同时肉眼几乎无法看出差异）
- 转换后的 WebP 支持 Alpha 透明和 24-bit 颜色数，不存在 PNG8 色彩不够丰富和在浏览器中可能会出现毛边的问题


经测试，JPEG 转 WebP 的效果更佳。13 年底 Google 正式推出 Animated WebP，即动态 WebP，既支持 GIF 转 WebP，同时也支持将多张 WebP 图片生成 Animated WebP。但是压缩效果未能达到宣传的那样。如果你在使用 Chrome32 以上的浏览器，可以点这里查看官方提供的实例：


![gif图片比较](https://raw.githubusercontent.com/jv-fe/jv-fe.github.com/master/JV/JVC/google-image-compress/webp-compare.jpg)


浏览器支持状况:

![gif图片比较](https://raw.githubusercontent.com/jv-fe/jv-fe.github.com/master/JV/JVC/google-image-compress/webp-use.png)

> **JS判断:**


由于在中国使用2G流量的手机用户占到50%以上，所以在手机上页面的大小，直接影响到加载速度和用户流量，如果整体页面过大会让用户的整体浏览体验下降，所以我们可以采用JS判断的方法根据不同的浏览器来加载不同格式的图片。



    <script type="text/javascript">
        var testWebp = function(t_callback,f_callback) {
             var image = new Image();
             var use = true
             image.src = 'data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==';
             image.onload = function() {
                t_callback()  //支持WebP用方案
             };
             image.onerror = function() {
                f_callback()   //不支持用此方案
             };
         }
		//运行此程序
         testWebp(function(){
            alert("Y")
         },function(){
            alert("N")
         })
        </script>


- Android手机用户（屌丝多）使用2G的人远高于IOS的，这个也是使用WebP来减少页面大小的急迫性。
- WebP技术目前很多大公司都在使用，APP上应用居多
- Android手机的**浏览器**可以直接支持WebP,IOS暂不支持，而APP应用程序对WebP 两者都支持。

> **转化工具:**


google官方转化工具：[https://developers.google.com/speed/webp/download](https://developers.google.com/speed/webp/download "google官方")

    cwebp  png/jpeg转码webp
    dwebp   webp解码png/jpeg
    gif2webp  git编码webp
    vwebp  预览.webp

其他图形化转换工具：

XnConvert(推荐)：[http://www.xnview.com/en/xnconvert/](http://www.xnview.com/en/xnconvert/)

isparta: [http://isparta.github.io/](http://isparta.github.io/)


参考资料：

[http://isux.tencent.com/introduction-of-webp.html](http://isux.tencent.com/introduction-of-webp.html "ISUX")

[https://developers.google.com/events/io/sessions/325741299](https://developers.google.com/events/io/sessions/325741299)

[https://developers.google.com/speed/webp/](https://developers.google.com/speed/webp/)
