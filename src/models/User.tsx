import { Loan } from './Loan';

export interface User {
  userId?: number;
  fullName: string;
  username: string;
  password: string;
  email: string;
  role: string;
  loans?: Loan[];
}
