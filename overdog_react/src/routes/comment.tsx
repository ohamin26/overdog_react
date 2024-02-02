import { useState } from 'react';
import { CommentMore } from '../components/comment_more';
import { useForm } from 'react-hook-form';
import { PiCursorClick } from 'react-icons/pi';
import { useRecoilStateLoadable, useRecoilValueLoadable } from 'recoil';
import { commentState } from '../recoil/atoms/postState';

export const Comment = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const onClickCommentMore = () => {
    setIsVisible(!isVisible);
  };
  const onSubmit = () => {
    console.log(1);
    reset;
    setIsButtonClicked(true);

    setTimeout(() => {
      setIsButtonClicked(false);
      setValue('comment', '');
    }, 200);
  };
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
    register,
    setValue,
  } = useForm();
  const comments = useRecoilValueLoadable(commentState('NZPl4Cr1fxH54bzJm7Wy'));
  console.log(comments);
  return (
    <div>
      <div className="flex items-center my-3 mx-2">
        <div className="rounded-full overflow-hidden bg-slate-600 size-8"></div>
        <div>
          <div className="flex">
            <div className="ml-2 text-[14px] font-semibold">nickname</div>
            <div className="ml-2 text-[14px]">content</div>
          </div>
          <div className="flex">
            <div className="ml-2 text-[11px]">1주</div>
            <div className="ml-2 text-[11px]">답글 달기</div>
          </div>
        </div>
      </div>
      <div className="ml-12 text-[11px]  w-fit" onClick={onClickCommentMore}>
        <div className="text-gray-500 cursor-pointer hover:text-black">
          {isVisible ? '답글 숨기기' : '답글 1개 모두 보기'}
        </div>
        {isVisible && <CommentMore />}
      </div>
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
          </button>
        </div>
      </form>
    </div>
  );
};
