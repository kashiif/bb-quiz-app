/**
 * Created with JetBrains WebStorm.
 * User: zia2
 * Date: 11/2/12
 * Time: 4:40 PM
 * To change this template use File | Settings | File Templates.
 */

define( ["jquery", "backbone", "quizapp", "models"], function($, Backbone, QuizApp, models) {

    var $contents = $('.contents');

    var views = require("views");

    var QuizListView = views.QuizListView,
        QuizView = views.QuizView,
        ExamView = views.ExamView,
        QuestionView = views.QuestionView,
        AnswerSummaryView = views.AnswerSummaryView,
        ResultView= views.ResultView;

    var PageRouter = Backbone.Router.extend({
        currentExam : null,
        routes: {
            "quiz/:id": "viewQuiz",
            "exam/:id": "takeExam",
            "questions": "showNextQuestion",
            "questions/:tag": "showNextQuestion",
            "result": "showResult",
            "*actions": "defaultRoute" // Backbone will try match the route above first
        },

        viewQuiz: function(id){
            var quiz = models.quizes.get(id);
            $contents.empty().append(new QuizView({model: quiz}).render().el);
        },

        takeExam: function(id){
            var quiz = models.quizes.get(id);
            $contents.empty().append(new ExamView({model: quiz}).render().el);
        },

        showNextQuestion: function() {
            var quiz = QuizApp.currentExam;
            var index = QuizApp.currentQuestionIndex;

            var questions = quiz.get('questions');

            if (index < questions.length) {
                var question = questions.at(index);
                $contents.empty().append( new QuestionView({model: question}).render().el );
            }
            else {
                $contents.empty().append( new AnswerSummaryView().render().el );
            }
        },

        showResult: function(){

            // find correct answers
            var answerObj = models.correctAnswers.find(function(item) {
                return item.get('quizId') == QuizApp.currentExam.id;
            });

            var correctAnswers = answerObj.get('answers');
            console.log(correctAnswers);


            var tempModel = {
                    score: 0,
                    skipped: 0,
                    totalQuestions: QuizApp.currentExam.get('questions').length,
                    totalPoints: 0
                };

            _.each(correctAnswers, function(value, key) {
                // key is actually question id
                // value is list of ids of choices

                var userAnswer = QuizApp.answers.get(key);

                /*
                console.log('key: '+ key );
                console.log('value: ');
                console.log(value);
                console.log('useranswer: ');
                console.log(userAnswer);
                */

                tempModel.totalPoints += value.length;

                if (userAnswer.length>0) {
                    if (userAnswer.length == value.length) {
                        // check if both userAnswer and value are congurent
                        var correct = _.all(value, function(item) {
                                return userAnswer.indexOf(item) >= 0;
                            });
                        if (correct) {
                            tempModel.score += value.length;
                        }
                    }
                }
                else {
                    tempModel.skipped++;
                }

            });


            QuizApp.ResetExamInfo();

            var examResult = new Backbone.Model(tempModel);
            $contents.empty().append(new ResultView({model: examResult}).render().el);
        },


        defaultRoute: function(actions){
            //console.log('defaultRoute triggered for ' + actions);
            var quizListView = new QuizListView({model: models.quizes});

            $contents.empty().append(quizListView.render().el);

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

    return {pageRouter: router};
});
