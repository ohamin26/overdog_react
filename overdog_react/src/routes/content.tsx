import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { ContentDetail } from '../components/content_detail';
import { postIdState, postState } from '../recoil/atoms/postState';
import { Suspense } from 'react';

export const Content = () => {
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
