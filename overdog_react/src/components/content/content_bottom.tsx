import { useNavigate } from 'react-router';

export const ContentBottom = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/comment`);
  };
  return (
    <div>
      <div className="flex items-center my-2">
        <div className="ml-2">
          <img src="/bottom_nav_active_off_icon.jpg" alt="" width="25" />
        </div>
        <div className="ml-2">
          <img src="/reply_icon.jpg" alt="" width="26" />
        </div>
        <div className="ml-auto mr-2">
          <img src="/book_mark_off_icon.jpg" alt="" width="23" />
        </div>
      </div>
      <div className="flex-row ml-3">
        <div className="text-[13px] my-1 font-bold">좋아요 1개</div>
        <div className="flex text-[13px]">
          <div className="font-bold">nickname</div>
          <div className="ml-1">text</div>
        </div>
        <div className="text-[13px] text-blue-600">@tag</div>
        <div className="text-xs text-gray-500 cursor-pointer hover:text-black w-fit" onClick={onClick}>
          댓글 1개 모두 보기
        </div>
        <div className="text-[11px] text-gray-500">1시간 전</div>
      </div>
    </div>
  );
};
