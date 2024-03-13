import { useNavigate } from 'react-router';
import { useTime } from '../utils/timestamp';

export const CommentMore = (data: any) => {
  const navigate = useNavigate();
  const onClickProfile = (userId: any) => {
    navigate('/profile', { state: userId });
  };
  return (
    <div>
      {/* 전달 받은 대댓글 목록 출력 */}
      {data.data.map((commentData: any, index: number) => (
        <div key={index} className="flex items-center my-3 mx-2">
          <div className="rounded-full overflow-hidden size-8" onClick={() => onClickProfile(commentData.userId)}>
            <img src="../../free-icon-cool-7298816.png"></img>
          </div>
          <div>
            <div className="flex">
              <div className="ml-2 text-[14px] font-semibold">{commentData.userId}</div>
              <div className="ml-2 text-[14px]">{commentData.commentContent}</div>
            </div>
            <div className="flex">
              <div className="ml-2 text-[11px]">{useTime(commentData)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
