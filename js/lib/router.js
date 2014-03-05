define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    // console.log('router');
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'main',
			'main': 'main'
        }
    });
    // console.log('router_end');
    var appRouter = new AppRouter();
    return appRouter;
});
