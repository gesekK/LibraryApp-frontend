import { Loan } from './Loan';

export interface User {
  id?: number;
  fullName: string;
  username: string;
  password: string;
  email: string;
  loans?: Loan[];
}
