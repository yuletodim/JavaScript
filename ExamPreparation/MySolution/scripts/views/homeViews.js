var app = app || {};

app.homeViews = (function  () {		// shte ima 2 f/ii za welcomeView i za homeView
	function HomeViews() {
		this.homeView = {
			loadHomeView: loadHomeView
		};
		this.welcomeView = {
			loadWelcomeView: loadWelcomeView
		};
	}

	function loadWelcomeView (selector) {
		$.get('templates/welcome-screen.html', function (template) {
			var output = Mustache.render(template);

			$(selector).html(output);
		})
	}

	function loadHomeView (selector, data) {
		$.get('templates/home.html', function (template) {
			var output = Mustache.render(template, data);

			$(selector).html(output);
		})
	}


	return {
		load: function () {
			return new HomeViews();
		}
	}
	
}());