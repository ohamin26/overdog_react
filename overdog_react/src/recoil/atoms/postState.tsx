import { addDoc, collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../database/firebase';
import { atom, atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 게시물 목록 가져오기
const getPost = async (id: string) => {
  const collectionRef = collection(db, 'posts');
  const postQuery = query(collectionRef, where('postId', '==', id), limit(1));
  const querySnapshot = await getDocs(postQuery);

  const doc = querySnapshot.docs.map((doc) => doc.data());

  return doc;
};

// 댓글 목록 가져오기
//id == postId
const getComment = async (id: string) => {
  const collectionRef = collection(db, 'comments');
  const postQuery = query(collectionRef, where('postId', '==', id));
  const querySnapshot = await getDocs(postQuery);

  const doc = querySnapshot.docs.map((doc) => doc.data());

  return doc;
};

// 댓글 추가하기 - 구현 중
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

// 게시물 id 관리
export const postIdState = atom({
  key: 'postIdState',
  default: 'null',
  effects_UNSTABLE: [persistAtom],
});
