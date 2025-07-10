import {
  collection,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Loan, UserData, LoanWithUser } from './models';

export const fetchLoansWithUser = async (): Promise<LoanWithUser[]> => {
  const snapshot = await getDocs(collection(db, 'loans'));

  const loans: Loan[] = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Loan[];

  const userMap: Record<string, UserData> = {};

  const userIds = Array.from(new Set(loans.map((l) => l.userId)));

  await Promise.all(
    userIds.map(async (uid) => {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        userMap[uid] = userSnap.data() as UserData;
      }
    })
  );

  const joined: LoanWithUser[] = loans.map((loan) => ({
    ...loan,
    user: userMap[loan.userId] || { name: 'Unknown', email: '' },
  }));

  return joined;
};
