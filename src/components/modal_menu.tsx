import { useEffect, useRef } from 'react';

export const ModalMenu = ({ onOpenModal }: any) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

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
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center z-50">
      <div ref={modalRef} className="bg-white rounded w-10/12 md:w-1/3">
        <div className="border-b px-4 py-2">
          <h3 className="text-center">수정하기</h3>
        </div>
        <div className="border-b px-4 py-2">
          <h3 className="text-red-600 text-center cursor-pointer" onClick={onOpenModal}>
            삭제하기
          </h3>
        </div>
      </div>
    </div>
  );
};
