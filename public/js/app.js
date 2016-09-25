// TODO: Why I can't read css property (height, top) that was defined in stylesheet?
// + TODO: Prevent moving the selection outside of the image.
// TODO: Fix mouse drag event - problem with mouseUp out of the element.
// TODO: Add drawing selection.
// TODO: Should we add a rotation of the selection?
// TODO: Add config object as a parameter. (Node size, callbacks)
// TODO: Fix: center node is not in center if the selection has small size.
// TODO: Selection should has some square / cross in the middle of itself.
// + TODO: Add some effect when the selection is being dragged. (i.e: different border style)
// + TODO: On doubleclick the selection will expand to take whole available workspace.
// TODO: On doubleclick when the selection is expanded it should go back to it's previous size and position.
// TODO: Remove hardcoded nodes from HTML and add them dynamically.
// TODO: Add a label with actual x, y, width and height params for a user.

'use strict';

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/app',

    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
requirejs(['Selection'], function(Selection) {
    new Selection();
});