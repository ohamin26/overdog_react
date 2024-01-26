import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../database/firebase';
import { atomFamily } from 'recoil';

const getPost = async (id: string) => {
  const collectionRef = collection(db, 'post');
  const postQuery = query(collectionRef, where('postId', '==', id), limit(1));
  const querySnapshot = await getDocs(postQuery);

  const doc = querySnapshot.docs.map((doc) => doc.data());

  return doc;
};

export const postState = atomFamily({
  key: 'postState',
  default: async (id: string) => {
    return await getPost(id);
  },
});
