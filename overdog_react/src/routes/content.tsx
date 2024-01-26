import { useRecoilValue } from 'recoil';
import { ContentBottom } from '../components/content/content_bottom';
import { ContentMiddle } from '../components/content/content_middle';
import { ContentTop } from '../components/content/content_top';
import { postState } from '../recoil/atoms/postState';
import { Suspense } from 'react';

export const Content = () => {
  const post = useRecoilValue(postState('jxTSkEO6FYVz0FinoKNF')); //id 값 flutter에서 넘겨받아서 넣어줘야함
  console.log(post);
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="grid-rows-3">
        <ContentTop></ContentTop>
        <ContentMiddle></ContentMiddle>
        <ContentBottom></ContentBottom>
      </div>
    </Suspense>
  );
};
