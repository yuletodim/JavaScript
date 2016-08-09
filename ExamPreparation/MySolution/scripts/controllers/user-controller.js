var app = app || {};

app.userController = (function () {				// controller-a obrabotva dannite i kontrolori izobrajenieto
	function UserController (model, views) {
		this.model = model;
		this.viewBag = views;
	}

UserController.prototype.loadLoginPage = function(selector) {
        this.viewBag.loginView.loadLoginView(selector);
    };

    UserController.prototype.loadRegisterPage = function(selector) {
        this.viewBag.registerView.loadRegisterView(selector);
    };

    UserController.prototype.loadEditProfileView = function(selector) {
        var data = {
            username: sessionStorage['username'],
            fullName: sessionStorage['fullName']
        };

        this.viewBag.editProfileView.loadEditProfileView(selector, data);
    };

	UserController.prototype.login = function (username, password) {
		return this.model.login(username, password)
			.then(function(loginData) {
                setUserToStorage(loginData);
                window.location.replace('#/home/');
			}, function (error) {
				console.log(error);
			});
	}

	UserController.prototype.logout = function () {
		return this.model.logout()
			.then(function () {
				clearUserFromStorage();
				window.location.replace('#/');
			}, function (error) {
				console.log(error);
			});
	}

	UserController.prototype.register = function (user, pass, fullName) {

		return this.model.register(username, password, fullName)
			.then(function (registerData) {
				var data = {
					username: username,
					fullName: fullName,
					objectId: registerData.objectId,			// register vrushta samo objectId i sessionToken
					sessionToken: registerData.sessionToken
				};

				setUserToStorage(data);	// novosuzdadeniq user go zapazvame v session storage
				window.location.replace('#/home/');
			}, function (error) {
				console.log(error);
			});
	}

	UserController.prototype.editProfile = function () {
		var userId = sessionStorage['userId'];
        return this.model.editProfile(userId, username, pass, fullName)
            .then(function(){
                if(username !== '') {
                    sessionStorage['username'] = username;
                }
                if(fullName !== '') {
                    sessionStorage['fullName'] = fullName;
                }

                window.location.replace('#/home/');
            })
	}

	function setUserToStorage (data) {
		sessionStorage['username'] = data.username;
		sessionStorage['fullName'] = data.fullName;
		sessionStorage['userId'] = data.objectId;
		sessionStorage['sessionToken'] = data.sessionToken;
	}

	function clearUserFromStorage () {
		delete sessionStorage['username'];
		delete sessionStorage['fullName'];
		delete sessionStorage['userId'];
		delete sessionStorage['sessionToken'];
	}

	return {
		load: function (model, views) {
			return new UserController(model, views);
		}
	}
}());