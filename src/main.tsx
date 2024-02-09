/*
  ***페이지 구성***
  게시판 자세히 보기
  댓글
  icons : 
    좋아요 : import { CiHeart } from "react-icons/ci";
    댓글 : import { FaRegComment } from "react-icons/fa6";
    북마크 : import { IoBookmarkOutline } from "react-icons/io5";
    화살표 : 
      왼쪽 : import { IoIosArrowBack } from "react-icons/io";
    더보기 : import { IoIosMore } from "react-icons/io";
*/

import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '../styles/global.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
  <App />,
  //</React.StrictMode>,
);
