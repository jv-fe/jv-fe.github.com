# 微信动态分享解决方案 #

3/10/2015 11:34:51 AM 

微信于2014年12月30日发布了《微信公众平台关于整顿诱导分享及诱导关注行为的公告》，微信平台开发者发现，原有的微信分享功能不能用了，在iphone手机上，显示为当前页的链接，之前设置的图标和标题等都没有了。虽然在部分android手机上还可以用，但最近微信升级后，分享功能也不正常了。正在苦于微信分享该怎么解决时，微信于2015年1月10日即时发布了开放JS-SDK，为微信网站的开发提供了强大的js功能。



## 解决方案一 ##

通过研究发现，当不调用接口分享的时候，微信会默认抓取**特定**的文案和图片，而我们可以通过修改这些**特定位置**的文案和图片，来达到**动态自定义分享**的结果

> 动态文案分享：

我们可以通过修改html中的<title\>标签的方式来实现

    <head>
		<title>我想要分享的自定义内容</title>
	</head>


> 动态图片分享：

可以利用微信默认页面抓取机制，测试中我们发现微信会优先抓取页面<body\>下面的**第一张图片(PNG和jpg都有可能)**，但是有个重要的条件是图片必须大于**350\*350 这个边界值**， 不然有可能抓到其他图片。

    <body>
		<div id="weixin_img" style="display:none;">
			<img id="weixin_share_jpg" src="http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_share_icon/logo.jpg" />
			<img id="weixin_share_png" src="http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_share_icon/logo.png" />
		</div>
		...
		...
	</body>

注意事项：

- 推荐图片尺寸为 400 * 400，长宽比为 1:1
- 建议jpg和png各放一张
- 动态分享用js修改<img\>的src即可


**目前，由于微信的API接口经常会变，动态分享推荐使用这种方法。**




## 解决方案二 ##




需要调用[http://res.wx.qq.com/open/js/jweixin-1.0.0.js](http://res.wx.qq.com/open/js/jweixin-1.0.0.js)

由于微信为了防止用户通过微信分享进行钓鱼、传销、非法传播不良信息等行为，在**6.1微信版本**对于自定义分享做出了诸多限制，必须是经过验证的公众号且每次都要获得公众号验证token。

> 具体操作方法：

PHP后端 获取令牌。在服务器端完成，代码如下：

    function wx_get_token() {
    $token = S('access_token');
    if (!$token) {
        $res = file_get_contents('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='            .'你的AppID'.'&secret='            .'你的AppSecret');
        $res = json_decode($res, true);
        $token = $res['access_token'];
        // 注意：这里需要将获取到的token缓存起来（或写到数据库中）
        // 不能频繁的访问https://api.weixin.qq.com/cgi-bin/token，每日有次数限制
        // 通过此接口返回的token的有效期目前为2小时。令牌失效后，JS-SDK也就不能用了。
        // 因此，这里将token值缓存1小时，比2小时小。缓存失效后，再从接口获取新的token，这样
        // 就可以避免token失效。
        // S()是ThinkPhp的缓存函数，如果使用的是不ThinkPhp框架，可以使用你的缓存函数，或使用数据库来保存。
        S('access_token', $token, 3600);
    }
    return $token;
	}

注意：返回的access_token长度至少要留够512字节。接口返回值：

    {"access_token":"ACCESS_TOKEN","expires_in":7200}
	{"access_token":"vdlThyTfyB0N5eMoi3n_aMFMKPuwkE0MgyGf_0h0fpzL8p_hsdUX8VGxz5oSXuq5dM69lxP9wBwN9Yzg-0kVHY33BykRC0YXZZZ-WdxEic4","expires_in":7200}

获取jsapi的ticket。jsapi\_ticket是公众号用于调用微信JS接口的临时票据。正常情况下，jsapi\_ticket的有效期为7200秒，通过access\_token来获取。


    function wx_get_jsapi_ticket(){
    $ticket = "";
    do{
        $ticket = S('wx_ticket');
        if (!empty($ticket)) {
            break;
        }
        $token = S('access_token');
        if (empty($token)){
            wx_get_token();
        }
        $token = S('access_token');
        if (empty($token)) {
            logErr("get access token error.");
            break;
        }
        $url2 = sprintf("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi",
            $token);
        $res = file_get_contents($url2);
        $res = json_decode($res, true);
        $ticket = $res['ticket'];
        // 注意：这里需要将获取到的ticket缓存起来（或写到数据库中）
        // ticket和token一样，不能频繁的访问接口来获取，在每次获取后，我们把它保存起来。
        S('wx_ticket', $ticket, 3600);
    }while(0);
    	return $ticket;
	}	

接口返回值：

    {"errcode":0,"errmsg":"ok","ticket":"sM4AOVdWfPE4DxkXGEs8VMKv7FMCPm-I98-klC6SO3Q3AwzxqljYWtzTCxIH9hDOXZCo9cgfHI6kwbe_YWtOQg","expires_in":7200}

添加JS代码:

    <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript">
	// 微信配置
	wx.config({
	    debug: false, 
	    appId: "你的AppID", 
	    timestamp: '上一步生成的时间戳', 
	    nonceStr: '上一步中的字符串', 
	    signature: '上一步生成的签名',
	    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
	});
	// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。
	wx.ready(function(){
	    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	    wx.onMenuShareTimeline({
	        title: '分享标题', // 分享标题
	        link:"分享的url,以http或https开头",
	        imgUrl: "分享图标的url,以http或https开头" // 分享图标
	    });
	    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
	    wx.onMenuShareAppMessage({
	        title: '分享标题', // 分享标题
	        desc: "分享描述", // 分享描述
	        link:"分享的url,以http或https开头",
	        imgUrl: "分享图标的url,以http或https开头", // 分享图标
	        type: 'link', // 分享类型,music、video或link，不填默认为link
	    });
	});
	</script>


> 目前认为的弊端：

- 微信页面需要**后端**配合，**跨域请求**微信接口获取签名
- 每次分享都需要进行验证

> 参考文档：

具体参考实例
[http://jingyan.baidu.com/article/d3b74d64c517051f77e609ed.html](http://jingyan.baidu.com/article/d3b74d64c517051f77e609ed.html "操作方案")

微信官方开发者文档 [http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html "微信官方开发者文档")