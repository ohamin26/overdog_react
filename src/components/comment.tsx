import { useEffect, useState } from 'react';
import { CommentMore } from './comment_more';
import { useForm } from 'react-hook-form';
import { PiCursorClick } from 'react-icons/pi';
import { useRecoilState, useRecoilStateLoadable } from 'recoil';
import { commentState, postIdState, setCommentState } from '../recoil/atoms/postState';
import { useTime } from '../hooks/useTime';
import toast, { Toaster } from 'react-hot-toast';

export const Comment = (comments: any) => {
  const [postId] = useRecoilState(postIdState); // 저정된 postId 가져오기
  const [isButtonClicked, setIsButtonClicked] = useState(false); //댓글 전송 버튼 클릭 이벤트 관리 변수
  const [textareaValue, setTextareaValue] = useState(''); // 댓글 입력글 관리용 변수
  const [commentMoreUserId, setCommentMoreUserId] = useState(''); // 답글달기 관리 변수
  const [commentMoreCommentId, setCommentMoreCommentId] = useState(''); // 답글달기 관리 변수
  const [isVisibleArray, setIsVisibleArray] = useState(Array(1000).fill(false)); // 답글 모두 보기 관리 변수
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
    register,
    setValue,
  } = useForm(); // form 관련 변수
  // 답글 모두 보기 클릭 이벤트
  const onClickCommentMoreBtn = (userId: any, commentId: any) => {
    setCommentMoreUserId(userId);

    setCommentMoreCommentId(commentId);
  };

  const notifySet = () => toast('추가되었습니다');
  // 답글 달기 버튼 이벤트
  const onSubmit = () => {
    // 답글 쓴거 초기화
    reset();
    const userComment = textareaValue.trim();
    // 댓글 등록하기 위한 데이터
    const data = {
      userId: 'test',
      commentContent: userComment,
      postId: postId,
      originCommentId: commentMoreCommentId != '' ? commentMoreCommentId : 'null',
    };

    setIsButtonClicked(true);
    setCommentState(data);
    notifySet();
    setTimeout(() => {
      setIsButtonClicked(false);
      setValue('comment', '');
    }, 200);

    setCommentMoreUserId('');
    setCommentMoreCommentId('');
  };
  // 댓글 목록 불러오기
  const [, setCommentLoadable] = useRecoilStateLoadable(commentState(postId));

  useEffect(() => {
    setTimeout(() => {
      const data: any = localStorage.getItem('comment');
      setCommentLoadable(JSON.parse(data));
    }, 5000);
  });
  return (
    <div className="font-pretendard">
      {/* 가져온 댓글 목록 출력 */}
      {comments.comments.map((data: any, index: any) => (
        <div key={data.commentId}>
          {data.origin_commentId != 'null' ? (
            ''
          ) : (
            <div>
              <div className="flex items-center my-3 mx-2">
                <div className="rounded-full overflow-hidden bg-slate-600 size-8"></div>
                <div>
                  <div className="flex">
                    <div className="ml-2 text-[14px] font-semibold">{data.userId}</div>
                    <div className="ml-2 text-[14px]">{data.commentContent}</div>
                  </div>
                  <div className="flex">
                    {/* useTIme으로 가져온 시간 최적화하여 다시 출력 */}
                    <div className="ml-2 text-[11px]">{useTime(data)}</div>
                    <div
                      className="ml-2 text-[11px]"
                      onClick={() => onClickCommentMoreBtn(data.userId, data.commentId)}
                    >
                      답글 달기
                    </div>
                  </div>
                </div>
              </div>
              {/* 답글 모두 보기 클릭 이벤트 */}
              <div
                className="ml-12 text-[11px]  w-fit"
                onClick={() => {
                  const newArray = [...isVisibleArray];
                  newArray[index] = !newArray[index];
                  setIsVisibleArray(newArray);
                }}
              >
                <div className="text-gray-500 cursor-pointer hover:text-black">
                  {comments.comments.filter((item: any) => item.origin_commentId === data.commentId).length > 0
                    ? isVisibleArray[index]
                      ? '답글 숨기기'
                      : `답글 ${
                          comments.comments.filter((item: any) => item.origin_commentId === data.commentId).length
                        }개 모두 보기`
                    : ''}
                </div>
                {isVisibleArray[index] && (
                  <CommentMore
                    data={comments.comments.filter((item: any) => item.origin_commentId === data.commentId)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* 답글 달기 클릭 시 누구에게 답글을 쓸 것인지 표시 / 취소 기능 포함 */}
      {commentMoreUserId && (
        <div className="fixed bottom-12 left-0 right-0 p-4">
          <div
            className="bg-white border w-fit p-1 rounded-3xl text-[14px] text-gray-500"
            onClick={() => setCommentMoreUserId('')}
          >
            {commentMoreUserId} X
          </div>
        </div>
      )}
      {/* 댓글 입력받는 로직 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center">
          <textarea
            {...register('comment')}
            placeholder="댓글을 입력하세요."
            name=""
            id="comment"
            cols={30}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
            onChange={(e) => setTextareaValue(e.target.value)}
            required
            className="border border-solid border-gray-500 p-2 rounded-xl focus:outline-none mr-2 w-full"
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-black text-white py-2 px-4 rounded-full ${
              isButtonClicked && textareaValue.trim() !== '' ? 'bg-slate-500' : ''
            }`}
            onClick={() => (textareaValue.trim() == '' ? setIsButtonClicked(true) : '')}
          >
            <PiCursorClick />
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  border: '2px solid #FFFFFF',
                  padding: '10px',
                  color: '#FFFFFF',
                  height: '8px',
                  width: 'fit',
                  fontSize: '12px',
                  background: 'black',
                },
              }}
            />
          </button>
        </div>
      </form>
    </div>
  );
};
