/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Edit = function(editor) {

    var strings = editor.strings;

    var container = new UI.Panel();
    container.setClass('menu');

    var title = new UI.Panel();
    title.setClass('title');
    title.setTextContent(strings.getKey('menubar/edit'));
    container.add(title);

    var options = new UI.Panel();
    options.setClass('options');
    container.add(options);

    // Undo

    var undo = new UI.Row();
    undo.setClass('option');
    undo.setTextContent(strings.getKey('menubar/edit/undo'));
    undo.onClick(function() {

        editor.undo();

    });
    options.add(undo);

    // Redo

    var redo = new UI.Row();
    redo.setClass('option');
    redo.setTextContent(strings.getKey('menubar/edit/redo'));
    redo.onClick(function() {

        editor.redo();

    });
    options.add(redo);

    // Clear History

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/edit/clear_history'));
    option.onClick(function() {

        if (confirm('The Undo/Redo History will be cleared. Are you sure?')) {

            editor.history.clear();

        }

    });
    options.add(option);


    editor.signals.historyChanged.add(function() {

        var history = editor.history;

        undo.setClass('option');
        redo.setClass('option');

        if (history.undos.length == 0) {

            undo.setClass('inactive');

        }

        if (history.redos.length == 0) {

            redo.setClass('inactive');

        }

    });

    // ---

    options.add(new UI.HorizontalRule());

    // Clone

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/edit/clone'));
    option.onClick(function() {

        var object = editor.selected;

        if (object.parent === null) return; // avoid cloning the camera or scene

        object = object.clone();

        editor.execute(new AddObjectCommand(object));

    });
    options.add(option);

    // Delete

    var option = new UI.Row();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/edit/delete'));
    option.onClick(function() {

        var object = editor.selected;

        var parent = object.parent;
        if (parent === undefined) return; // avoid deleting the camera or scene

        editor.execute(new RemoveObjectCommand(object));

    });
    options.add(option);

    // Minify shaders






    return container;

};