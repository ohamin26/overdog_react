import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router';
export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="flex mx-2 my-2 justify-between ">
        <div className="text-2xl" onClick={onClick}>
          <IoIosArrowBack></IoIosArrowBack>
        </div>
        <div className="font-semibold">
          {location.pathname === '/' ? '게시물' : location.pathname === '/comment' ? '댓글' : '공지사항'}
        </div>
        <div className="text-2xl text-white" onClick={onClick}>
          <IoIosArrowBack></IoIosArrowBack>
        </div>
      </div>
      <hr />
    </div>
  );
};
