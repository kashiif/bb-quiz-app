define( ["jquery", "backbone", "quizapp"], function ($, Backbone, quizApp) {

    _.templateSettings = {
        interpolate : /\{\{=(.+?)\}\}/g,
        //evaluate : /\{\{(.+?)\}\}/g,
        evaluate : /\{\{([.\s\S]+?)\}\}/g,
        escape: /\{\{-(.+?)\}\}/g
    };

    var tmplQuizList = $('#template-quiz-list').html();
    var tmplQuiz = $('#template-quiz-single').html();
    var tmplExam = $('#template-exam').html();
    var tmplQuestion = $('#template-question-single').html();
    var tmplAnswerSummary = $('#template-answer-summary').html();
    var tmplResult = $('#template-result').html();

    function navigateAnchor(evt) {
        evt.preventDefault();

        var routeName = $(evt.target).attr('href');
        require(['routes'],function(routes){
            var router = routes.pageRouter;
            router.navigate(routeName, {trigger: true});
        });
    }

    var QuizView = Backbone.View.extend({
        tagName: "div",
        render: function () {
            this.$el.append( _.template( tmplQuiz, {quiz: this.model} ));
            return this;
        },
        events: {
            'click a.exam': '_route'
        },

        _route: function(evt) {
            navigateAnchor(evt);
        }
    });

    var ExamView = Backbone.View.extend({
        tagName: "div",
        render: function () {
            this.$el.append( _.template( tmplExam, {quiz: this.model} ));
            return this;
        },
        events: {
            'click a.exam': '_startExam'
        },

        _startExam: function(evt){
            quizApp.currentExam = this.model;
            quizApp.currentQuestionIndex = 0;
            if (quizApp.answers) {
              quizApp.answers.clear();
            }
            else {
              quizApp.answers = new Backbone.Model();
            }
            this._route(evt);
        },

        _route: function(evt) {
            navigateAnchor(evt);
        }
    });

    var QuestionView = Backbone.View.extend({
        tagName: "div",
        className: "question-container",

        render: function () {
            this.$el.append( _.template( tmplQuestion, {question: this.model, index: quizApp.currentQuestionIndex} ));
            return this;
        },
        events: {
            'click a.exam': '_nextQuestion'
        },

        _nextQuestion: function(evt){
            evt.preventDefault();
            // record user answer
            var val = [];
            var checkedItems = this.$el.find('input:checked');
            if (checkedItems.size() > 0) {
                checkedItems.each(function(index, elem) {
                    val.push(parseInt($(elem).val()));
                });
            }

            quizApp.answers.set(this.model.id, val);
            // update the index so that router loads the next question
            quizApp.currentQuestionIndex++;
            require(['routes'],function(routes){
                var router = routes.pageRouter;
                router.navigate('questions/?' + new Date().getTime(), {trigger: true});
            });

        }

    });


    var QuizListView = Backbone.View.extend({
        tagName: "div",
        render: function () {
            var compiled = _.template( tmplQuizList, { source: this.model.models } );

            this.$el.append( compiled );

            this.$el.find('ul.quiz-list li>div').hover(
                function(){
                    $(this).addClass('hover');
                },
                function () {
                    $(this).removeClass('hover');
                }
            );

            return this;
        },
        events: {
            'click a.exam': '_route',
            'click a.quiz': '_route'
        },

        _route: function(evt) {
            navigateAnchor(evt);
        }

    });

    var AnswerSummaryView = Backbone.View.extend({
        tagName: "div",
        render: function () {
            this.$el.append( _.template( tmplAnswerSummary, {questions: quizApp.currentExam.get('questions'), answers: quizApp.answers} ));
            return this;
        },
        events: {
            'click a.btn-show-result': '_result'
        },

        _result: function(evt){
            navigateAnchor(evt);
        }

    });

    var ResultView = Backbone.View.extend({
        tagName: "div",
        render: function () {
            this.$el.append( _.template( tmplResult, this.model ));
            return this;
        },
        events: {
            'click a.main-page': '_result'
        },

        _result: function(evt){
            navigateAnchor(evt);
        }

    });

    return {
        QuestionView: QuestionView,
        ExamView: ExamView,
        QuizView: QuizView,
        QuizListView: QuizListView,
        AnswerSummaryView: AnswerSummaryView,
        ResultView: ResultView
    };
});
