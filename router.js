define([
    'use!underscore',
    'use!backbone',
    'require'
], function(Backbone, require) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            // homepage list
            '': 'homepage',
            '?*queryString': 'homepage'
        }

    });

    var appRouter = new AppRouter();

    return appRouter;
});

