import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 유저 id 관리
export const userIdState = atom({
  key: 'userIdState',
  default: 'test',
  effects_UNSTABLE: [persistAtom],
});
