define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){
	var Todo = function(){
		// var testModel = new Backbone.Model({
		// 	name: "<script>alert('asd')</script>",
		// 	url: "url-test"
		// });

		// //model.cid
		// console.log("model.cid: "+testModel.cid);		

		// //model.attributes
		// console.log("model.attributes: "+testModel.attributes);




		// console.log('model.escape(attribute): '+testModel.escape('name'));

		// $("#app_view").html(testModel.escape('name'));
		// if(testModel.has('name')){
		// 	console.log('ok');

		// 	testModel.set({
		// 		name: "name-test"
		// 	});
		// 	console.log('model.changed: '+testModel.changed+' json_changed_show: '+JSON.stringify(testModel.changed));

		// 	testModel.unset('name');



		// 	if(!testModel.has('name')){
		// 		console.log('model.unset(attribute, [options])');
		// 	}

		// 	testModel.clear();
		// 	if(!testModel.has('url')){
		// 		console.log('model.clear([options])');
		// 	}
			
		// }else{
		// 	console.log('no');
		// }
		
		//model.defaults
		// var Meal = Backbone.Model.extend({
		// 	defaults:{
		// 		'appetizer': 'casear salad',
		// 		'entree': 'ravioli',
		// 		'dessert': 'cheesecake',
		// 		'name': 'lucy'	
		// 	}
		// });
		// var cMeal = new Meal();
		// console.log("Dessert will be " + (new Meal).get('dessert'));
		// console.log(cMeal.get('name'));


		//model.toJSON([option])
		//var artist = new Backbone.Model({
		//	firstName: "Wassily",
		//	lastName: "Kandinsky"
		//});
		//artist.set({birthday: "December 16, 1866"});
		//console.log(JSON.stringify(artist));
		//var aToJSON = JSON.stringify(artist);
		//console.log(typeof(aToJSON));
		//console.log(artist.toJSON());
		//var bToJSON = artist.toJSON();
		//console.log(typeof(bToJSON));



		//model.save([attributes], [options])
		Backbone.sync = function(method, model) {
			console.log(method + ": " + JSON.stringify(model));
			model.id = 1;
		};

		var book = new Backbone.Model({
			title: "The Rough Riders",
			author: "Theodore Roosevelt"
		});

		book.save();

		book.save({author: "Teddy"});



	};

	return Todo;
});
