'use strict';

define('Selection', ['Node', 'Area', 'Workspace'], function(Node, Area, Workspace) {
    var Selection = function(elem) {
        this.elem  = elem;
        this.nodes = [];
        this.area  = new Area(
            document.getElementsByClassName('selection')[0],
            new Workspace(document.getElementsByClassName('selection-workspace')[0])
        );

        this.setup();
    };

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

    return Selection;
});