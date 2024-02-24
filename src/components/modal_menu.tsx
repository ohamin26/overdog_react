import { useEffect, useRef } from 'react';
import { deletePostState, postIdState, postState } from '../recoil/atoms/postState';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';

export const ModalMenu = ({ onOpenModal }: any) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [postId] = useRecoilState(postIdState); // 저정된 postId 가져오기
  const postLoadable = useRecoilValueLoadable(postState(postId));
  if (postLoadable.state === 'loading') {
    return <div>로딩 중...</div>;
  }
  if (postLoadable.state === 'hasError') {
    return <div>에러가 발생했습니다.</div>;
  }

  const post = postLoadable.contents;
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onOpenModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onOpenModal]);
  const onClickDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      deletePostState(post[0]);
    }
  };
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center z-50">
      <div ref={modalRef} className="bg-white rounded w-10/12 md:w-1/3">
        <div className="border-b px-4 py-2">
          <h3 className="text-red-600 text-center cursor-pointer" onClick={onClickDelete}>
            삭제하기
          </h3>
        </div>
        <div className="border-b px-4 py-2">
          <h3 className="text-center">수정하기</h3>
        </div>
        <div className="border-b px-4 py-2">
          <h3 className="text-center cursor-pointer" onClick={onOpenModal}>
            닫기
          </h3>
        </div>
      </div>
    </div>
  );
};
