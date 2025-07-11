import { Timestamp } from "firebase/firestore";

export interface UserData {
  id: string;
  name: string;
  email: string;
  loanCount: number;
  loanAmount: number;
  role?: string;
  fromDate: Timestamp;
  toDate: Timestamp;
}

export interface Deposit {
  id: string;
  userId: string;
  month: string;
  status: string;
  updatedAt?: Timestamp;
}

export interface Detail {
  availableAmount: string;
  loanAmount: string;
  loanCount: string;
  updatedAt?: Timestamp;
}
