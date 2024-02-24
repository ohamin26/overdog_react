import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { ContentDetail } from '../components/content_detail';
import { postIdState, postState } from '../recoil/atoms/postState';
import { Suspense, useEffect } from 'react';
import { userIdState } from '../recoil/atoms/userState';
import { useSearchParams } from 'react-router-dom';

// 이벤트 리스너를 등록하고 즉시 핸들러 함수 호출
declare global {
  interface Window {
    callHandler: (arg: string) => Promise<any>;
  }
}
export const Content = () => {
  const [query, setQuery] = useSearchParams();

  const [postId, setPostId]: any = useRecoilState(postIdState);
  const [, setUserId] = useRecoilState(userIdState);

  if (postId == null) {
    return <div>잘못된 접근입니다.</div>;
  }
  useEffect(() => {
    //flutter에서 넘겨받은 값 저장
    query.get('postId') ? setQuery('postId', postId) : setPostId('NZPl4Cr1fxH54bzJm7Wy');
    query.get('userId') ? setUserId(query.get('userId')) : '';

    if (sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'false');
    }
  }, []);

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
