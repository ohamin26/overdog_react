import { addDoc, collection, doc, getDocs, limit, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../database/firebase';
import { atom, atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
interface CommentData {
  commentContent: string;
  postId: string;
  originCommentId: string;
  userId: string;
  createdAt: Date;
}
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
const getComment = (id: string) => {
  const collectionRef = collection(db, 'comments');
  const postQuery = query(collectionRef, where('postId', '==', id));

  return new Promise((resolve, reject) => {
    onSnapshot(
      postQuery,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        console.log(data);
        resolve(data); // 데이터를 resolve하여 Promise 완료
      },
      (error) => {
        reject(error); // 에러가 발생하면 reject하여 Promise 실패
      },
    );
  });
};

// 댓글 추가하기
const setComment = async (data: CommentData) => {
  try {
    const collectionRef = collection(db, 'comments');
    const docRef = await addDoc(collectionRef, {
      commentContent: data.commentContent,
      postId: data.postId,
      origin_commentId: data.originCommentId,
      userId: data.userId,
      createdAt: new Date(),
    });

    // 추가된 문서의 ID 가져오기
    const addedDocId = docRef.id;

    // 추가 데이터 업데이트
    await updateDoc(doc(collectionRef, addedDocId), { commentId: addedDocId });
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
    return getComment(id);
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
