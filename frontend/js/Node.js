'use strict';

var Node = function (elem, area) {
    this.elem = elem;
    this.area = area;
};

Node.prototype.initEvents = function() {
    var that = this;

    var mouseDrag = function(e) {
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

        that.elem.addEventListener('mouseup', function(e) {
            that.elem.removeEventListener('mousemove', mouseDrag, false);
        }, false);
    }, false);
};