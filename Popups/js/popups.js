define(['jquery', 'jqueryUI', 'widget'], function($, $UI, widget) {
	
	var Window = function() {
		this.cfg = {
			//通用参数
			width: 400,
			height: 250,	
			title: 'midodo',
			content: 'midodo is a cute girl',
			hasCloseBtn: true,
			hasMask: true,
			draggable: true,
			dragHandle: '.window-header',
			skin: null,
			//alert参数
			alertBtnTxt: 'OK',
			alertBtnHandler: null,
			//confirm参数
			confirmBtnTxt: 'OK',
			cancelBtnTxt: 'Cancel',
			confirmBtnHandler: null,
			cancelBtnHandler: null,
			//prompt参数
			promptBtnTxt: 'OK',
			promptIsPwd: false,
			promptMaxLength: 20,
			promptDefaultValue: '',
			promptBtnHandler: null			
		};	
	}
	

	Window.prototype = $.extend({}, new widget.Widget(), {
		constructor: Window,

		renderUI: function(container) {
			var CFG = this.cfg;
			var footContent = '';
			this.popup = $('<div class="window-wrapper" id="window-wrapper"></div>');		
			
			//是否添加遮罩层
			if (CFG.hasMask) {
				$('<div class="window-mask"></div>').appendTo(this.popup);
			}	
			
			//根据窗口类型添加相应元素
			switch(CFG.type) {
				case 'alert': 
					footContent = '<div class="window-alert-btn window-footer-btn">' + CFG.alertBtnTxt + '</div>';
					break;
				case 'confirm':
					footContent = '<div class="window-confirm-btn window-footer-btn">' + CFG.confirmBtnTxt + '</div>' +
					'<div class="window-cancel-btn window-footer-btn">' + CFG.cancelBtnTxt + '</div>';
					break;
				case 'prompt':
					var inputType =  CFG.promptIsPwd ? "password" : "text";
					CFG.content +=
						'<div class="prompt-input-box">' +
							'<input class="prompt-input" type="' + inputType + 
								'" value="' + CFG.promptDefaultValue + 
								'" maxlength="' + CFG.promptMaxLength + '">' +
						'</div>'
					footContent = '<div class="window-prompt-btn window-footer-btn">' + CFG.promptBtnTxt + '</div>' +
					'<div class="window-cancel-btn window-footer-btn">' + CFG.cancelBtnTxt + '</div>';
					break;
			}
			
			//添加主体内容
			$('<div class="window-box">' + 
				'<div class="window-header">' + CFG.title + '</div>' + 
				'<div class="window-content">' + CFG.content + '</div>' +
				'<div class="window-footer">' + footContent + '</div>' + 
			'</div>').appendTo(this.popup);
			
			//是否添加关闭按钮			
			if (CFG.hasCloseBtn) {
				$('<div class="window-close-btn"></div>').appendTo(this.popup.find('.window-box'))
			}

			//为回调函数提供value值数据
			this.promptInput = this.popup.find('.prompt-input'); 
		},

		syncUI: function() {
			var CFG = this.cfg;	

			//设置容器宽高与位置		
			var $box = this.popup.find('.window-box').css({
				width: CFG.width + 'px',
				height: CFG.height + 'px',
				//如果传入x、y，则按传入参数定位，否则按水平垂直居中定位
				left: CFG.x || ($('body').width() - CFG.width)/2 + 'px',
				top: CFG.y || ($('body').height() - CFG.height)/2 + 'px'					
			});
			
			//是否添加皮肤，为父元素添加class，通过层叠设置子元素样式
			if (CFG.skin) {
				$box.addClass(CFG.skin);
			}
			
			//设置拖动
			if (CFG.draggable) {
				$box.draggable({
					containment: '#window-wrapper', //限制拖动区域
					handle: CFG.dragHandle, //设置拖动把柄
					cursor: 'pointer'					
				}).css('position', 'absolute'); //设置draggable后position属性会自动变为relative，这里需要修正
			} 
		},

		bindUI: function() {
			var that = this;

			//通过事件委托的方式为各按钮添加事件函数：触发自定义监听事件，移除弹窗
			this.popup.on('click', '.window-close-btn', function() {
				that.fire('close');
				that.destroy();
			}).on('click', '.window-alert-btn', function() {
				that.fire('alert');
				that.destroy();				
			}).on('click', '.window-confirm-btn', function() {
				that.fire('confirm');
				that.destroy();		
			}).on('click', '.window-cancel-btn', function() {
				that.fire('cancel');
				that.destroy();		
			}).on('click', '.window-prompt-btn', function() {
				that.fire('prompt', that.promptInput.val());
				that.destroy();		
			});
			
			//将回调函数添加至自定义监听事件队列
			if (this.cfg.alertBtnHandler) {
				this.on('alert', this.cfg.alertBtnHandler);
			}
			if (this.cfg.confirmBtnHandler) {
				this.on('confirm', this.cfg.confirmBtnHandler);
			}
			if (this.cfg.cancelBtnHandler) {
				this.on('cancel', this.cfg.cancelBtnHandler);
			}
			if (this.cfg.promptBtnHandler) {
				this.on('prompt', this.cfg.promptBtnHandler);
			}
		},
		
		//定义alert方法
		alert: function(cfg) {
			$.extend(this.cfg, cfg, {type: 'alert'});
			this.render();
			return this;				
		},
		
		//定义confirm方法
		confirm: function(cfg) {
			$.extend(this.cfg, cfg, {type: 'confirm'});
			this.render();
			return this;				
		},

		//定义prompt方法
		prompt: function(cfg) {
			$.extend(this.cfg, cfg, {type: 'prompt'});
			this.render();
			this.promptInput.focus();
			return this;				
		}			
	});

	return {
		Window: Window
	}
})