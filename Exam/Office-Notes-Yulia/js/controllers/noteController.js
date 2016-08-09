var app = app || {};

app.noteController = (function () {
    function NoteController(model, views) {
        this.model = model;
        this.viewBag = views;
    }

    NoteController.prototype.loadAddNoteView = function(selector) {
        this.viewBag.addNote.addNoteView(selector);
    };

    NoteController.prototype.listNotesDeadlineToday = function (selector) {
        var _this = this;

        return this.model.listNotesDeadlineToday()
            .then(function (data) {
                _this.viewBag.listNotesDeadlineToday.loadNotesView(selector, data);
            }, function (error) {
                console.log(error);
            })
    };

    NoteController.prototype.listUserNotes = function (selector) {
        var _this = this;

        return this.model.listUserNotes()
            .then(function (data) {
                _this.viewBag.listUserNotes.loadUserNotesView(selector, data);
            }, function (error) {
                console.log(error);
            })
    };

    NoteController.prototype.addNote = function (title, text, deadline, author) {
        return this.model.addNote(title, text, deadline, author)
            .then(function() {
                window.location.replace('#/myNotes/');
            }, function(error) {
                console.log(error);
            })
    };

    // NoteController.prototype.editNote = function (noteId, title, text, deadline) {
    //     return this.model.editNote(noteId, title, text)
    //         .then(function() {
    //             window.location.replace('#/myNotes/');
    //         }, function(error) {
    //             console.log(error);
    //         })
    // };

    // NoteController.prototype.deleteNote = function (noteId) {
    //     return this.model.deleteNote(NoteId)
    //                 .then(function() {
    //                     window.location.replace('#/myNotes/');
    //                 }, function(error) {
    //                     console.log(error);
    //                 })
    // };

    return {
        load: function (model, views) {
            return new NoteController(model, views);
        }
    }
}());