/*
 * naxx.JS
 * 2014-7-25
 * control naxx minisite
 */
var platform = navigator.platform;
var ua = navigator.userAgent;
var ios = /iPhone|iPad|iPod/.test(platform) && ua.indexOf("AppleWebKit") > -1;
var andriod = ua.indexOf("Android") > -1;


var carRandom = [{
	"car": "http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_1.png",
	"name": "458 Italia",
	"dtl": "骚气十足的458<br>与您最配了！"
}, {
	"car": "http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_2.png",
	"name": "488 GTB",
	"dtl": "独一无二的488<br>才是您的命中所属！"
}, {
	"car": "http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_3.png",
	"name": "California T",
	"dtl": "文艺的你配<br>California才是王道！"
}, {
	"car": "http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_4.png",
	"name": "Enzo",
	"dtl": "人中吕布，车中Enzo<br>你懂得！"
}, {
	"car": "http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_5.png",
	"name": "F1",
	"dtl": "Duang~<br>您不当F1车手真可惜！"
}, {
	"car": "http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_6.png",
	"name": "FF",
	"dtl": "您的野性魅力<br>只有FF才能匹配！"
}, {
	"car": "http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_7.png",
	"name": "LaFerrari",
	"dtl": "新新人类自然<br>要配LaFerrari！"
}, {
	"car": "http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_8.png",
	"name": "F12berlinetta",
	"dtl": "土豪的您还是开<br>土豪的F12berlinetta吧！"
}, {
	"car": "http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_9.png",
	"name": "F430",
	"dtl": "F430旧是旧了点<br>您就凑合用吧！"
}, {
	"car": "http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/s7_block.png",
	"name": "pig",
	"dtl": "关注炉石中欧赛，Duang，我的法拉利变网易猪肉了，你呢？"
}];

