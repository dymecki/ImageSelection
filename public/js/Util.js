'use strict';

var Util = function() {};

Util.prototype.hasClass = function(singleClassName, wholeClassName) {
    var classes = wholeClassName.split(' ');

    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === singleClassName) {
            return true;
        }
    }

    return false;
};