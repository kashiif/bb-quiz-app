/**
 * Created with JetBrains WebStorm.
 * User: zia2
 * Date: 10/18/12
 * Time: 10:11 PM
 * To change this template use File | Settings | File Templates.
 */

//http://ricostacruz.com/backbone-patterns/
//http://backbonetutorials.com/

var users = [
    new Backbone.Model({ userID : "zia", desc: "He is an enterprenuer"}) ,
    new Backbone.Model({ userID : "zeeshan", desc: "He is a businessman"})
];

var UserView = Backbone.View.extend({
    tagName: "div",
    render: function(){
        //alert("AAAa");
        this.$el.html(this.model.get("desc"));
        return this;
    }
});

var NextPageView = Backbone.View.extend({
    events: {
        'click': 'nextPage'
    },

    render: function(){
        //alert("AAAa");

        return this;
    },

    nextPage: function(){
        router.navigate('view', {trigger: true});
    }
});

var np = new NextPageView({el: $("#btn1")});


//http://backbonetutorials.com/what-is-a-router/
var PageRouter = Backbone.Router.extend({
    routes: {
        'view': "viewUser",
        "*actions": "defaultRoute" // Backbone will try match the route above first
    },

    viewUser: function(userID){
        //alert("View");
       var selectedUser = _(users).find(function(user){
            return user.get('userID') === 'zia';
        });

        $('body').empty().append(new UserView({model: selectedUser}).render().el);
    },

    defaultRoute: function(actions){
       //alert("ZZZ: " + actions);
    }
});

var router = new PageRouter();

/*
router.on('route:view', function (userID) {
    // Note the variable in the route definition being passed in here
    alert( "Get View " + userID );
});
router.on('route:defaultRoute', function (actions) {
    alert("Default: " +  actions );
}); */


Backbone.history.start({pushState: true});
//Backbone.history.start();




/*
var PageRouter = Backbone.Router.extend({
    routes: {
        'contents': 'contents',
        'view/:title': 'viewDocument'
    },

    contents: function () {
        $('body').html(new ContentsView({collection: documents}).render().el);
    },

    viewDocument: function (title) {
        var selectedDocument = _(documents).find(function (document) {
            return document.get('title') === title;
        });

        $('body').empty().append(new DocumentView({model: selectedDocument}).render().el);
    }
});

var router = new PageRouter();
Backbone.history.start({pushState: true});   */
//http://documentcloud.github.com/backbone/#History-start