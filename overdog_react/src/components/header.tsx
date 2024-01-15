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
      <div className="flex items-center mx-2 my-2">
        <div className="text-2xl" onClick={onClick}>
          <IoIosArrowBack></IoIosArrowBack>
        </div>
        <div className="ml-auto mr-auto font-bold">{location.pathname === '/' ? '게시물' : '댓글'}</div>
      </div>
      <hr />
    </div>
  );
};
