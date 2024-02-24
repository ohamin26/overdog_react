import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, storage } from '../../database/firebase';
import { atom, atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ref } from 'firebase/storage';
import { deleteObject } from 'firebase/storage';

recoilPersist();
interface CommentData {
  commentContent: string;
  postId: string;
  originCommentId: string;
  userId: string;
  createdAt: Date;
}
// 게시물 목록 가져오기(postId)
const getPost = async (id: string) => {
  const collectionRef = collection(db, 'posts');
  const postQuery = query(collectionRef, where('postId', '==', id), limit(1));
  const querySnapshot = await getDocs(postQuery);

  const doc = querySnapshot.docs.map((doc) => doc.data());

  return doc;
};

// 게시물 목록 가져오기(userId)
const getPostByUserId = async (id: string) => {
  const collectionRef = collection(db, 'posts');
  const postQuery = query(collectionRef, where('userId', '==', id));
  const querySnapshot = await getDocs(postQuery);

  const doc = querySnapshot.docs.map((doc) => doc.data());

  return doc;
};

// 댓글 목록 가져오기
//id == postId
const getComment = (id: string) => {
  const collectionRef = collection(db, 'comments');
  const postQuery = query(collectionRef, where('postId', '==', id), orderBy('createdAt', 'desc'));

  return new Promise((resolve, reject) => {
    onSnapshot(
      postQuery,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        localStorage.setItem('comment', JSON.stringify(data));
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

const deletePost = async (data: any) => {
  try {
    // Storage에서 이미지 삭제
    data.imageUrlList.forEach(async (imageUrl: string) => {
      const imageRef: any = ref(storage, `posts/${data.postId}/${imageUrl}`);

      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.error('Error deleting image: ', error);
      }
    });

    //댓글 삭제
    const commentRef = collection(db, 'comments');
    const commentQuery = query(commentRef, where('postId', '==', data.postId));
    const commentSnapshot = await getDocs(commentQuery);
    commentSnapshot.forEach((doc) => {
      const docRef = doc.ref;
      deleteDoc(docRef)
        .then(() => {})
        .catch((error) => {
          console.error('Error : ', error);
        });
    });

    //좋아요 삭제
    const likeRef = collection(db, 'likes');
    const likeQuery = query(likeRef, where('postId', '==', data.postId));
    const likeSnapshot = await getDocs(likeQuery);
    likeSnapshot.forEach((doc) => {
      const docRef = doc.ref;
      deleteDoc(docRef)
        .then(() => {})
        .catch((error) => {
          console.error('Error : ', error);
        });
    });

    //게시물 삭제
    const collectionRef = collection(db, 'posts');
    const postQuery = query(collectionRef, where('postId', '==', data.postId));
    const querySnapshot = await getDocs(postQuery);
    querySnapshot.forEach((doc) => {
      const docRef = doc.ref;
      deleteDoc(docRef)
        .then(() => {})
        .catch((error) => {
          console.error('Error : ', error);
        });
    });
  } catch (e) {
    console.log(e);
  }
};

export const deletePostState = atomFamily({
  key: 'deletePostState',
  default: async (data: any) => {
    return await deletePost(data);
  },
});

export const postState = atomFamily({
  key: 'postState',
  default: async (id: string) => {
    return await getPost(id);
  },
});

export const postByUserIdState = atomFamily({
  key: 'postByUserIdState',
  default: async (id: string) => {
    return await getPostByUserId(id);
  },
});

export const commentState = atomFamily({
  key: 'commentState',
  default: async (id: string) => {
    return await getComment(id);
  },
  effects: [
    ({ setSelf, onSet }) => {
      const key = 'comment';
      const savedValue = localStorage.getItem(key);

      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _oldValue, isReset) => {
        if (savedValue == null && isReset) {
          localStorage.setItem(key, JSON.stringify(newValue));
        } else {
          isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
        }
      });
    },
  ],
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
});
