import { Book } from './Book';
import { User } from './User';

export interface Loan {
  loanId?: number;
  book: Book;
  user: User;
  loanDate: string;
  returnDate?: string;
  dueDate: string;
  status: string;
  confirmReturn: boolean;
}
