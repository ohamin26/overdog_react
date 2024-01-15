import { useState } from 'react';
import { CommentMore } from '../components/comment_more';

export const Comment = () => {
  const [isVisible, setIsVisible] = useState(false);
  const onClickCommentMore = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      <div className="flex items-center my-3 mx-2">
        <div className="rounded-full overflow-hidden bg-slate-600 size-8"></div>
        <div>
          <div className="flex">
            <div className="ml-2 text-[13px] font-bold">nickname</div>
            <div className="ml-2 text-[13px]">content</div>
          </div>
          <div className="flex">
            <div className="ml-2 text-[10px]">1주</div>
            <div className="ml-2 text-[10px]">답글 달기</div>
          </div>
        </div>
      </div>
      <div className="ml-12 text-[10px]  w-fit" onClick={onClickCommentMore}>
        <div className="text-gray-500 cursor-pointer hover:text-black">
          {isVisible ? '답글 숨기기' : '답글 1개 모두 보기'}
        </div>
        {isVisible && <CommentMore />}
      </div>
    </div>
  );
};
