import { auth, db } from './firebase'; // Adjust path
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log('User Data:', userSnap.data());
      return userSnap.data();
    } else {
      console.log('No user document found!');
    }
  } else {
    console.log('User not logged in');
  }
});
