#移动端滚屏组件2.1#

> Latest stable version

v2.1
增加了PC 端的支持，通过滚轮来进行页面切换



##使用##

用途：主要用于手机端微信页面的快速开发


此组件除了提供4个JS 的动画以外，还提供一套触发css3动画的机制


> **html 代码结构**

```html
<div class="main">
	<div class="content" id="content" data-index="1">
		<section class="screen" id="screen_1">

		</section>
		<section class="screen" id="screen_2">

		</section>
		<section class="screen" id="screen_3">

		</section>
	</div>
</div>
```

这里需要注意的是js组件主要通过 **id="screen_1"** 来控制不同场景的切换，所以html中的id必须按照顺序书写，如：
 id="screen_1"， id="screen_2"， id="screen_3"

每个场景的css3动画的添加和实现，主要通过标签属性 **data-class="animate-css"**

如：

	<div class="demo" data-class="fadeInLeft">A</div>

页面具体实施：

```html
    <section class="screen" id="screen_3">
		<div class="demo_icon pos_5 ani_200ms green" data-class="fadeInLeft">A</div>
		<div class="demo_icon pos_2 ani_600ms blue" data-class="fadeInRight">B</div>
		<div class="demo_icon pos_1 ani_1s yellow" data-class="fadeInRight">C</div>
		<div class="demo_icon pos_6 ani_800ms purple" data-class="fadeInLeft">D</div>
		<div class="page_arrow">
			<img src="img/arrow.png">
		</div>
	</section>
```


> **JS 代码**

```javascript
new JV.phoneSlide($("#content"), {
	effect: "ScreenCling", //ScreenCling,ScreenTouch,ScreenTouchGo
	speed: 200, //滚动速度快慢
	scale: "n", //是否有滚动缩放 "n" or "y"
	rotation:"y", //是否开启横屏提示
	callBack: function(index) { //滚屏组件
		if (index == 1) { //是否是第一页
		}
	}
});
```

横屏提示功能 rotation:"y"


> **css代码**

```css
.fadeInRight {
    -webkit-animation:fadeInRight .4s 0s ease-out both;
    animation:fadeInRight .4s 0s ease-out both;
}
.fadeInLeft {
    -webkit-animation:fadeInLeft .4s 0s ease-out both;
    animation:fadeInLeft .4s 0s ease-out both;
}
.fadeInTop {
    -webkit-animation:fadeInTop .4s 0s ease-out both;
    animation:fadeInTop .4s 0s ease-out both;
}
.fadeInBottom {
    -webkit-animation:fadeInBottom .4s 0s ease-out both;
    animation:fadeInBottom .4s 0s ease-out both;
}
.ani_200ms {
    -webkit-animation-delay:.2s;
    animation-delay:.2s;
}
.ani_400ms {
    -webkit-animation-delay:.4s;
    animation-delay:.4s;
}
.ani_600ms {
    -webkit-animation-delay:.6s;
    animation-delay:.6s;
}
.ani_800ms {
    -webkit-animation-delay:.8s;
    animation-delay:.8s;
}
.ani_1s {
    -webkit-animation-delay:1s;
    animation-delay:1s;
}

```

准备了一些通用css样式。
