/**
 * Created by michal on 12.09.16.
 */
// TODO: Why I can't read css property (height, top) that was defined in stylesheet?
(function() {
    'use strict';

    var Selection = function(elem) {
        this.elem  = elem;
        this.nodes = [];
        this.area  = new Area(document.getElementsByClassName('selection')[0]);

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



    var Area = function(elem) {
        this.elem = elem;

        this.width  = 300;
        this.height = 200;

        this.elem.style.height = this.height + 'px';
        this.elem.style.width  = this.width  + 'px';
    };

    Area.prototype.initEvents = function() {
        var that = this;

        var mouseDrag = function(e) {
            that.redraw(e.movementX, e.movementY);
        };

        this.elem.addEventListener('mousedown', function(e) {
            if (e.target.className !== 'selection') {
                return;
            }

            that.elem.addEventListener('mousemove', mouseDrag, false);

            that.elem.addEventListener('mouseup', function (e) {
                that.elem.removeEventListener('mousemove', mouseDrag, false);
            }, false);
        }, false);
    };

    Area.prototype.redraw = function (vx, vy) {
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

    Area.prototype.redrawNorth = function(vy) {
        this.elem.style.top    = this.getY()      + vy + 'px';
        this.elem.style.height = this.getHeight() - vy + 'px';
    };

    Area.prototype.redrawSouth = function(vy) {
        this.elem.style.height = this.getHeight() + vy + 'px';
    };

    Area.prototype.redrawWest = function(vx) {
        this.elem.style.left  = this.getX()     + vx + 'px';
        this.elem.style.width = this.getWidth() - vx + 'px';
    };

    Area.prototype.redrawEast = function(vx) {
        this.elem.style.width = this.getWidth() + vx + 'px';
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
            switch (e.target.className) {
                case 'node top left':
                    // that.area.redraw
                    break;

                case 'node top center':
                    that.area.redrawNorth(e.movementY);
                    break;

                case 'node top right':
                    // that.area.redrawNorth(e.movementY);
                    break;

                case 'node middle left':
                    that.area.redrawWest(e.movementX);
                    break;

                case 'node middle right':
                    that.area.redrawEast(e.movementX);
                    break;

                case 'node bottom left':
                    // that.area.redrawNorth(e.movementY);
                    break;

                case 'node bottom center':
                    that.area.redrawSouth(e.movementY);
                    break;

                case 'node bottom right':
                    // that.area.redrawEast(e.movementX);
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