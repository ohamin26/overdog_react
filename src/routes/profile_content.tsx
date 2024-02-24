import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { postIdState, postState } from '../recoil/atoms/postState';
import { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router';
import { ContentDetail } from '../components/content_detail';

// 이벤트 리스너를 등록하고 즉시 핸들러 함수 호출
declare global {
  interface Window {
    callHandler: (arg: string) => Promise<any>;
  }
}
export const ProfileContent = () => {
  useEffect(() => {
    if (!sessionStorage.getItem('reloaded') || sessionStorage.getItem('reloaded') === 'false') {
      window.location.reload();
      sessionStorage.setItem('reloaded', 'true');
    }
  }, []);
  const [postId, setPostId] = useRecoilState(postIdState);
  const { state } = useLocation();
  setPostId(state.postId);
  if (postId == null) {
    return <div>잘못된 접근입니다.</div>;
  }
  const postLoadable = useRecoilValueLoadable(postState(postId));
  if (postLoadable.state === 'loading') {
    return <div>로딩 중...</div>;
  }

  if (postLoadable.state === 'hasError') {
    return <div>에러가 발생했습니다.</div>;
  }

  const post = postLoadable.contents;
  return (
    <Suspense fallback={'...loading'}>
      <div className="grid-rows-3">
        <ContentDetail data={post[0]}></ContentDetail>
      </div>
    </Suspense>
  );
};
