import { useTime } from '../hooks/useTime';

export const CommentMore = (data: any) => {
  return (
    <div>
      {/* 전달 받은 대댓글 목록 출력 */}
      {data.data.map((commentData: any, index: number) => (
        <div key={index} className="flex items-center my-3 mx-2">
          <div className="rounded-full overflow-hidden bg-slate-600 size-8"></div>
          <div>
            <div className="flex">
              <div className="ml-2 text-[14px] font-semibold">nickname</div>
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
