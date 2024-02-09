import { FaRegLightbulb } from 'react-icons/fa';

export const NoticeDetail = () => {
  return (
    <div>
      <div className="flex justify-center items-center w-full h-[15vh] mt-3">
        <div>
          <img src="../../public/free-icon-cool-7298816.png" width={55}></img>
          <span>overdog</span>
        </div>
      </div>
      <div className="w-5/6 justify-center mx-auto mt-3 p-4 bg-white border border-gray-200 shadow">
        <div className="flex justify-between mb-4 border-b-2 pb-2">
          <div className="flex">
            <div className="text-[13px]">
              <FaRegLightbulb />
            </div>
            <span className="ml-1 text-[13px] font-bold leading-none text-gray-900 dark:text-white">공지사항 제목</span>
          </div>
          <span className="text-gray-500 text-[11px]">1분전 작성</span>
        </div>
        <div>
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 w-full h-[30vh]">공지사항 내용</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
