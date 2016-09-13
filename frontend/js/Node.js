/**
 * Created by michal on 12.09.16.
 */
(function () {
    'use strict';

    // var Node = Object.create({});
    var Node = function () {
    };

    Node.prototype.test = function () {
        console.log('test');
    };

    Node.prototype.onDrag = function () {
        console.log('drag');
    };

    Node.prototype.addEvents = function () {
    };

    new Node().test();

    return Node;
})();