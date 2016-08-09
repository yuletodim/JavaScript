var app = app || {};

app.userModel = (function  () {
	function UserModel (baseUrl, requester, headers) {
		this.baseUrl = baseUrl;
		this.requester = requester;
		this.headers = headers;
	}

	UserModel.prototype.login = function (username, password) {	// neobhodimi parametri za login zaqvkata
		var serviceUrl = this.baseUrl + 'login?username=' + username + '&password=' + password;

		return this.requester.get(serviceUrl, this.headers.getHeaders());	
		// vseki put trqbva da vzimame headers i da proveryavame za session!!
		// return za da produljim verigata na promise
	}

	UserModel.prototype.register = function (username, password, fullName) {	// neobhodimi parametri za login zaqvkata
		var serviceUrl = this.baseUrl + 'users/';
		var data = {
			username: username,
			password: password,
			fullName: fullName
		};

		return this.requester.post(serviceUrl, this.headers.getHeaders(), data);	
		// register e post zaqvka, ima si data
		// return za da produljim verigata na promise
	}

	UserModel.prototype.logout = function (username, password) {	// neobhodimi parametri za login zaqvkata
		var serviceUrl = this.baseUrl + 'logout';

		return this.requester.post(serviceUrl, this.headers.getHeaders(true));	
		// logout e post zayavka, ima session token, kojto si go vzima avtomat`chno ot headers
		// return za da produljim verigata na promise
	}

	UserModel.prototype.editProfile = function (userId, username, password, fullName) {
		var serviceUrl = this.baseUrl + 'users/' + userId;
		var data = {
			username: username,
			password: password,
			fullName: fullName
		};

		return this.requester.put(serviceUrl, this.headers.getHeaders(true), data);	// ima nujda ot sessionToken
	}

	return{
		load: function (baseUrl, requester, headers) {
			return new UserModel(baseUrl, requester, headers);
		}
	}
}());