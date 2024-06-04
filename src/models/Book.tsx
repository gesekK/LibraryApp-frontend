export interface Book {
  id?: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publishYear: number;
  availableCopies: number;
  countOfLoans: number;
}
