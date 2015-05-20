var Conference = {
	init: function() {
		this.setGallery();
	},
	setGallery: function() {
		$(".m-gallery").gallery3d({
			itemWidth: 296,
			itemPadding: 150,
			//speed: 2000,
			//opacityArr: [1, 0.7, 0.2, 0.1, 0.2, 0.7],
			abtnPrev: '.abtn-prev',
			abtnNext: '.abtn-next',
			perspective: 1700,
			loadedCallback: function() {
				$(".m-gallery").css("opacity", "1");
			},
			flatConfig: {
				contentWidth: 1000,
				itemWidth: 296,
				radialHeight: 100,
				speed: 500,
				abtnPrev: '.abtn-prev',
				abtnNext: '.abtn-next',
				itemClickAble: true,
				loadedCallback: function() {
					$(".m-gallery").css("opacity", "1");
				},
				customPosition: [{
					width: 280,
					left: 360,
					top: 40,
					opacity: 1,
					zIndex: 3,
					order: 0
				}, {
					width: 200,
					left: 700,
					top: 100,
					opacity: 0.7,
					zIndex: 2,
					order: 1
				}, {
					width: 160,
					left: 670,
					top: 115,
					opacity: 0.2,
					zIndex: 1,
					order: 2
				}, {
					width: 100,
					left: 450,
					top: 150,
					opacity: 0.1,
					zIndex: 0,
					order: -3
				}, {
					width: 160,
					left: 170,
					top: 115,
					opacity: 0.2,
					zIndex: 1,
					order: -2
				}, {
					width: 200,
					left: 100,
					top: 100,
					opacity: 0.7,
					zIndex: 2,
					order: -1
				}]
			}
		});
	}
}