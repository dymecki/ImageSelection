'use strict';

var Area = function(elem, workspace) {
    this.elem      = elem;
    this.workspace = workspace;

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

    // Mouse drag event
    this.elem.addEventListener('mousedown', function(e) {
        if (e.target.className !== 'selection') {
            return;
        }

        that.elem.addEventListener('mousemove', mouseDrag, false);

        that.elem.addEventListener('mouseup', function(e) {
            that.elem.removeEventListener('mousemove', mouseDrag, false);
        }, false);
    }, false);


    // Expand selection on double click event
    this.elem.addEventListener('dblclick', function() {
        var data = {
            'x':      that.getX(),
            'y':      that.getY(),
            'width':  that.getWidth(),
            'height': that.getHeight()
        };

        // localStorage.setItem('selection', data.toString());
        // console.log(localStorage.getItem('selection'));

        that.elem.style.left = 0;
        that.elem.style.top  = 0;

        that.setWidth(that.workspace.getWidth() - 2);
        that.setHeight(that.workspace.getHeight() - 2);
    }, false);
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