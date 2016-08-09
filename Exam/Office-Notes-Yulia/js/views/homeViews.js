var app = app || {};

app.homeViews = (function  () {		
	function HomeViews() {
		this.homeView = {
			loadHomeView: loadHomeView
		};
		this.welcomeView = {
			loadWelcomeView: loadWelcomeView
		};
	}

	function loadHomeView (selector, data) {
		$.get('templates/home.html', function (template) {
			var output = Mustache.render(template, data);

			$(selector).html(output);
		})
	}

	function loadWelcomeView (selector) {
		$.get('templates/welcome.html', function (template) {
			var output = Mustache.render(template);

			$(selector).html(output);
		})
	}

	return {
		load: function () {
			return new HomeViews();
		}
	}
	
}());