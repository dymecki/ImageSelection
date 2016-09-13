/**
 * Created by michal on 12.09.16.
 */
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

(function() {
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
    Selection.prototype.initNodes = function () {
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

    Selection.prototype.test = function (foo) {
        console.log(foo);
    };



    /* ======================================================= */



    var Event = function() {};

    Event.prototype.mouseDrag = function () {

    };


    /* ======================================================= */




    var Workspace = function(elem) {
        this.elem = elem;

        this.x = 0;
        this.y = 0;
        this.width = 400;
        this.height = 250;

        this.initEvents();
    };

    Workspace.prototype.getX = function() {
        return this.x;
    };

    Workspace.prototype.getY = function() {
        return this.y;
    };

    Workspace.prototype.getWidth = function() {
        return this.width;
    };

    Workspace.prototype.getHeight = function() {
        return this.height;
    };

    Workspace.prototype.initEvents = function() {
        var that = this;

        this.elem.addEventListener('mousedown', function(e) {
            var drawer;

            drawer = document.createElement('div');
            that.elem.appendChild(drawer);

            drawer.setAttribute('class', 'selection-drawer');
            drawer.style.left   = e.offsetX + 'px';
            drawer.style.top    = e.offsetY + 'px';
            drawer.style.width  = 0;
            drawer.style.height = 0;

            var mouseMove = function(e) {
                drawer.style.width  = parseInt(drawer.style.width, 10)  + e.movementX + 'px';
                drawer.style.height = parseInt(drawer.style.height, 10) + e.movementY + 'px';
            };

            that.elem.addEventListener('mousemove', mouseMove, false);

            that.elem.addEventListener('mouseup', function(e) {
                that.elem.removeEventListener('mousemove', mouseMove, false);
                new Selection({
                    'x': e.offsetX,
                    'y': e.offsetY,
                    'width':  parseInt(drawer.style.width),
                    'height': parseInt(drawer.style.height)
                });
            }, false);
        }, false);
    };





    /* ======================================================= */




    var Area = function(elem, workspace) {
        this.elem      = elem;
        this.workspace = workspace;

        this.width  = 300;
        this.height = 200;

        // this.elem.style.height = this.height + 'px';
        // this.elem.style.width  = this.width  + 'px';
    };

    Area.prototype.initEvents = function() {
        var that = this;

        var mouseDrag = function(e) {
            that.redraw(e.movementX, e.movementY);
        };

        // Mouse drag event
        // this.elem.addEventListener('mousedown', function(e) {
        //     if (e.target.className !== 'selection') {
        //         return;
        //     }
        //
        //     that.elem.addEventListener('mousemove', mouseDrag, false);
        //
        //     that.elem.addEventListener('mouseup', function (e) {
        //         that.elem.removeEventListener('mousemove', mouseDrag, false);
        //     }, false);
        // }, false);


        // Expand selection on double click event
        // this.elem.addEventListener('dblclick', function() {
        //     var data = {
        //         'x':      that.getX(),
        //         'y':      that.getY(),
        //         'width':  that.getWidth(),
        //         'height': that.getHeight()
        //     };
        //
        //     // localStorage.setItem('selection', data.toString());
        //     // console.log(localStorage.getItem('selection'));
        //
        //     that.elem.style.left = 0;
        //     that.elem.style.top  = 0;
        //
        //     that.setWidth(that.workspace.getWidth() - 2);
        //     that.setHeight(that.workspace.getHeight() - 2);
        // }, false);
    };

    Area.prototype.redraw = function (vx, vy) {
        if ( ! this.isInsideWorkspace(vx, vy)) {
            return false;
        }

        this.elem.style.left = this.getX() + vx + 'px';
        this.elem.style.top  = this.getY() + vy + 'px';
    };

    Area.prototype.getX = function() {
        return parseInt(this.elem.style.left, 10) || 0;
    };

    Area.prototype.getY = function() {
        return parseInt(this.elem.style.top, 10) || 0;
    };

    Area.prototype.getWidth = function() {
        return parseInt(this.elem.style.width, 10) || 0;
    };

    Area.prototype.getHeight = function() {
        return parseInt(this.elem.style.height, 10) || 0;
    };

    Area.prototype.setWidth = function(width) {
        this.width = width;
        this.elem.style.width = width + 'px';
    };

    Area.prototype.setHeight = function(height) {
        this.height = height;
        this.elem.style.height = height + 'px';
    };

    Area.prototype.redrawTop = function (vy) {
        if ( ! this.isInsideWorkspace(null, vy)) {
            return false;
        }

        this.elem.style.top    = this.getY()      + vy + 'px';
        this.elem.style.height = this.getHeight() - vy + 'px';
    };

    Area.prototype.redrawBottom = function (vy) {
        if ( ! this.isInsideWorkspace(null, vy)) {
            return false;
        }

        this.elem.style.height = this.getHeight() + vy + 'px';
    };

    Area.prototype.redrawLeft = function (vx) {
        if ( ! this.isInsideWorkspace(vx)) {
            return false;
        }

        this.elem.style.left  = this.getX()     + vx + 'px';
        this.elem.style.width = this.getWidth() - vx + 'px';
    };

    Area.prototype.redrawRight = function (vx) {
        if ( ! this.isInsideWorkspace(vx)) {
            return false;
        }

        this.elem.style.width = this.getWidth() + vx + 'px';
    };

    Area.prototype.isInsideWorkspace = function(vx, vy) {
        vx = vx || 0;
        vy = vy || 0;

        return ! (
            this.getX() + vx < this.workspace.getX() ||
            this.getY() + vy < this.workspace.getY() ||
            this.getX() + vx + this.getWidth()  > this.workspace.getWidth() ||
            this.getY() + vy + this.getHeight() > this.workspace.getHeight()
        );
    };

    Area.prototype.isExpanded = function() {
        return ! (
            this.getWidth()  < this.workspace.getWidth()  - 2 ||
            this.getHeight() < this.workspace.getHeight() - 2
        );
    };




    /* ======================================================= */




    var Node = function (elem, area) {
        this.elem = elem;
        this.area = area;
    };

    Node.prototype.onDrag = function () {
        console.log('drag');
    };

    Node.prototype.initEvents = function () {
        var that = this;

        var mouseDrag = function(e) {
            // that.test('michal');
            // console.log(e.target.className);

            // TODO: Refactor this switch structure to design pattern.
            // TODO: What if there're other class names as well?
            switch (e.target.className) {
                case 'node top left':
                    that.area.redrawTop(e.movementY);
                    that.area.redrawLeft(e.movementX);
                    break;

                case 'node top center':
                    that.area.redrawTop(e.movementY);
                    break;

                case 'node top right':
                    that.area.redrawTop(e.movementY);
                    that.area.redrawRight(e.movementX);
                    break;

                case 'node middle left':
                    that.area.redrawLeft(e.movementX);
                    break;

                case 'node middle right':
                    that.area.redrawRight(e.movementX);
                    break;

                case 'node bottom left':
                    that.area.redrawBottom(e.movementY);
                    that.area.redrawLeft(e.movementX);
                    break;

                case 'node bottom center':
                    that.area.redrawBottom(e.movementY);
                    break;

                case 'node bottom right':
                    that.area.redrawBottom(e.movementY);
                    that.area.redrawRight(e.movementX);
                    break;
            }
        };

        this.elem.addEventListener('mousedown', function(e) {
            // e.stopPropagation();

            // if (e.target.className !== 'node') {
            //     return;
            // }

            that.elem.addEventListener('mousemove', mouseDrag, false);

            that.elem.addEventListener('mouseup', function (e) {
                that.elem.removeEventListener('mousemove', mouseDrag, false);
            }, false);
        }, false);
    };



    /* ======================================================= */

    var Util = function() {};

    Util.prototype.hasClass = function(singleClassName, wholeClassName) {
        var classes = wholeClassName.split(' ');

        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == singleClassName) {
                return true;
            }
        }

        return false;
    };

    var util = new Util();



    /* ======================================================= */


    var selection = new Selection();
})();