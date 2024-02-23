import { useLocation, useNavigate } from 'react-router';
import { PiSquaresFourLight } from 'react-icons/pi';
import { useRecoilStateLoadable } from 'recoil';
import { postByUserIdState } from '../recoil/atoms/postState';
//라우팅 추가해야함
export const Profile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [postLoadable] = useRecoilStateLoadable(postByUserIdState(state));
  if (postLoadable.state === 'loading') {
    return <div>로딩 중...</div>;
  }
  if (postLoadable.state === 'hasError') {
    return <div>에러가 발생했습니다.</div>;
  }
  const post: any = postLoadable.contents;
  return (
    <div>
      <div className="flex mx-2 my-2 justify-center ">
        <div className="mt-2">{state}</div>
      </div>
      <div className="top">
        <div className="flex mt-5 ml-3">
          <div className="rounded-full overflow-hidden size-24">
            <img src="../../overdog_react/free-icon-cool-7298816.png"></img>
          </div>
          <div className="flex flex-col ml-2 text-[15px]">
            <div className="font-semibold">{state} 님의 애완동물</div>
            <div className="flex mt-2">
              <div className="w-fit">
                <div className="rounded-full overflow-hidden size-10">
                  <img src="../../overdog_react/free-icon-cool-7298816.png"></img>
                </div>
                <div className="text-[11px] text-center">감자</div>
              </div>
              <div className="ml-2">
                <div className="rounded-full overflow-hidden size-10">
                  <img src="../../overdog_react/free-icon-cool-7298816.png"></img>
                </div>
                <div className="text-[11px] text-center">감자</div>
              </div>
              <div className="ml-2">
                <div className="rounded-full overflow-hidden size-10">
                  <img src="../../overdog_react/free-icon-cool-7298816.png"></img>
                </div>
                <div className="text-[11px] text-center">감자</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-3 my-2 ">
          <div className="font-semibold">{state}</div>
          <div className="text-[11px]">안녕하세요 ~감솜빠 패밀리입니다~</div>
        </div>
      </div>
      <hr className="mx-1" />
      <div className="middle">
        <div className="flex justify-between w-2/4 mx-auto my-2 text-[13px]">
          <div>
            <div className="font-semibold">게시물</div>
            <div className="text-center">{post.length}</div>
          </div>
          <div>
            <div className="font-semibold">팔로워</div>
            <div className="text-center">168</div>
          </div>
          <div>
            <div className="font-semibold">팔로잉</div>
            <div className="text-center">214</div>
          </div>
        </div>
        <div className="flex justify-center text-[20px] mb-2">
          <PiSquaresFourLight />
        </div>
      </div>
      <hr className="mx-1" />

      <div className="bottom">
        <div className="grid grid-cols-3 mx-1 mt-1">
          {post.map((data: any) => (
            <div key={data.postId} className="m-0 p-0">
              <img
                src={data.imageUrlList[0]}
                style={{
                  marginTop: '1px',
                  height: '110px',
                  width: '99%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                onClick={() => {
                  navigate('/', { state: data });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
