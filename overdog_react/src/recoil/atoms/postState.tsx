import { addDoc, collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../database/firebase';
import { atomFamily } from 'recoil';

const getPost = async (id: string) => {
  const collectionRef = collection(db, 'post');
  const postQuery = query(collectionRef, where('postId', '==', id), limit(1));
  const querySnapshot = await getDocs(postQuery);

  const doc = querySnapshot.docs.map((doc) => doc.data());

  return doc;
};

//id == postId
const getComment = async (id: string) => {
  const collectionRef = collection(db, 'comment');
  const postQuery = query(collectionRef, where('postId', '==', id));
  const querySnapshot = await getDocs(postQuery);

  const doc = querySnapshot.docs.map((doc) => doc.data());

  return doc;
};

//id == userId
const setComment = async (data: any) => {
  try {
    const collectionRef = collection(db, 'comments');
    await addDoc(collectionRef, data);
  } catch (e) {
    console.log(e);
  }
};

export const postState = atomFamily({
  key: 'postState',
  default: async (id: string) => {
    return await getPost(id);
  },
});

export const commentState = atomFamily({
  key: 'commentState',
  default: async (id: string) => {
    return await getComment(id);
  },
});

export const setCommentState = atomFamily({
  key: 'setCommentState',
  default: async (data: any) => {
    return await setComment(data);
  },
});
