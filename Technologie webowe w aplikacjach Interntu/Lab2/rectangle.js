"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.move = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
    };
    Point.prototype.length = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    Point.createVector = function (pointA, pointB) {
        return new Point(pointB.x - pointA.x, pointB.y - pointA.y);
    };
    return Point;
}());
exports.Point = Point;
var Rectangle = /** @class */ (function () {
    function Rectangle(vertices) {
        this.vertices = vertices;
        var VERTICES_NUM = 4;
        if (vertices.length !== VERTICES_NUM) {
            throw Error("Rectangle must have ".concat(VERTICES_NUM, " vertices!"));
        }
    }
    Rectangle.prototype.move = function (vector) {
        this.vertices.forEach(function (vertex) { return vertex.move(vector); });
    };
    Rectangle.prototype.getArea = function () {
        return Point.createVector(this.vertices[1], this.vertices[0]).length() *
            Point.createVector(this.vertices[3], this.vertices[0]).length();
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
