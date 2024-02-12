import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { ContentDetail } from '../components/content_detail';
import { postIdState, postState } from '../recoil/atoms/postState';
import { Suspense } from 'react';
import { userIdState } from '../recoil/atoms/userState';

declare global {
  interface Window {
    flutter_inappwebview: any;
  }
}

export const Content = () => {
  //flutter 통신 로직
  window.addEventListener('fromApptoWeb', () => {
    window.flutter_inappwebview.callHandler('fromApptoWeb').then((result: any) => {
      console.log(JSON.stringify(result));
      const postId = result.postId;
      const userId = result.userId;

      if (postId == '' || postId === null) {
        return <div>에러가 발생했습니다.</div>;
      }

      const postLoadable = useRecoilValueLoadable(postState(postId));
      const [, setPostId] = useRecoilState(postIdState);
      const [, setUserId] = useRecoilState(userIdState);

      if (userId !== null || userId != '') {
        setUserId(userId);
      } else {
        return <div>에러가 발생했습니다.</div>;
      }

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

      window.flutter_inappwebview.postMessage(JSON.stringify(result));
    });
  });

  const postLoadable = useRecoilValueLoadable(postState('NZPl4Cr1fxH54bzJm7Wy'));
  const [, setPostId] = useRecoilState(postIdState);

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
