import { useNavigate } from 'react-router';
import { BiLike } from 'react-icons/bi';
import { BiSolidLike } from 'react-icons/bi';
import { useState } from 'react';

export const ContentBottom = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/comment`);
  };
  const [isVisible, setIsVisible] = useState(false);
  const onClickLike = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      <div className="flex-row ml-3 mt-3">
        <div className="flex justify-between">
          <div className="text-[14px] my-1 font-semibold">좋아요 1개</div>
          <div className="mx-2 text-[24px]" onClick={onClickLike}>
            {
              //<img src="/bottom_nav_active_off_icon.jpg" alt="" width="25" />
            }
            {isVisible ? <BiSolidLike /> : <BiLike />}
          </div>
        </div>
        <div className="flex text-[14px]">
          <div className="font-semibold">nickname</div>
          <div className="ml-1">text</div>
        </div>
        <div className="text-[14px]">#tag</div>
        <div className="text-[13px] text-gray-500 cursor-pointer hover:text-black w-fit" onClick={onClick}>
          댓글 1개 모두 보기
        </div>
        <div className="text-[13px] text-gray-500">1시간 전</div>
      </div>
    </div>
  );
};
