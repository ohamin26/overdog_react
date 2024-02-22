import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { ContentDetail } from '../components/content_detail';
import { postIdState, postState } from '../recoil/atoms/postState';
import { Suspense, useEffect } from 'react';
import { userIdState } from '../recoil/atoms/userState';

// 이벤트 리스너를 등록하고 즉시 핸들러 함수 호출
declare global {
  interface Window {
    callHandler: (arg: string) => Promise<any>;
  }
}
export const Content = () => {
  //flutter 통신 로직
  useEffect(() => {
    // 이벤트 리스너 등록
    const handleFromAppToWeb = (result: any) => {
      console.log(JSON.stringify(result));
      const postId = result.postId;
      const userId = result.userId;

      if (postId == '' || postId === null) {
        console.error('에러가 발생했습니다.');
        return;
      }

      const [, setPostId] = useRecoilState(postIdState);
      const [, setUserId] = useRecoilState(userIdState);

      if (userId !== null || userId !== '') {
        setUserId(userId);
      } else {
        console.error('에러가 발생했습니다.');
        return;
      }

      if (postId !== null || postId !== '') {
        setPostId(postId);
      } else {
        console.error('에러가 발생했습니다.');
        return;
      }

      window.postMessage(JSON.stringify(result));
    };

    window.callHandler('fromApptoWeb').then(handleFromAppToWeb);

    return () => {
      window.removeEventListener('fromApptoWeb', handleFromAppToWeb);
    };
  }, []);

  const [postId, setPostId] = useRecoilState(postIdState);
  setPostId('NZPl4Cr1fxH54bzJm7Wy');
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
  if (postLoadable.state === 'hasValue') {
    setPostId(post[0].postId);
  }
  return (
    <Suspense fallback={'...loading'}>
      <div className="grid-rows-3">
        <ContentDetail data={post[0]}></ContentDetail>
      </div>
    </Suspense>
  );
};
