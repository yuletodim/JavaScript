var app = app || {};

app.phoneModel = (function  () {
	function PhoneModel (baseUrl, requester, headers) {
		this.serviceUrl = baseUrl + 'classes/Phone/';
		this.requester = requester;
		this.headers = headers;
	}

	PhoneModel.prototype.listAllPhone = function () {	
		return this.requester.get(this.serviceUrl, this.headers.getHeaders(true));	// promise!! iskame session, za da vadi samo neshtata na logatiq

	}

	PhoneModel.prototype.addPhone = function (person, number) {	
		var userId = sessionStorage['userId'];
		var data = {
				person: person,
				number: number,
				ACL: {}
			};

		data.ACL[userId] = {write: true, read: true}; // samo user s tova ID moje da si pipa zapisite negovite

		return this.requester.post(this.serviceUrl, this.headers.getHeaders(true), data);	// promise!! iskame session, za da vadi samo neshtata na logatiq

	}

	PhoneModel.prototype.deletePhone = function (phoneId) {	

		return this.requester.remove(this.serviceUrl + phoneId, this.headers.getHeaders(true));	// promise!! iskame session, za da vadi samo neshtata na logatiq

	}

	PhoneModel.prototype.editPhone = function (phoneId, person, number) {	
		var data = {
				person: person,
				number: number
			};

		return this.requester.put(this.serviceUrl + phoneId, this.headers.getHeaders(true), data);	// promise!! iskame session, za da vadi samo neshtata na logatiq

	}

	return{
		load: function (baseUrl, requester, headers) {
			return new PhoneModel(baseUrl, requester, headers);
		}
	}
}());