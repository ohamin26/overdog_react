import { useEffect, useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { ModalMenu } from './modal_menu';
import { BiLike } from 'react-icons/bi';
import { BiSolidLike } from 'react-icons/bi';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { useRecoilState, useRecoilStateLoadable } from 'recoil';
import { deleteLikeState, likebyPostIdState, likebyUserIdState, setLikeState } from '../recoil/atoms/likeState';
import toast, { Toaster } from 'react-hot-toast';
import { deleteFollowState, followingState, setFollowState } from '../recoil/atoms/followState';
import { userIdState } from '../recoil/atoms/userState';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { Comment } from './comment';
import { commentState, postIdState } from '../recoil/atoms/postState';
import { time } from '../utils/time';

export const ContentDetail = (data: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [followVisible, setFollowVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isAtFirstImage = currentImageIndex === 0;
  const isAtLastImage = currentImageIndex === data.data.imageUrlList.length - 1;
  const [isModal, setIsModal] = useState(false);

  //모달창 실행 이벤트
  const onOpenModal = () => {
    setIsModal(!isModal);
  };
  //댓글 모두 보기 클릭 시 버튼 이벤트
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const onClick = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };
  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const notifySet = () => toast('추가되었습니다');

  const notifyDelete = () => toast('삭제되었습니다');

  //좋아요 버튼 클릭 시 버튼 이벤트
  const onClickLike = () => {
    try {
      if (isVisible) {
        deleteLikeState(idData);
        notifyDelete();
      } else {
        setLikeState(idData);
        notifySet();
      }
      setIsVisible(!isVisible);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onClickFollow = () => {
    try {
      if (followVisible) {
        deleteFollowState(followData);
        notifyDelete();
      } else {
        setFollowState(followData);
        notifySet();
      }
      setFollowVisible(!followVisible);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const likeData: any = localStorage.getItem('like');
      const userLikeData: any = localStorage.getItem('userLike');
      userLikeData == null ? setUserLike(1) : setUserLike(JSON.parse(userLikeData));
      setPostLike(JSON.parse(likeData));
      const followingData: string | null = localStorage.getItem('following');
      setFollowing(followingData ? JSON.parse(followingData) : null);
      const commentsData: any = localStorage.getItem('comment');
      setCommentsLoadable(JSON.parse(commentsData));
    }, 300);
  });

  //다음 이미지 출력 이벤트
  const goToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % data.data.imageUrlList.length;
    setCurrentImageIndex(nextIndex);
  };
  //이전 이미지 출력
  const goToPreviousImage = () => {
    const previousIndex = (currentImageIndex - 1 + data.data.imageUrlList.length) % data.data.imageUrlList.length;
    setCurrentImageIndex(previousIndex);
  };

  const [postLike, setPostLike]: any = useRecoilState(likebyPostIdState(data.data.postId));
  const idData = {
    postId: data.data && data.data.postId,
    userId: data.data && data.data.userId,
  };
  const [userLike, setUserLike]: any = useRecoilState(likebyUserIdState(idData));
  if (userLike == null) {
    setIsVisible(!isVisible);
  }

  const [userId] = useRecoilState(userIdState);
  const followData: any = {
    followingId: userId,
    followerId: data.data.userId,
  };
  const [, setFollowing]: any = useRecoilState(followingState(followData));
  const [postId] = useRecoilState(postIdState); // 저정된 postId 가져오기

  // 댓글 목록 불러오기
  const [commentsLoadable, setCommentsLoadable] = useRecoilStateLoadable(commentState(postId));

  // commentsLoadable 비동기 상태 관리
  if (commentsLoadable.state === 'loading') {
    return <div>로딩 중...</div>;
  }

  if (commentsLoadable.state === 'hasError') {
    return <div>에러가 발생했습니다.</div>;
  }
  // commentsLoadable로 데이터를 받아온 걸 comments에 저장
  const comments: any = commentsLoadable.contents;
  const filteredComments = comments.filter((data: any) => data.origin_commentId === 'null');
  const commentsLength = filteredComments.length;

  return (
    <div>
      <div className="flex items-center my-3 mx-2">
        <div className="rounded-full overflow-hidden size-10">
          <img src="../../overdog_react/free-icon-cool-7298816.png"></img>
        </div>
        <div className="ml-2 text-[14px] font-bold">{data.data.userId}</div>
        {followVisible ? (
          <div className="ml-2 text-blue-400 text-[14px] " onClick={onClickFollow}>
            팔로우
          </div>
        ) : (
          <div className="ml-2 text-black text-[14px] " onClick={onClickFollow}>
            팔로우
          </div>
        )}
        <div className="ml-auto">
          <IoIosMore onClick={onOpenModal}></IoIosMore>
          {isModal && <ModalMenu onOpenModal={onOpenModal} />}
        </div>
      </div>
      <div className="relative">
        <img src={data.data.imageUrlList[currentImageIndex]} alt="컨텐츠 이미지" className="w-full h-72" />
        {!isAtFirstImage && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-1 text-4xl bg-white rounded-full opacity-70"
            onClick={goToPreviousImage}
          >
            <GrFormPrevious />
          </button>
        )}
        {!isAtLastImage && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-1 text-4xl bg-white rounded-full opacity-70"
            onClick={goToNextImage}
          >
            <MdOutlineNavigateNext />
          </button>
        )}
      </div>
      <div className="flex-row ml-3 mt-3">
        <div className="flex justify-between">
          <div className="text-[14px] my-1 font-semibold">좋아요 {postLike == null ? '0' : postLike.length}개</div>
          <div className="mx-2 text-[24px]" onClick={onClickLike}>
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
        <div className="text-[13px] text-gray-500 cursor-pointer hover:text-black w-fit " onClick={onClick}>
          댓글 {commentsLength}개 모두 보기
        </div>
        <div className="text-[13px] text-gray-500">{time(data.data.createdAt)}</div>
      </div>

      <BottomSheet
        open={isBottomSheetOpen}
        onDismiss={closeBottomSheet}
        snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight / 2, maxHeight]}
      >
        <Comment comments={comments} />
      </BottomSheet>
    </div>
  );
};
