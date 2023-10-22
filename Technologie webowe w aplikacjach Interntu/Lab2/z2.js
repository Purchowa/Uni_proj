"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumOfPublicationYear = void 0;
function sumOfPublicationYear(books) {
    return books.reduce(function (acc, book) { return acc + book.publicationYear; }, 0);
}
exports.sumOfPublicationYear = sumOfPublicationYear;
;
