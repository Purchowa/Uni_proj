"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rectangle_1 = require("./rectangle");
var z2_1 = require("./z2");
var z3_1 = require("./z3");
var z4_1 = require("./z4");
var z5_1 = require("./z5");
// ---
console.log("Zad. 1");
var rectangle = new rectangle_1.Rectangle([new rectangle_1.Point(0, 0), new rectangle_1.Point(2, 0), new rectangle_1.Point(2, 1), new rectangle_1.Point(0, 1)]);
console.log("area should be equal 2 with points (0,0) -> (2, 0) and (0,0) -> (0, 1): ".concat(rectangle.getArea() === 2));
rectangle.move(new rectangle_1.Point(10, 5));
console.log("area should be equal 2 when Rectangle moved in any direction: ".concat(rectangle.getArea() === 2));
var hasRectangleThrownError = false;
try {
    var rectangle_2 = new rectangle_1.Rectangle([new rectangle_1.Point(2, 3)]);
}
catch (error) {
    hasRectangleThrownError = true;
}
console.log("Rectangle should throw Error when not build with 4 vertices: ".concat(hasRectangleThrownError));
// ---
console.log("\nZad. 2");
var books = [
    {
        title: "Na plazy",
        author: "Maciej",
        publicationYear: 11
    },
    {
        title: "W lesie",
        author: "Andrzej",
        publicationYear: 12
    },
    {
        title: "Arasaka",
        author: "Jacek Wrobel",
        publicationYear: 13
    }
];
var resultSum = 36;
console.log("sum of publicationYear should equal ".concat(resultSum, ": ").concat((0, z2_1.sumOfPublicationYear)(books) === resultSum));
// ---
console.log("\nZad. 3");
var arr1 = [1, 2];
var arr2 = [3, 4];
var resultConcat = [1, 2, 3, 4];
console.log("concatenation of ".concat(arr1, " and ").concat(arr2, " should result in ").concat(resultConcat, ": ").concat((0, z3_1.default)(arr1, arr2).every(function (value, idx) { return value === resultConcat[idx]; })));
// ---
console.log("\nZad. 4");
var dog = new z4_1.Dog('Reksio');
var cat = new z4_1.Cat('Filemon');
console.log("Dog ".concat(dog.makeSound()));
console.log("Cat ".concat(cat.makeSound()));
// ---
console.log("\nZad. 5");
var cache = {};
console.log("Should add to cache: ".concat((0, z5_1.sumWithCache)(cache, 1, 2)));
console.log("Shouldn't add to cache: ".concat((0, z5_1.sumWithCache)(cache, 1, 2)));
console.log("Should add to cache: ".concat((0, z5_1.sumWithCache)(cache, 3, 2)));
