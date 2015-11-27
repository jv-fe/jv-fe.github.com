//TODO 近大远小
;
(function($, window, undefined) {
	var defaultSetting = {
		speed: 1000,
		contentWidth: null,
		itemWidth: null,
		radialHeight: 200,
		customPosition: null,
		abtnPrev: null,
		abtnNext: null,
		itemClickAble: true,
		loadedCallback: function() {
			//console.log("default callback")
		},
		clickCallback: function() {

		}
	}

	function Gallery(root, setting) {
		var self = this;
		var $items = root.find("li");
		var contWidth = setting.contentWidth || root.width();
		var radialHeight = setting.radialHeight;
		var itemNum = $items.length;
		var itemWidth = setting.itemWidth || $items.eq(0).width();
		var originX = contWidth / 2;
		var xyz = [];
		//console.log($(this))
		$.extend(this, {
			init: function() {
				var self = this;
				if (setting.itemClickAble) {
					self.setClick();
				}
				if (setting.abtnNext) {
					$(setting.abtnNext).on("click", function() {
						self.itemMove(1);
						setting.clickCallback();
					})
				}
				if (setting.abtnPrev) {
					$(setting.abtnPrev).on("click", function() {
						self.itemMove(-1);
						setting.clickCallback();
					})
				}
				if (setting.customPosition) {
					//如果自定义了各项位置
					var positionData = setting.customPosition
					for (var i = 0; i < positionData.length; i++) {
						xyz[i] = positionData[i].width + "," + positionData[i].left + "," + positionData[i].top + "," + positionData[i].opacity + "," + positionData[i].zIndex + "," + positionData[i].order
					}
				} else {
					//没有自定义默认计算为椭圆轨迹
					if (itemNum % 2 == 0) {
						//如果是偶数项，把最后一项放在中间，透明度设为0，但奇数项处理
						itemNum = itemNum - 1;
						xyz[itemNum] = itemWidth + "," + (contWidth - itemWidth) / 2 + ",0,0.1,0,-3";
					}
					var positionX = self.getCenter(itemWidth, contWidth, itemNum);
					var elX = self.getElCenter(itemWidth, contWidth, itemNum);
					var resultY = [];
					for (var j = 0; j < elX.length; j++) {
						var elY = self.getY(originX - elX[j]);
						resultY.push(elY);
					}
					//组建坐标数组
					for (var k = 0; k < resultY.length; k++) {
						var middleNum = (itemNum - 1) / 2;
						var zIndex = k > middleNum ? (k - (2 * (k - middleNum))) : k;
						var opacity = (zIndex + 1) * (1 / (middleNum + 1));
						xyz[k] = itemWidth + "," + positionX[k] + "," + resultY[k] + "," + opacity + "," + zIndex + "," + (k - middleNum);
					}
				}

				//初始化每个元素的位置
				$items.each(function(index, element) {
					var data = xyz[index].split(",");
					var $img = $(this).find("img");
					$(this).css({
						"position": "absolute",
						"left": data[1] + "px",
						"top": data[2] + "px",
						"opacity": data[3],
						"z-index": data[4]
					}).attr("data-order", data[5]);
					$img.css({
						"width": data[0] + "px"
					})
				})
				setting.loadedCallback();
			},
			//获取元素在容器内的平均坐标值
			getCenter: function(itemWidth, contWidth, itemNum) {
				var avgWidth = 0;
				var result = [];
				avgWidth = (contWidth - itemWidth * itemNum) / (itemNum - 1);
				for (var i = 0; i < itemNum; i++) {
					result.push((itemWidth + avgWidth) * i)
				}
				return result;
			},
			//转化为以中心为原点，坐标系上的值
			getElCenter: function(itemWidth, contWidth, itemNum) {
				var avgWidth = 0;
				var result = [0];
				avgWidth = (contWidth - itemWidth * itemNum) / (itemNum - 1);
				for (var i = 1; i < itemNum - 1; i++) {
					result.push((itemWidth + avgWidth) * i + itemWidth / 2)
				}
				result.push(contWidth)
				return result;
			},
			//根据元素x坐标值，获得椭圆方程y坐标值
			getY: function(x, a, b) {
				x = Math.abs(x);
				var a = contWidth / 2;
				var b = radialHeight / 2;
				if (x > a) {
					x = a;
				}
				var result = Math.sqrt(Math.pow(b, 2) - (Math.pow(x, 2) * Math.pow(b, 2)) / Math.pow(a, 2));
				return result;
			},
			itemMove: function(moveStep) {
				if (moveStep == 0 || $items.is(":animated")) {
					return;
				}
				if (moveStep < 0) {
					//所有位置往后移位
					moveStep = Math.abs(moveStep)
					xyz = xyz.slice(moveStep).concat(xyz.slice(0, moveStep));
				} else {
					//所有位置往前移位
					moveStep = Math.abs(moveStep)
					xyz = xyz.slice(xyz.length - moveStep).concat(xyz.slice(0, (xyz.length - moveStep)));
				}
				$items.each(function(index, element) {
					var data = xyz[index].split(",");
					var $img = $(this).find("img");
					$(this).attr("data-order", data[5]).css("z-index", data[4]).animate({
						"left": data[1] + "px",
						"top": data[2] + "px",
						"opacity": data[3]
					}, setting.speed, function() {})
					$img.animate({
						"width": data[0] + "px"
					}, setting.speed)
				})
			},
			setClick: function() {
				var self = this;
				$items.on("click", function() {
					var clickIndex = $(this).attr("data-order");
					var centerIndex = 0;
					var dist = clickIndex - centerIndex;
					self.itemMove(dist)
				})
			}
		});
		self.init();
	}


	$.fn.gallery = function(custom) {
		setting = $.extend({}, defaultSetting, custom);
		return this.each(function() {
			el = new Gallery($(this), setting);
		})
	}

})(jQuery, window)