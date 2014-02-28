define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){
	var Todo = function(){
		var Book = Backbone.Model.extend({
			default: {
				name: ''
			}
		});
	
		var Booklist = Backbone.Collection.extend({
			model: Book
		});
	
		var models = [{
			name: 'one'
		},{
			name: 'two'
		},{
			name: 'three'
		}];
		
		var books = new Booklist(models);

		var a = JSON.stringify(books);
		var b = JSON.parse(a);
		
		//转化为JSON类型字符串
		console.log(a);

		//将JSON字符串转成JS对象
		console.log(b[0].name);
	};
	return Todo;
});
