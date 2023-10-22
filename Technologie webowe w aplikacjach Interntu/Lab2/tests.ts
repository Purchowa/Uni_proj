import { Point, Rectangle } from './rectangle';
import { Book, sumOfPublicationYear } from './z2'
import concatArrays from './z3';
import { Dog, Cat } from './z4';
import {myCache, sumWithCache} from './z5';

// ---
console.log("Zad. 1");
let rectangle = new Rectangle([new Point(0, 0), new Point(2, 0), new Point(2, 1), new Point(0, 1)]);
console.log(`area should be equal 2 with points (0,0) -> (2, 0) and (0,0) -> (0, 1): ${rectangle.getArea() === 2}`);

rectangle.move(new Point(10, 5));
console.log(`area should be equal 2 when Rectangle moved in any direction: ${rectangle.getArea() === 2}`);

let hasRectangleThrownError = false;
try {
    let rectangle = new Rectangle([new Point(2, 3)]);
}
catch(error){
    hasRectangleThrownError = true;
}
console.log(`Rectangle should throw Error when not build with 4 vertices: ${hasRectangleThrownError}`);

// ---
console.log("\nZad. 2");
let books: Book[] = [
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
const resultSum = 36;

console.log(`sum of publicationYear should equal ${resultSum}: ${sumOfPublicationYear(books) === resultSum}`);

// ---
console.log("\nZad. 3");

const arr1 = [1, 2];
const arr2 = [3, 4];
const resultConcat = [1, 2, 3, 4];

console.log(`concatenation of ${arr1} and ${arr2} should result in ${resultConcat}: ${concatArrays(arr1, arr2).every((value, idx) => value === resultConcat[idx])}`);

// ---
console.log("\nZad. 4");
let dog = new Dog('Reksio');
let cat = new Cat('Filemon');
console.log(`Dog ${dog.makeSound()}`);
console.log(`Cat ${cat.makeSound()}`);

// ---
console.log("\nZad. 5");

let cache: myCache = {};
console.log(`Should add to cache: ${sumWithCache(cache, 1, 2)}`);
console.log(`Shouldn't add to cache: ${sumWithCache(cache, 1, 2)}`);
console.log(`Should add to cache: ${sumWithCache(cache, 3, 2)}`);