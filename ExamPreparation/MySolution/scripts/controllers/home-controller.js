var app = app || {};

 app.homeController = (function () {
 	function HomeController (views) {
 		this.viewBag = views;
 	}

 	HomeController.prototype.welcomeScreen = function(selector) {		// tuk podawame f/qta views, ne app. .... .   ..., zashtoto controller-a ne trqbva da znae za app.views!!!
 		this.viewBag.welcomeView.loadWelcomeView(selector);
 	}

 	HomeController.prototype.homeScreen = function(selector) {
 		var data = {
 			username: sessionStorage['username'],
 			fullname: sessionStorage['fullName']
 		};

 		this.viewBag.homeView.loadHomeView(selector, data);
 	}

 	return{ 	
 		load: function (views) {
 			return new HomeController(views);
 		}
 	}
 }());