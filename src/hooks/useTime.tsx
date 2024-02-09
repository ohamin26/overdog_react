export const useTime = (data: any) => {
  // comments.createdAt.toDate()에서 얻은 Date 객체
  const date = data.createdAt.toDate();

  // 현재 시간을 얻기
  const currentDate: any = new Date();

  // 두 날짜 간의 차이 계산 (밀리초로 반환됨)
  const timeDifference = currentDate - date;

  // 차이를 분으로 변환
  const minutes = Math.floor(timeDifference / (1000 * 60));
  let time;
  if (minutes / 60 >= 24) {
    time = `${Math.floor(minutes / 60 / 24)} 일`;
  } else if (minutes >= 60) {
    time = `${Math.floor(minutes / 60)} 시간`;
  } else {
    time = `${minutes} 분`;
  }

  return time;
};
