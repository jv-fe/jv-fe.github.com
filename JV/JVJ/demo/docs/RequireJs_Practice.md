# RequireJs Practice

## AMD
AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
![AMD][amdImg]  

## RequireJs
RequireJS是一款遵循AMD规范协议的JavaScript模块加载器，是AMD的一个实现。

## RequireJs 的好处
* 实现js文件的异步加载，避免网页失去响应，提高性能；
* 管理模块之间的依赖性，便于代码的编写和维护。
* 实现了代码的模块化，便于复用。

## RequireJs 引用方式
```javascript
//页面有依赖的多个js引用，最好用下面的方式。
<script src="/js/lib/require.js"></script>
<script type="text/javascript">
	require(['/js/config'],function(){
        require(['article'],function(News){
        	News.init();
        });
    })
</script>

//data-main适用于只有一个js入口文件的情况。因为data-main设置的脚本是异步加载的，所以不能保证在加载news.js前，config.js配置文件已经加载好，这样会导致引用路径报错。http://www.requirejs.org/docs/api.html#data-main
<script src="/js/lib/require.js" data-main="/js/config"></script>
    <script type="text/javascript">
      require(['article'],function(News){
        News.init();
        });
</script>
```

## RequireJs 配置函数
```javascript
requirejs.config({
	//可增加时间戳防止浏览器缓存
    //urlArgs: "d=" + (new Date()).getTime(),
    //防止读取超时报错：http://requirejs.org/docs/api.html#config-waitSeconds
    waitSeconds: 0,
    //设置加载模块的根路径
	baseUrl: '/js',
    //映射那些不直接放置于baseUrl下的模块名
	paths: {
		'jquery': 'lib/jquery-1.7.2.min',
		'jquery.namespace': 'lib/jquery.namespace',
		'jquery.scrollTo': 'lib/jquery.scrollTo',
		'jquery.imageScroll': 'lib/jquery.imageScroll',
		'jquery.slider': 'lib/jquery.slider',
		'jquery.lightBox': 'lib/jquery.lightBox',
		'Login': 'lib/login',
		'battle_nav': 'lib/battle_nav',
		'juicer': 'lib/juicer',
	},
    //加载非规范的模块：为那些没有使用define()来声明依赖关系的脚本做依赖和导出配置。jQuery插件可以简写成下面形式。
	shim: {
		'jquery.namespace': ['jquery'],
		'jquery.scrollTo': ['jquery'],
		'jquery.imageScroll': ['jquery'],
		'jquery.lightBox': ['jquery'],
		'jquery.slider': ['jquery']
	}
});
```

## RequireJS 定义模块
在RequireJS中，通过向全局变量注册define函数来声明一个模块。在定义模块时，我们要遵循一下的规范：
* 一个JavaScrip文件即为一个模块，即一个JavaScrip文件只能定义一个define函数。
* RequireJS最佳实践推荐，定义模块时不要指定模块标识。这样方便后期压缩。
* RequireJS最佳实践推荐推行尽量将代码封装到define函数里面。尽量不要使用shim配置项。
```javascript
//common.js，引用了数组里的模块，同时定义了common.js模块。
define([
		'jquery',
		'Login',
		'battle_nav',
		'juicer',
		'jquery.easing',
		'jquery.namespace',
		'jquery.scrollTo',
		'jquery.imageScroll',
		'jquery.lightBox'
	],
	function($, Login) {
		var Common = {
			project: "gsports",
			init: function() {
				this.gotop();
				//...
			},
			gotop: function(v) {
				$(window).scroll(function() {
					var st = $(window).scrollTop(),
						gotop = $("#gotop");
					if (!v) {
						v = 200;
					}
					if (st > v) {
						gotop.show();
					} else {
						gotop.hide();
					}
				})
				$.JV.scrollTo({
					trigger: "#gotop"
				});
			}
            //...
		}
        return Common;
	})
```
```javascript
//article.js，引用了common模块，同时定义了article模块。
define(['common'], function(Common) {
	var Article = {
		init: function() {
			Common.init();
			this.setMainContent();
		},
		setMainContent: function() {
        	//...
		}
	}
	return Article;
})
```

## RequireJS 部署合并
http://www.requirejs.org/docs/optimization.html
```javascript
//本地编译的配置（测试环境和线上需要修改对应的路径）
  grunt.initConfig({
    clean: {
      release: 'www-release'
    },
    //编译配置可参考：http://segmentfault.com/a/1190000002403806
    requirejs: {
      compile: {
        options: {
          appDir: './',
          baseUrl: 'js/',
          mainConfigFile: 'js/config.js',
          //跳过非配置的文件，可增加编译速度。
          skipDirOptimize: true,
          //编译输出的目录
          dir: 'www-release',
          //配置
          modules: [
            {
              //把config.js和common.js以及里面依赖的js全部压缩合并，编译输出成config.js
              name: 'config',
              include: [
                'common'
              ]
            }
          ]
        }
      }
    },
    //把编译输出的config.js覆盖到原config.js
    copy: {
      main: {
        src: 'www-release/js/config.js',
        dest: 'js/config.js'
      },
    }
  });
```

## 注意要点



## Reference
1. [前端模块化开发的价值](https://github.com/seajs/seajs/issues/547)
2. [AMD规范文档](https://github.com/amdjs/amdjs-api/wiki/AMD)
3. [RequireJS入门指导](http://undefinedblog.com/primer-for-require-js/)
4. [RequireJS进阶:模块的优化及配置的详解](http://segmentfault.com/a/1190000002403806)




[amdImg]:http://7xkuvv.com1.z0.glb.clouddn.com/AMD.png