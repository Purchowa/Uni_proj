export interface Book{
    title: string;
    author: string;
    publicationYear: number;
}

export function sumOfPublicationYear(books: Book[]): number{
    return books.reduce((acc, book) =>  acc + book.publicationYear, 0);
};