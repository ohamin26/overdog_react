import { addDoc, collection, deleteDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../database/firebase';
import { atomFamily } from 'recoil';

// 좋아요 목록 가져오기 게시물 id로 검색
const getLikebyPostId = async (id: string) => {
  const collectionRef = collection(db, 'likes');
  const postQuery = query(collectionRef, where('postId', '==', id));

  return new Promise((resolve, reject) => {
    onSnapshot(
      postQuery,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        if (data == null) {
          resolve(0);
        }
        localStorage.setItem('like', JSON.stringify(data));
        resolve(data); // 데이터를 resolve하여 Promise 완료
      },
      (error) => {
        reject(error); // 에러가 발생하면 reject하여 Promise 실패
      },
    );
  });
};

// 좋아요 목록 가져오기 유저 id로 검색
const getLikebyUserId = async (data: any) => {
  const collectionRef = collection(db, 'likes');
  const postQuery = query(collectionRef, where('postId', '==', data.postId), where('userId', '==', data.userId));
  return new Promise((resolve, reject) => {
    onSnapshot(
      postQuery,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        if (data == null) {
          resolve(0);
        }
        localStorage.setItem('userLike', JSON.stringify(data));
        resolve(data); // 데이터를 resolve하여 Promise 완료
      },
      (error) => {
        reject(error); // 에러가 발생하면 reject하여 Promise 실패
      },
    );
  });
};

const deleteLike = async (data: any) => {
  try {
    const collectionRef = collection(db, 'likes');
    const postQuery = query(collectionRef, where('postId', '==', data.postId), where('userId', '==', data.userId));
    const querySnapshot = await getDocs(postQuery);

    querySnapshot.forEach((doc) => {
      const docRef = doc.ref;
      deleteDoc(docRef)
        .then(() => {
          console.log('삭제');
        })
        .catch((error) => {
          console.error('Error : ', error);
        });
    });
  } catch (e) {
    console.log(e);
  }
};

// 좋아요 추가하기
const setLike = async (data: any) => {
  try {
    const collectionRef = collection(db, 'likes');
    await addDoc(collectionRef, {
      userId: data.userId,
      postId: data.postId,
    }).then(() => {
      console.log(`추가`);
    });
  } catch (e) {
    console.log(e);
  }
};

export const likebyUserIdState = atomFamily({
  key: 'likebyUserIdState',
  default: async (data: any) => {
    return await getLikebyUserId(data);
  },
});

export const deleteLikeState = atomFamily({
  key: 'deleteLikeState',
  default: async (data: any) => {
    return await deleteLike(data);
  },
});

export const setLikeState = atomFamily({
  key: 'setLikeState',
  default: async (data: any) => {
    return await setLike(data);
  },
});

export const likebyPostIdState = atomFamily({
  key: 'likebyPostIdState',
  default: async (id: string) => {
    return await getLikebyPostId(id);
  },
  effects: [
    ({ setSelf, onSet }) => {
      const key = 'like';
      const savedValue = localStorage.getItem(key);

      console.log(savedValue);
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

// export const likebyPostIdState = atomFamily({
//   key: 'likebyPostIdState',
//   default: async (id: string) => {
//     return await getLikebyPostId(id);
//   },
// });
