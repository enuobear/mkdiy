requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		app: '../app'
	}
});

requirejs(['app/show', 'app/show2'], function(show, show2){
	alert(show.a);
	alert(show2.a)
});
