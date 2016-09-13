/**
 * Created by michal on 12.09.16.
 */
(function() {
    'use strict';

    var Selection = function(elem) {
        var selections = document.getElementsByClassName('selection');

        // console.log(selections);
        // console.log(nodes);


        this.elem = elem;

        this.nodes = [];
        this.area = new Area(selections[0]);

        this.setup();
    };

    // Selection.prototype.initEvents = function() {
    //     var that = this;
    //
    //     var mouseDrag = function(e) {
    //         that.refresh(e.movementX, e.movementY);
    //     };
    //
    //     this.elem.addEventListener('mousedown', function(e) {
    //         if (e.target.className !== 'selection') {
    //             return;
    //         }
    //
    //         that.elem.addEventListener('mousemove', mouseDrag, false);
    //
    //         that.elem.addEventListener('mouseup', function (e) {
    //             that.elem.removeEventListener('mousemove', mouseDrag, false);
    //         }, false);
    //     }, false);
    // };

    // Selection.prototype.refresh = function(vx, vy) {
    //     this.elem.style.left = this.getX() + vx + 'px';
    //     this.elem.style.top  = this.getY() + vy + 'px';
    // };
    //
    // Selection.prototype.getX = function() {
    //     return parseInt(this.elem.style.left, 10) || 0;
    // };
    //
    // Selection.prototype.getY = function() {
    //     return parseInt(this.elem.style.top, 10) || 0;
    // };

    Selection.prototype.initNodes = function () {
        var nodesElems = document.getElementsByClassName('node');

        for (var i = 0, iMax = nodesElems.length; i < iMax; i++) {
            this.nodes[i] = new Node(nodesElems[i]);
            this.nodes[i].initEvents();
        }

        console.log(this.nodes[0]);
    };

    Selection.prototype.setup = function() {
        this.area.initEvents();
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
    };

    Area.prototype.test = function () {
        console.log('Area test');
    };

    Area.prototype.initEvents = function() {
        var that = this;

        var mouseDrag = function(e) {
            that.refresh(e.movementX, e.movementY);
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

    Area.prototype.refresh = function(vx, vy) {
        this.elem.style.left = this.getX() + vx + 'px';
        this.elem.style.top  = this.getY() + vy + 'px';
    };

    Area.prototype.getX = function() {
        return parseInt(this.elem.style.left, 10) || 0;
    };

    Area.prototype.getY = function() {
        return parseInt(this.elem.style.top, 10) || 0;
    };



    /* ======================================================= */




    // var Node = Object.create({});
    var Node = function (elem) {
        this.elem = elem;
    };

    Node.prototype.onDrag = function () {
        console.log('drag');
    };

    Node.prototype.initEvents = function () {
        var that = this;

        this.elem.addEventListener('click', function(e) {
            e.stopPropagation();
            this.test('michal');
            console.log('node click');
        }, false);

        var mouseDrag = function(e) {
            // that.refresh(e.movementX, e.movementY);
            that.test('michal');
        };

        this.elem.addEventListener('mousedown', function(e) {
            e.stopPropagation();

            if (e.target.className !== 'node') {
                return;
            }

            that.elem.addEventListener('mousemove', mouseDrag, false);

            that.elem.addEventListener('mouseup', function (e) {
                that.elem.removeEventListener('mousemove', mouseDrag, false);
            }, false);
        }, false);
    };

    // new Node().test();

    var selection = new Selection();
        // selection.initEvents();
        selection.initNodes();
})();