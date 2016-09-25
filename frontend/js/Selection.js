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

var Selection = function(elem) {
    this.elem  = elem;
    this.nodes = [];
    this.area  = new Area(
        document.getElementsByClassName('selection')[0],
        new Workspace(document.getElementsByClassName('selection-workspace')[0])
    );

    this.setup();
};

// Should this method be here or inside a Node object? What with Dependency Injection?
Selection.prototype.initNodes = function() {
    var nodesElems = document.getElementsByClassName('node');

    for (var i = 0, iMax = nodesElems.length; i < iMax; i++) {
        this.nodes[i] = new Node(nodesElems[i], this.area);
        this.nodes[i].initEvents();
    }

    // console.log(this.nodes[0]);
};

Selection.prototype.setup = function() {
    this.area.initEvents();
    this.initNodes();
};

Selection.prototype.test = function(foo) {
    console.log(foo);
};