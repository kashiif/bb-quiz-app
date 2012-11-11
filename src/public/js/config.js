// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "js/libs",
    md: "js/modules",

    // Libraries.
    underscore: "libs/underscore",
    backbone: "libs/backbone",

    // modules
    quizapp: "modules/quizapp",
    alpha: "modules/jquery.alpha",
    beta: "modules/jquery.beta",
    routes: "modules/routes",
    models: "modules/models",
    views: "modules/views"
  },

  shim: {
    // Backbone library depends on underscore and jQuery.
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },

    main: {
        deps: ["jquery","underscore", "backbone", "alpha", "beta", "routes", "models", "views"],
        exports: "Main"
    },

   routes: {
       deps: ["jquery","underscore", "backbone", "quizapp", "views"]
   },

  views: {
      deps: ["jquery","underscore", "quizapp", "backbone"]
  },

  models: {
      deps: ["jquery","underscore", "backbone"]
  }

    // Backbone.LayoutManager depends on Backbone.
    //"plugins/backbone.layoutmanager": ["backbone"]
  }

});
