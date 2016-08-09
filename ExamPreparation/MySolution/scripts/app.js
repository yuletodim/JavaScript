var app = app || {};

(function  () {
	var PARSE_APP_ID = 'l8DbfyONYQPJZkbcov1hRoe0KAWZCBTLdCN1nnyx';
	var PARSE_REST_KEY = 'petGTLTiA7qTllmQxtySNZjxyseno27We6DuFTl3';
	var baseUrl = 'https://api.parse.com/1/';

	var headers = app.headers.load(PARSE_APP_ID, PARSE_REST_KEY);
	var requester = app.requester.load();

	var userModel = app.userModel.load(baseUrl, requester, headers);
	var userViews = app.userViews.load();
	var userController = app.userController.load(userModel, userViews);

	var phoneModel = app.phoneModel.load(baseUrl, requester, headers);
	var phoneViews = app.phoneViews.load();
	var phoneController = app.phoneController.load(phoneModel, phoneViews);

	var homeViews = app.homeViews.load();
	var homeController = app.homeController.load(homeViews);

	app.router = Sammy(function () {
		var selector = '#wrapper';

		

		this.before(function () {			// tuk ne okazvame predi koj put da se izpulnqva => sammy shte go izpulnqva vseki put
			var userId = sessionStorage['userId'];

			if(userId){
				$('#menu').show();
			} else {
				$('#menu').hide();
				this.redirect('#/');		// ako nqmame user lognat -> sammy.redirect kum welcome screen
			}
		});

		this.get('#/', function () {
			homeController.welcomeScreen(selector);
		});

		this.get('#/home/', function () {
			homeController.homeScreen(selector);
		});

		this.get('#/login/', function (selector) {
			userController.loadLoginPage();
		});

		this.get('#/register/', function (selector) {
			userController.loadRegisterPage();
		});
		
	});

	app.router.run('#/');

}());