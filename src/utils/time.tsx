export const time = (createdAt: any) => {
  // 주어진 날짜를 Date 객체로 변환
  const createdDate: any = new Date(createdAt);
  // 현재 날짜를 가져오기
  const currentDate: any = new Date();

  // 두 날짜 간의 차이 계산 (밀리초로 반환)
  const timeDiff = currentDate - createdDate;

  // 밀리초를 일로 변환하여 소수점 이하를 버림
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff < 1 ? '오늘' : `${daysDiff}일 전`;
};
