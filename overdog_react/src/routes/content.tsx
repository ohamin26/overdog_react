import { ContentBottom } from '../components/content/content_bottom';
import { ContentMiddle } from '../components/content/content_middle';
import { ContentTop } from '../components/content/content_top';

export const Content = () => {
  return (
    <div className="grid-rows-3">
      <ContentTop></ContentTop>
      <ContentMiddle></ContentMiddle>
      <ContentBottom></ContentBottom>
    </div>
  );
};