var CnVsEu = {
	init: function() {
		this.setPage(); //初始化页面
		this.playVideo($("#s5_play"), $("#content"));
		FastClick.attach(document.body);
	},
	playVideo: function(tar, this_window) {
		tar.on('click', function() {
			var mp4 = $(this).attr('data-mp4');
			if (ios) {
				var playerHolder = '<video id="video" type="video/mp4" src="' + mp4 + '" width="100%" height="auto" controls autoplay preload="auto">您的浏览器不支持该视频！</video>'
				this_window.append(playerHolder);
				var video = $('#video'),
					h = window.innerHeight,
					scrollTop = $(window).scrollTop();
				video[0].play();
				video.css({
						'width': '100%',
						'height': h,
						'position': 'absolute',
						'top': scrollTop,
						'left': 0
					})
					//video[0].addEventListener('webkitbeginfullscreen', onVideoBeginsFullScreen, false);
					//../../images/touch/testvideo.mp4
				video[0].addEventListener('webkitendfullscreen', onVideoEndsFullScreen, false);

				function onVideoEndsFullScreen() {
					$('#video').remove();
				}
			} else {
				var playerHolder = [
					'<div id="playerHolder">',
					'<video id="video" src="' + mp4 + '" width="100%" height="auto" controls autoplay preload="auto">您的浏览器不支持该视频！</video>',
					'<a href="javascript:void(0);" class="video_close"></a>',
					'</div>'
				].join('');
				this_window.append(playerHolder);
				var videoWrapper = $('#playerHolder'),
					video = $('#video'),
					h = window.innerHeight,
					scrollTop = $(window).scrollTop();
				video[0].play();
				document.ontouchmove = function(e) {
					e.preventDefault();
				}
				videoWrapper.css({
					'width': '100%',
					'height': h,
					'position': 'absolute',
					'top': scrollTop,
					'left': 0
				})
				video.attr('height', h);
				$(window).on('resize', function() {
					h = window.innerHeight;
					scrollTop = $(window).scrollTop();
					videoWrapper.css({
						'width': '100%',
						'height': h,
						'position': 'absolute',
						'top': scrollTop,
						'left': 0
					})
					video.attr('height', h);
				})

				$('.video_close').on('click', function() {
					$('#playerHolder').remove();
					document.ontouchmove = function(e) {
						e.default();
					}
				})
			}
		})
	},
	//重力感应
	deviceMotion: function(range, callBack) {
		var x = y = z = last_x = last_y = last_z = 0;
		var move_num = 0;
		var lastTime = 0;
		var max = 0;
		var self = this;
		var speed = 0;
		var speed_switch = 1;
		var self = this;
		//var t=0;
		function deviceMotionHandler(eventData) {
			//console.log(1)
			var m = eventData.accelerationIncludingGravity;
			var currentTime = new Date().getTime();
			if ((currentTime - lastTime) > 100) {
				var diffTime = currentTime - lastTime;
				lastTime = currentTime;
				x = m.x;
				y = m.y;
				z = m.z;
				speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
				last_x = x;
				last_y = y;
				last_z = z;
				if (speed > range && speed_switch == 1) {
					speed_switch = 0;
					var ran = Math.random() * 10;
					callBack();
					$(window).off('devicemotion', deviceMotionHandler, false);
				}
			}
		}
		if (window.DeviceMotionEvent) {
			$(window).on('devicemotion', deviceMotionHandler, false);
			//console.log(2)
		} else {
			setTimeout(function() {
				//var ran = Math.random()*10;
				callBack(); //不支持摇一摇，直接执行下一帧
				//alert(a++);
				return false;
			}, 2000)
		};
	},
	//摇一摇结果初始化
	getCarResult: function() {
		var self = this;
		var ranNum = parseInt(Math.random() * 10);
		var resultCar = carRandom[ranNum];
		var share_imgUrl = "http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_share_icon/car_share_" + (ranNum + 1) + ".jpg";
		var share_imgUrl_png = "http://hearthstone.nos.netease.com/3/touch/cn-vs-eu/car_share_icon/car_share_" + (ranNum + 1) + ".png";
		var share_dtl = "";
		if (resultCar.name == "pig") {
			$("#result").addClass("pig_bg").removeClass("car_bg");
			$(".result_car_no").text("");
			$(".result_title").html("");
			$("#car_img_url").attr("src", resultCar.car);
			share_dtl = resultCar.dtl;
		} else {
			$(".result_car_no").text("[" + resultCar.name + "]");
			$(".result_title").html(resultCar.dtl);
			$("#car_img_url").attr("src", resultCar.car);
			share_dtl = "关注炉石中欧赛，适合我的法拉利是" + resultCar.name + "，测测你的吧！"
		}
		return {
			"dtl": share_dtl,
			"imgUrl": share_imgUrl,
			"imgUrl_png": share_imgUrl_png
		}
	},
	setPage: function() {
		var self = this;
		var json = self.getCarResult();
		$("#btn_share").click(function() {
			$(".share_guide").removeClass("dn");
		})
		$(".share_guide").click(function() {
				$(this).addClass("dn");
			})
			//微信分享
		self.weixinShare(json)
	},
	weixinShare: function(json) {
		var self = this;
		var yaoyiyao_switch = 1;
		var aaa = new JV.phoneSlide($("#content"), {
			effect:"ScreenTouch",
			//scale:"y",
			callBack: function(index) { //滚屏组件
				if (index == 6 && yaoyiyao_switch == 1) {
					yaoyiyao_switch = 0;
					$("title").html(json.dtl);
					$("#weixin_share_jpg").attr("src", json.imgUrl);
					$("#weixin_share_png").attr("src", json.imgUrl_png);
					self.deviceMotion(1000, function() {
						$("#yaoyiyao").addClass("dn");
						$("#result").removeClass("dn");
					});
				}
			}
		});

		// 微信分享的数据
		window.shareData = {
			"appId": "",
			"imgUrl": json.imgUrl,
			"img_url": json.imgUrl,
			"link": "http://" + window.location.host + window.location.pathname,
			"desc": json.dtl,
			"title": ""
		};
		/*document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			// 发送给好友
			WeixinJSBridge.on('menu:share:appmessage', function(argv) {
				WeixinJSBridge.invoke('sendAppMessage', shareData, function(res) {
					_report('send_msg', res.err_msg);
				})
			});
			// 分享到朋友圈
			WeixinJSBridge.on('menu:share:timeline', function(argv) {
				WeixinJSBridge.invoke('shareTimeline', shareData, function(res) {
					_report('timeline', res.err_msg);
				});
			});

		}, false)*/
	}
}