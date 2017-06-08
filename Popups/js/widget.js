define(['jquery'], function($) {

	var Widget = function() {
		this.popup = null;	
	};

	Widget.prototype = {
		constructor: Widget,
		
		//添加自定义监听事件
		on: function(type, handler) {
			if (typeof this.handlers[type] === 'undefined') {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		
		//触发自定义监听事件
		fire: function(type, data) {
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0; i < handlers.length; i++) {
					handlers[i](data);
				}
			}
		},
		
		//呈现弹窗
		render: function(container) {
			this.renderUI();			
			this.handlers = {};		
			this.bindUI();
			this.syncUI();
			(container || $('body')).append(this.popup);
		},
		
		//移除弹窗
		destroy: function() {
			this.destruct();
			this.popup.off();	
			this.popup.remove();					
		},
			
		renderUI: function() {},  //渲染DOM				
		bindUI: function() {},  //绑定事件		
		syncUI: function() {},   //同步样式		
		destruct: function() {}  //移除元素
	};

	return {
		Widget: Widget
	}
})