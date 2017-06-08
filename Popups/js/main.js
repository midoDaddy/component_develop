require.config({
	paths: {
		'jquery': 'jquery-1.11.3',
		'jqueryUI': 'jquery-ui.min'
	}	
});
require(['jquery', 'popups'], function($, pop) {

	$('#alert-btn').on('click', function() {
		var popup = new pop.Window();
		popup.alert({
			width: 400,
			height: 250,
			y: 200,	
			title: 'Midodo-alert',
			content: 'Midodo is a cute girl',
			alertBtnTxt: 'Yes!',
			alertBtnHandler: function() {
				console.log('this is midodo alert handler');
			}
		})
		.on('alert', function() {
			console.log('midodo-alert');
		})
		.on('close', function() {
			console.log('midodo-close');
		});		
	});

	$('#confirm-btn').on('click', function() {
		var popup = new pop.Window();
		popup.confirm({
			width: 400,
			height: 250,
			y: 200,	
			title: 'Midodo-confirm',
			content: 'midodo is a smart girl',
			confirmBtnTxt: 'Absolutely!',
			confirmBtnHandler: function() {
				console.log('this is midodo confirm handler');
			}
		})
		.on('confirm', function() {
			console.log('midodo-confirm');
		})
		.on('cancel', function() {
			console.log('midodo-cancel');
		})
		.on('close', function() {
			console.log('midodo-close');
		})
	});

	$('#prompt-btn').on('click', function() {
		var popup = new pop.Window();
		popup.prompt({
			width: 400,
			height: 300,
			y: 200,	
			title: 'Midodo-prompt',
			content: 'How old is Midodo?',
			promptBtnHandler: function(data) {
				console.log('midodo is ' + data + ' years old');
			}
		})
		.on('prompt', function(data) {
			console.log(data);
		})
		.on('cancel', function() {
			console.log('midodo-cancel');
		})
		.on('close', function() {
			console.log('midodo-close');
		})
	});

})