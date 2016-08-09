var app = app || {};

(function () {
	var PARSE_APP_ID = 'cYh9M3S0eyfs8oNV99aeAUbwYcOS9qnek8lKGU4O';
	var PARSE_REST_KEY = 'tiF2Z61dwcBjas2dw2FNzQ7YXgaaZfaMfZtghOl3';
	var BASE_URL = 'https://api.parse.com/1/';

	var headers = app.headers.load(PARSE_APP_ID, PARSE_REST_KEY);
	var requester = app.requester.load();

	var userModel = app.userModel.load(BASE_URL, requester, headers);
	var userViews = app.userViews.load();
	var userController = app.userController.load(userModel, userViews);

	var noteModel = app.noteModel.load(BASE_URL, requester, headers);
	var noteViews = app.noteViews.load();
	var noteController = app.noteController.load(noteModel, noteViews);

	var homeViews = app.homeViews.load();
	var homeController = app.homeController.load(homeViews);

	app.router = Sammy(function () {
		var selector = '#container';

        this.before(function() {
            var userId = sessionStorage['userId'];
            if(userId) {
                $('#menu').show();
            } else {
                $('#menu').hide();
            }
        });

        this.get('#/', function () {
			homeController.welcomeScreen(selector);
		});

        this.before('#/home/', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                return false;
            }
        });

        this.get('#/home/', function () {
            homeController.homeScreen(selector);
        });

        this.get('#/login/', function() {
            userController.loadLoginPage(selector);
        });

        this.bind('login', function(e, data) {
            userController.login(data.username, data.password);
        });

        this.get('#/register/', function() {
            userController.loadRegisterPage(selector);
        });

        this.bind('register', function(e, data) {
            userController.register(data.username, data.password, data.fullName);
        });

        this.before('#/logout/', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                return false;
            }
        });

        this.get('#/logout/', function () {
        	userController.logout();
        });

        this.get('#/addNote/', function () {
        	noteController.loadAddNoteView(selector);
        });

        this.bind('addNote', function(e, data) {
            noteController.addNote(data.title, data.text, data.deadline);
        });

        this.get('#/office/', function () {
        	noteController.listNotesDeadlineToday(selector);
        });

        this.get('#/myNotes/', function () {
        	noteController.listUserNotes(selector);
        });

        // this.bind('deleteNote', function(e, data) {
        //     phoneController.deleteNote(data.id);
        // });

        // this.bind('editNote', function(e, data) {
        //     noteController.editNote(data.id, data.person, data.number);
        // });


	});

	app.router.run('#/');
}());