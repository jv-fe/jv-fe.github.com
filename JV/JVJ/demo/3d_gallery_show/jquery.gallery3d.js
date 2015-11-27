/*!
 * Base On jQuery JavaScript Library v1.7.2
 * http://jquery.com/
 * Copyright 2015, Yikfun Wu
 * http://jquery.org/license
 *
 * Versions 1.0
 * Date: 2015.05.20
 */

//require jquery.gallery to support IE broswer,show flat view.
//todo: improve function addTransformStyle
;
(function($, window, undefined) {
	var defaultSetting = {
		//切换速度
		speed: 1000,
		//容器宽度
		contentWidth: null,
		//视点距离
		perspective: 1500,
		//每一项的宽度
		itemWidth: null,
		//每一项的间距
		itemPadding: 100,
		//上一张按钮
		abtnPrev: null,
		//下一张按钮
		abtnNext: null,
		//自定义透明度数组
		opacityArr: null,
		//每一项是否可点
		itemClickAble: true,
		//平面版的配置
		configFlat: null,
		//加载完执行callback
		loadedCallback: function() {
			//console.log("default callback")
		},
		//点击执行callback
		clickCallback: function() {

		}
	}

	function Gallery3d(root, setting) {
		var self = this;
		var $itemUl = root.find("ul");
		var $items = root.find("li");
		var contWidth = setting.contentWidth || root.width();
		var itemWidth = setting.itemWidth || $items.eq(0).find("img").width();
		var itemLength = $items.length;
		var halfItemLength = Math.floor(itemLength / 2);
		var avgAngle = 360 / itemLength;
		var opacityArr = setting.opacityArr || setDefaultOpacity();
		var orderArr = setOrder();
		var rotateAngle = 0;

		$.extend(this, {
			init: function() {
				var self = this;
				var supportPreserve3d = self.preserve3dDetect();
				//如果支持transform-style:preserve-3d,则用3D效果展示
				if (supportPreserve3d) {
					var translateZ = (itemWidth / 2) / Math.tan((avgAngle / 2) / 180 * Math.PI);
					//console.log(setting.itemPadding)
					translateZ = translateZ + setting.itemPadding;

					root.css({
						"perspective": setting.perspective
					})

					$itemUl.css({
						"position": "absolute",
						"transform-style": "preserve-3d",
						"transition": "transform " + setting.speed / 1000 + "s",
						"width": itemWidth,
						"transform": "translateZ(-" + translateZ + "px)",
						"left": '50%',
						"top": '0px',
						"margin-left": -itemWidth / 2
					});

					$items.each(function(index) {
						$(this).css({
							"position": "absolute",
							"top": "0",
							"opacity": opacityArr[index],
							"transform": "rotateY(" + index * avgAngle + "deg) translateZ(" + (translateZ) + "px)"
						}).attr("data-order", orderArr[index])
					})
					setting.loadedCallback();
					//设置左右切换按钮点击
					if (setting.abtnPrev && setting.abtnNext) {
						self.setBtnClick()
					}
					//设置图片项是否可点
					if (setting.itemClickAble) {
						self.setItemClick()
					}
					//不支持transform-style:preserve-3d,则用传统画廊展示
				} else {
					$itemUl.gallery(setting.flatConfig)
				}
			},
			preserve3dDetect: function() {
				//IE6-8不支持window.getComputedStyle(),更不支持transform-style:perserve3d
				//https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
				if (!window.getComputedStyle) {
					return false;
				}
				var computedVaule;
				var element = document.createElement('p');
				var propertys = {
					'webkitTransformStyle': '-webkit-transform-style',
					'MozTransformStyle': '-moz-transform-style',
					'msTransformStyle': '-ms-transform-style',
					'transformStyle': 'transform-style'
				};
				document.body.insertBefore(element, null);
				for (var i in propertys) {
					if (element.style[i] !== undefined) {
						element.style[i] = "preserve-3d";
						computedVaule = window.getComputedStyle(element).getPropertyValue(propertys[i]);
					}
				}
				document.body.removeChild(element);
				if (computedVaule !== 'preserve-3d') {
					return false;
				} else {
					return true;
				}
			},
			setItemClick: function() {
				var self = this;
				$items.on("click", function() {
					var dist = $(this).attr("data-order");
					self.itemMove(dist);
				})
			},
			setBtnClick: function() {
				var self = this;
				$(setting.abtnPrev).on("click", function() {
					self.itemMove(-1);
				})
				$(setting.abtnNext).on("click", function() {
					self.itemMove(1);
				})
			},
			itemMove: function(moveStep) {
				var self = this;
				var rotateValue = self.getRotateValue($itemUl);
				if (moveStep == 0 || $items.is(":animated")) {
					return;
				}
				//旋转
				self.addTransformStyle($itemUl, "transform", "rotateY(" + (rotateValue - moveStep * avgAngle) + "deg)");
				if (moveStep < 0) {
					//往右转
					moveStep = Math.abs(moveStep)
					orderArr = orderArr.slice(moveStep).concat(orderArr.slice(0, moveStep));
					opacityArr = opacityArr.slice(moveStep).concat(opacityArr.slice(0, moveStep));
				} else {
					//往左转
					moveStep = Math.abs(moveStep)
					orderArr = orderArr.slice(orderArr.length - moveStep).concat(orderArr.slice(0, (orderArr.length - moveStep)));
					opacityArr = opacityArr.slice(opacityArr.length - moveStep).concat(opacityArr.slice(0, (opacityArr.length - moveStep)));
				}
				//改变每项透明度
				$items.each(function(index) {
					$(this).attr("data-order", orderArr[index]).animate({
						"opacity": opacityArr[index]
					}, setting.speed)
				})
				setting.clickCallback();
			},
			getRotateValue: function($dom) {
				var domStyle = $dom.attr("style");
				if (domStyle.indexOf("rotate") == -1) {
					return 0;
				} else {
					var rotateVaule = domStyle.match(/rotate\w?\((-?\d+)deg\)/)[1];
					return Number(rotateVaule);
				}
			},
			addTransformStyle: function($dom, propertyName, propertyVaule) {
				//beta phase
				var domStyle = $dom.attr("style");
				var refineProperty = propertyVaule.match(/[^(]*/)[0];
				var result = "";
				//如果已经有property值了，则在原基础上修改
				if (domStyle.indexOf(refineProperty) > -1) {
					//console.log(refineProperty);
					result = domStyle.replace(/rotateY[^)]*\)/, propertyVaule);
					$dom.attr("style", result);
					return false;
				}
				//如果style上已经有transform属性，则在原基础上添加
				if (domStyle.indexOf("transform") > -1) {
					result = domStyle.replace(/(transform:[^;]*)/, ("$1 " + propertyVaule))
					$dom.attr("style", result);
				}
				//console.log(domStyle,propertyName,propertyVaule);
			}
		});
		//计算默认透明度数组
		function setDefaultOpacity() {
				var opacityArr = [1];
				var halfLeft = [];
				var halfRight = [];
				var result = [];

				for (var i = 1; i < halfItemLength; i++) {
					var step = 1 / halfItemLength;
					halfLeft.push(step * i);
					halfRight.push(step * (halfItemLength - i));
				}
				//奇数项
				if (itemLength % 2 != 0) {
					result = [1].concat(halfRight, [0.1], [0.1], halfLeft);
				} else {
					result = [1].concat(halfRight, [0.1], halfLeft);
				}
				return result;
			}
			//计算每项顺序
		function setOrder() {
			var result = [];
			for (var i = 0; i < itemLength; i++) {
				result.push(i);
			}
			//奇数项
			for (var j = 0; j < result.length; j++) {
				if (result[j] > halfItemLength) {
					result[j] = result[j] - itemLength;
				}
			}
			//console.log(result)
			return result;
		}
		self.init();
	}


	$.fn.gallery3d = function(custom) {
		setting = $.extend({}, defaultSetting, custom);
		return this.each(function() {
			el = new Gallery3d($(this), setting);
		})
	}

})(jQuery, window)