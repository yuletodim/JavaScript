var app = app || {};

app.noteViews = (function() {
    function NoteViews() {
        this.listNotesDeadlineToday = {
            loadNotesView: loadNotesView
        };

        this.listUserNotes = {
            loadUserNotesView: loadUserNotesView
        };

        this.addNote = {
            addNoteView: addNoteView
        };

        // this.editNote = {
        //     editNoteView: editNoteView
        // };

        // this.deleteNote = {
        //     deleteNoteView: deleteNoteView
        // }
    }

    function loadNotesView (selector, data) {
        $.get('templates/officeNoteTemplate.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });
    }

    function loadUserNotesView (selector, data) {
        $.get('templates/myNoteTemplate.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });
    }

    function addNoteView (selector) {
        $.get('templates/addNote.html', function (template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function() {
            $('#addNoteButton').click(function() {
                var title = $('#title').val();
                var text = $('#text').val();
                var deadline = $('#deadline').val();

                $.sammy(function() {
                    this.trigger('addNote', {title: title, text: text, deadline: deadline});
                });

                return false;
            })
        }).done();
    }

    // function editNoteView (selector, data) {
    //     $.get('templates/editNote.html', function (template) {
    //         var outHtml = Mustache.render(template, data);
    //         $(selector).html(outHtml);
    //     }).then(function() {
    //         $('#editNoteButton').click(function() {
    //             var title = $('#title').val();
    //             var text = $('#text').val();
    //             var deadline = $('#deadline').val();

    //             $.sammy(function() {
    //                 this.trigger('editNote', {id:data.id, title: title, text: text, deadline: deadline});
    //             });

    //             return false;
    //         })
    //     }).done();
    // }

    // function deleteNoteView (selector, data) {
    //     $.get('templates/deleteNote.html', function (template) {
    //         var outHtml = Mustache.render(template, data);
    //         $(selector).html(outHtml);
    //     }).then(function() {
    //         $('#deleteNoteButton').click(function() {
    //             $.sammy(function() {
    //                 this.trigger('deleteNote', {id: data.id});
    //             });

    //             return false;
    //         })
    //     }).done();
    // }

    return {
        load: function() {
            return new NoteViews();
        }
    }
}());