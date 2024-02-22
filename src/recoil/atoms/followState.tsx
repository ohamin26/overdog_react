import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../database/firebase';
import { atomFamily } from 'recoil';

const getFollowing = (data: any) => {
  const collectionRef = collection(db, 'follows');
  const postQuery = query(
    collectionRef,
    where('followerId', '==', data.followerId),
    where('followingId', '==', data.followingId),
  );
  return new Promise((resolve, reject) => {
    onSnapshot(
      postQuery,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        localStorage.setItem('following', JSON.stringify(data));
        console.log('data:', data);
        resolve(data); // 데이터를 resolve하여 Promise 완료
      },
      (error) => {
        reject(error); // 에러가 발생하면 reject하여 Promise 실패
      },
    );
  });
};

const deleteFollow = async (data: any) => {
  try {
    const collectionRef = collection(db, 'follows');
    const postQuery = query(
      collectionRef,
      where('followerId', '==', data.followerId),
      where('followingId', '==', data.followingId),
    );
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

// 좋아요 추가하기
const setFollow = async (data: any) => {
  try {
    const collectionRef = collection(db, 'follows');

    const postQuery = query(collectionRef, where('followerId', '==', data.followerId));

    const querySnapshot = await getDocs(postQuery);

    // followerId만 검사하고, 해당 값이 있는 경우에 followingId도 일치하는지 추가로 확인
    const existingFollow = querySnapshot.docs.find((doc) => doc.data().followingId === data.followingId);

    if (!existingFollow) {
      const docRef = await addDoc(collectionRef, {
        followerId: data.followerId,
        followingId: data.followingId,
      });

      const addedDocId = docRef.id;

      await updateDoc(doc(collectionRef, addedDocId), { followId: addedDocId });
    } else {
      console.log('이미 동일한 followerId 및 followingId를 가진 문서가 존재합니다');
      // 이미 문서가 존재하는 경우에 대한 처리를 추가하세요
    }
  } catch (e) {
    console.error(e);
  }
};

export const setFollowState = atomFamily({
  key: 'setFollowState',
  default: async (data: any) => {
    return await setFollow(data);
  },
});

export const deleteFollowState = atomFamily({
  key: 'deleteFollowState',
  default: async (data: any) => {
    return await deleteFollow(data);
  },
});

export const followingState = atomFamily({
  key: 'followState',
  default: async (id: string) => {
    return await getFollowing(id);
  },
  effects: [
    ({ setSelf, onSet }) => {
      const key = 'following';
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
