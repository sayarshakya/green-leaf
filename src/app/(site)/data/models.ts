import { Timestamp } from "firebase/firestore";

export interface UserData {
  id: string;
  name: string;
  email: string;
  loanCount: number;
  loanAmount: number;
  role?: string;
}

export interface Deposit {
  id: string;
  userId: string;
  month: string;
  status: string;
  updatedAt?: Timestamp;
}

export interface Loan {
  id: string;
  userId: string;
  loanAmount: string;
  fromDate: Timestamp;
  toDate: Timestamp;
}

export interface LoanWithUser extends Loan {
  user: UserData;
}
