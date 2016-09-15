'use strict';

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

Workspace.prototype.initEvents = function () {
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
                'x':      e.offsetX,
                'y':      e.offsetY,
                'width':  parseInt(drawer.style.width),
                'height': parseInt(drawer.style.height)
            });
        }, false);
    }, false);
};