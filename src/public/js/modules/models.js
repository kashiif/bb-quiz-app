define( ["backbone"], function(Backbone) {
    var users = [
        new Backbone.Model({ userID : "zia", desc: "Zia is a Windows 8 App Store developer"}) ,
        new Backbone.Model({ userID : "zeeshan", desc: "Zeeshan is a businessman"})
    ];

    var Choice = Backbone.Model.extend({
        defaults: {
            text: ""
        }
    });

    var Question = Backbone.Model.extend({
        defaults: {
            text: "",
            type: "single",
            choices: new Backbone.Collection()
        }
    });

    var QuestionSet = Backbone.Collection.extend({ model: Question});

    var Quiz = Backbone.Model.extend({
        defaults: {
            name: "",
            desc: "",
            duration: "60",
            questions: new QuestionSet()
        },
        initialize: function(){
        }
    });

    var Exam = Backbone.Model.extend({
        });

    var QuizesSet = Backbone.Collection.extend({ model: Quiz});

    var allQuizes = [];

    // *********************************** CSS quiz ************************************************

    var questions = new QuestionSet();
    var choices = new Backbone.Collection();

    choices.push(new Choice({id:1, text:'Creative Style Sheets'}));
    choices.push(new Choice({id:2, text:'Computer Style Sheets'}));
    choices.push(new Choice({id:3, text:'Cascading Style Sheets'}));
    choices.push(new Choice({id:4, text:'Colorful Style Sheets'}));
    var q = new Question({id:1, text: "What does CSS stand for?", choices: choices});
    questions.push(q);

    choices = new Backbone.Collection();
    choices.push(new Choice({id:1, text:'<style src="mystyle.css" />'}));
    choices.push(new Choice({id:2, text:'<link rel="stylesheet" type="text/css" href="mystyle.css">'}));
    choices.push(new Choice({id:3, text:'<stylesheet>mystyle.css</stylesheet >'}));
    q = new Question({id:2, text: "What is the correct HTML for referring to an external style sheet?", choices: choices});
    questions.push(q);

    choices = new Backbone.Collection();
    choices.push(new Choice({id:1, text:'In the <body> section'}));
    choices.push(new Choice({id:2, text:'At the end of the document'}));
    choices.push(new Choice({id:3, text:'At the top of the document'}));
    choices.push(new Choice({id:4, text:'In the <head> section'}));
    q = new Question({id:3, text: "Where in an HTML document is the correct place to refer to an external style sheet?", choices: choices});
    questions.push(q);

    allQuizes.push(new Quiz({
            id:1,
            name: 'CSS',
            desc: 'Quiz about Cascading Style Sheet mainly CSS3',
            duration: 3,
            questions:questions
        }));

    //********************************* html quiz *********************************
    questions = new QuestionSet();

    choices = new Backbone.Collection();
    choices.push(new Choice({id:1, text:'Microsoft'}));
    choices.push(new Choice({id:2, text:'	The World Wide Web Consortium'}));
    choices.push(new Choice({id:3, text:'Mozilla'}));
    q = new Question({id:1, text: "Who is making the Web standards?", choices: choices});
    questions.push(q);


    choices = new Backbone.Collection();
    choices.push(new Choice({id:1, text:'<h6>'}));
    choices.push(new Choice({id:2, text:'<h1>'}));
    choices.push(new Choice({id:3, text:'<heading>'}));
    choices.push(new Choice({id:4, text:'<head>'}));
    q = new Question({id:2, text: "Choose the correct HTML tag for the largest heading?", choices: choices});
    questions.push(q);

    choices = new Backbone.Collection();
    choices.push(new Choice({id:1, text:'<b>'}));
    choices.push(new Choice({id:2, text:'	<bold>'}));
    q = new Question({id:3, text: "Choose the correct HTML tag to make a text bold?", choices: choices});
    questions.push(q);

    choices = new Backbone.Collection();
    choices.push(new Choice({id:1, text:'<lb />'}));
    choices.push(new Choice({id:2, text:'	<br/>'}));
    choices.push(new Choice({id:3, text:'<linebreak/>'}));
    q = new Question({id:4, text: "What is the correct HTML tag for inserting a line break?", choices: choices});
    questions.push(q);


    choices = new Backbone.Collection();
    choices.push(new Choice({id:1, text:'	<body background="yellow">'}));
    choices.push(new Choice({id:2, text:'		<background>yellow</background>'}));
    choices.push(new Choice({id:3, text:'	<body style="background-color:yellow">'}));
    q = new Question({id:5, text: "What is the preferred way for adding a background color in HTML?", choices: choices});
    questions.push(q);


    allQuizes.push(new Quiz({
            id:2,
            name: 'HTML',
            desc: 'With HTML you can create your own Websites',
            questions: questions
        }));


//***********javascript************************


    questions = new QuestionSet();

    choices = new Backbone.Collection();
    choices.push(new Choice({id:1, text:'<script>'}));
    choices.push(new Choice({id:2, text:'	</scripting>'}));
    choices.push(new Choice({id:3, text:'<javascript>'}));
    q = new Question({id:1, text: "Inside which HTML element do we put the JavaScript?", choices: choices});
    questions.push(q);


    choices = new Backbone.Collection();
    choices.push(new Choice({id:1, text:'Both the <head> section and the <body> section are correct'}));
    choices.push(new Choice({id:2, text:'The <head> section'}));
    choices.push(new Choice({id:3, text:'The <body> section'}));

    q = new Question({id:2, text: "Where is the correct place to insert a JavaScript?", choices: choices});
    questions.push(q);

    choices = new Backbone.Collection();
    choices.push(new Choice({id:1, text:'<script type="text/javascript" name="xxx.js">'}));
    choices.push(new Choice({id:2, text:'<script type="text/javascript" src="xxx.js">'}));
    q = new Question({id:3, text: "What is the correct syntax for referring to an external script called \"xxx.js\"?", choices: choices});
    questions.push(q);

    choices = new Backbone.Collection();
    choices.push(new Choice({id:1, text:'True'}));
    choices.push(new Choice({id:2, text:'False'}));
    q = new Question({id:4, text: "The external JavaScript file must contain the <script> tag?", choices: choices});
    questions.push(q);


    choices = new Backbone.Collection();
    choices.push(new Choice({id:1, text:'function=myFunction()'}));
    choices.push(new Choice({id:2, text:'function:myFunction()'}));
    choices.push(new Choice({id:3, text:'	function myFunction()'}));
    q = new Question({id:5, text: "How do you create a function?", choices: choices});
    questions.push(q);


    allQuizes.push(new Quiz({
        id:3,
        name: 'Javascript',
        desc: 'JavaScript is used in billions of Web pages to add functionality, validate forms, communicate with the server, and much more.',
        questions: questions
    }));


    var correctAnswers = new Backbone.Collection();
    correctAnswers.push(new Backbone.Model({
            quizId: 1,
            answers: { '1':[3], '2': [2], '3':[4] }
        }));
    correctAnswers.push(new Backbone.Model({
          quizId: 2,
          answers: { '1':[2], '2': [2], '3':[1], '4': [2], '5':[3] }
        }));
    correctAnswers.push(new Backbone.Model({
          quizId: 3,
          answers: { '1':[1], '2': [1], '3':[2], '4':[2], '5':[1, 3] }
        }));



    return {
            users: users,
            quizes: new QuizesSet(allQuizes),
            correctAnswers: correctAnswers,
            Exam: Exam
        }

    });



