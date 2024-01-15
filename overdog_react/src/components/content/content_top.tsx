import { useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { ModalMenu } from '../modal_menu';

export const ContentTop = () => {
  const [isModal, setIsModal] = useState(false);
  const onOpenModal = () => {
    setIsModal(!isModal);
  };
  return (
    <div className="flex items-center my-3 mx-2">
      <div className="rounded-full overflow-hidden bg-slate-600 size-8"></div>
      <div className="ml-2 text-[13px] font-bold">nickname</div>
      <div className="ml-2 text-blue-400 text-[13px]">팔로우</div>
      <div className="ml-auto">
        <IoIosMore onClick={onOpenModal}></IoIosMore>
        {isModal && <ModalMenu onOpenModal={onOpenModal} />}
      </div>
    </div>
  );
};
