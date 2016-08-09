var app = app || {};

app.noteModel = (function() {
    function NoteModel(baseUrl, requester, headers) {
        this.serviceUrl = baseUrl + 'classes/Note';
        this.requester = requester;
        this.headers = headers;
    }

    NoteModel.prototype.listNotesDeadlineToday = function() {
        var currentDate = getCurrentDateAsString();
        var serviceUrl = this.serviceUrl + '?where={"deadline":"' + currentDate + '"}'
        return this.requester.get(serviceUrl, this.headers.getHeaders(true));
    };

    NoteModel.prototype.listUserNotes = function() {
        var author = sessionStorage['fullName'];
        var serviceUrl = this.serviceUrl + '?where={"author":"' + author + '"}'
        return this.requester.get(serviceUrl, this.headers.getHeaders(true));
    };

    NoteModel.prototype.addNote = function(title, text, deadline) {
        var userId = sessionStorage['userId'];
        var author = sessionStorage['fullName'];
        var data = {
            title: title,
            text: text,
            deadline: deadline,
            author:author,
            ACL : {}
        };

        data.ACL[userId] = {"write":true,"read":true};
        data.ACL["*"] = {"read":true};

        return this.requester.post(this.serviceUrl, this.headers.getHeaders(true), data);
    };

    // NoteModel.prototype.editNote = function(noteId, title, text, deadline) {
        // var serviceUrl = this.serviceUrl + '/' + noteId;
        // var author = sessionStorage['fullName'];
        // var data = {
        //     title: title,
        //     text: text,
        //     deadline: deadline,
        //     author:author
        // };

    //     return this.requester.put(serviceUrl, this.headers.getHeaders(true), data);
    // };

    // NoteModel.prototype.deleteNote = function(noteId) {
    //     var serviceUrl = this.serviceUrl + '/' + noteId;
    //     return this.requester.remove(serviceUrl, this.headers.getHeaders(true));
    // };

    function getCurrentDateAsString () {
        var currentDate = new Date();
        var year = currentDate.getFullYear();;
        var month = currentDate.getMonth() + 1;
        var day = currentDate.getDate();

        month = (month < 10) ? '0' + month.toString() : month.toString();
        day = (day < 10) ? '0' + day.toString() : day.toString();
        var dateString = year + "-" + month + "-" + day;

        return dateString;
    }

    return {
        load: function(baseUrl, requester, headers) {
            return new NoteModel(baseUrl, requester, headers);
        }
    }
}());