import { useState } from 'react';
import { FaRegLightbulb } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';

export const Notice = () => {
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const dummy = [
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...1',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...2',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...',
    },
    {
      title: '공지사항 제목입니다.',
      time: '1분전 작성',
      contents: '공지사항 내용...3',
    },
  ];
  const pageCount = Math.ceil(dummy.length / perPage);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  const offset = currentPage * perPage;
  const currentPageData = dummy.slice(offset, offset + perPage);
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/notice_detail');
  };
  return (
    <div>
      <div className="flex justify-center items-center w-full h-[15vh] mt-3">
        <div>
          <img src="../../public/free-icon-cool-7298816.png" width={55}></img>
          <span>overdog</span>
        </div>
      </div>
      {currentPageData.map((data) => (
        <div className="w-5/6 justify-center mx-auto mt-3 p-4 bg-white border border-gray-200 shadow">
          <div className="flex justify-between mb-4 border-b-2 pb-2">
            <div className="flex">
              <div className="text-[13px]">
                <FaRegLightbulb />
              </div>
              <span className="ml-1 text-[13px] font-bold leading-none text-gray-900 dark:text-white">
                {data.title}
              </span>
            </div>
            <span className="text-gray-500 text-[11px]">{data.time}</span>
          </div>
          <div>
            <div className="flex items-center">
              <div className="flex-1" onClick={onClick}>
                <p className="text-sm font-medium text-gray-900 truncate">{data.contents}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 페이지네이션 추가 */}
      <ReactPaginate
        pageClassName={'inline-block mx-1 p-2 rounded-full cursor-pointer  '}
        pageLinkClassName={
          'block w-8 h-8 leading-8 text-center border border-gray-300 bg-white rounded-full transition duration-300 ease-in-out hover:bg-gray-300'
        }
        containerClassName={'pagination flex justify-center my-2'}
        activeClassName={'bg-gray-300'}
        previousLabel={''}
        nextLabel={''}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
      />
    </div>
  );
};
