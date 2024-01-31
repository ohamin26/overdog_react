import { useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { ModalMenu } from './modal_menu';
import { useNavigate } from 'react-router';
import { BiLike } from 'react-icons/bi';
import { BiSolidLike } from 'react-icons/bi';

export const ContentDetail = (data: any) => {
  const [isModal, setIsModal] = useState(false);
  const onOpenModal = () => {
    setIsModal(!isModal);
  };
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
      <div className="flex items-center my-3 mx-2">
        <div className="rounded-full overflow-hidden bg-slate-600 size-8"></div>
        <div className="ml-2 text-[14px] font-bold">{data.data.userId}</div>
        <div className="ml-2 text-blue-400 text-[14px]">팔로우</div>
        <div className="ml-auto">
          <IoIosMore onClick={onOpenModal}></IoIosMore>
          {isModal && <ModalMenu onOpenModal={onOpenModal} />}
        </div>
      </div>
      <div className="">
        <img src="../public/vite.svg" alt="컨텐츠 이미지" className="w-full h-72" />
      </div>
      <div className="flex-row ml-3 mt-3">
        <div className="flex justify-between">
          <div className="text-[14px] my-1 font-semibold">좋아요 1개</div>
          <div className="mx-2 text-[24px]" onClick={onClickLike}>
            {isVisible ? <BiSolidLike /> : <BiLike />}
          </div>
        </div>
        <div className="flex text-[14px]">
          <div className="font-semibold">{data.data.userId}</div>
          <div className="ml-1">{data.data.postContent}</div>
        </div>
        {data.data.tagList.map((data: any, index: any) => (
          <span key={index} className="text-[14px]">
            #{data + ' '}
          </span>
        ))}
        <div className="text-[13px] text-gray-500 cursor-pointer hover:text-black w-fit" onClick={onClick}>
          댓글 1개 모두 보기
        </div>
        <div className="text-[13px] text-gray-500">1시간 전</div>
      </div>
    </div>
  );
};
