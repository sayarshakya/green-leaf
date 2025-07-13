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
  month: string;
  userId: string;
  status: string;
  updatedAt?: Timestamp;

}

export interface Detail {
  availableAmount: string;
  loanAmount: string;
  loanCount: string;
  updatedAt?: Timestamp;
}
