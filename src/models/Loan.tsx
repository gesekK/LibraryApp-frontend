import { Book } from './Book';
import { User } from './User';

export interface Loan {
  id?: number;
  book: Book;
  user: User;
  loanDate: string;
  returnDate?: string;
  approved: boolean;
  returned: boolean;
}
