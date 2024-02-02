import { useRecoilValue } from 'recoil';
import { ContentDetail } from '../components/content_detail';
import { postState } from '../recoil/atoms/postState';
import { Suspense } from 'react';

export const Content = () => {
  const post = useRecoilValue(postState('NZPl4Cr1fxH54bzJm7Wy')); //id 값 flutter에서 넘겨받아서 넣어줘야함
  console.log(post);
  return (
    <Suspense fallback={'...loading'}>
      <div className="grid-rows-3">
        <ContentDetail data={post[0]}></ContentDetail>
      </div>
    </Suspense>
  );
};
