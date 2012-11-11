var QuizApp = {};

require(["jquery", "backbone", "models"], function ($, Backbone, models) {

    $(function () {
        var views = require("views");

        Backbone.history.start({pushState: true});

        require(['routes'],function(routes){
            var router = routes.pageRouter;
        });

    });
});
