import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//firebase 연동
const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_Firebase_apiKey,
  authDomain: 'overdog-577c3.firebaseapp.com',
  projectId: 'overdog-577c3',
  storageBucket: 'overdog-577c3.appspot.com',
  messagingSenderId: import.meta.env.REACT_APP_Firebase_messagingSenderId,
  appId: import.meta.env.REACT_APP_Firebase_appId,
};

const app = initializeApp(firebaseConfig);
const storage: any = getStorage(app);
const db = getFirestore(app);
export { db, storage };
