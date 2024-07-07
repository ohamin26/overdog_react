# 📺 반려동물 일상 고유 플랫폼 OVERDOG

## 프로젝트 소개

- 👍 오버독(OVERDOG)은 키우고 있는 사랑스러운 강아지와 강아지의 다양한 패션 아이템, 스타일, 일상들을 공유하여 다른 사용자들과 소통하고 정보를 나눌 수 있는 플랫폼입니다.
- 🐕 오버독(OVERDOG)는 flutter와 react, firebase를 사용해 서버리스로 제작되었습니다.

<br/>

### 데모영상과 이미지는 리액트로 제작된 부분에 대해서만 업로드되어있습니다.

<div align="center">
  
https://github.com/ohamin26/overdog_react/assets/113972482/4d2c6c38-1f12-4f6c-8762-33329fea4983



<img src="https://github.com/ohamin26/overdog_react/assets/113972482/443547f8-15e7-41a6-b85a-3583bbb30da5"> | <img src="https://github.com/ohamin26/overdog_react/assets/113972482/40827522-8423-4084-8aa2-13ad089c722d"> | <img src="https://github.com/ohamin26/overdog_react/assets/113972482/77914264-6d90-4fdc-b79d-4cb9f8ec98a8">
--- |  --- | --- |

<img src="https://github.com/ohamin26/overdog_react/assets/113972482/c4c1c4ca-389c-4861-93f6-b83a184658ec"> | <img src="https://github.com/ohamin26/overdog_react/assets/113972482/984c943a-9b33-4265-a5b0-edb5ed45bb45"> | ![project_detail](https://github.com/ohamin26/overdog_react/assets/113972482/0326504c-e30f-40e6-879b-22f504c58791)
--- | --- | --- |

</div>
<br>

## 팀원 구성

<div>

| **오하민** | 
| :------: |  
| [<img width="140px" src="https://avatars.githubusercontent.com/u/113972482?v=4" height=150 width=150> <br/> @ohamin26](https://github.com/ohamin26) | 

</div>

<br>

## 1. 개발 환경

- 개발 환경 중 제가 참여한 웹뷰(react) 부분에 대한 개발 환경 만을 정리하였습니다.
- 💻 **기술 스택** : TypeScript, React, TailwindCss, Recoil, firebase
- 📝 **버전 및 이슈 관리** : Github
- 🌐 **서비스 배포 환경** : Git-pages
- 👨🏻‍💻 **협업 툴 :** discord, notion
  
## 2. 채택한 개발 기술과 브랜치 전략

- **React**
    - 컴포넌트화를 통해 추후 유지 보수와 재사용성 부분에서 탁월한 React를 선택하였습니다.
- **TypeScript**
    - 보다 나은 개발자 경험과 불필요한 오류를 줄이기 위해 TypeScript를 선택하였습니다.
- **TailwindCSS**
    - 이번 프로젝트의 경우 웹뷰(react)부분은 1인 개발로 진행되었습니다.
    - 그렇기 때문에 별도의 변수 명이나 클래스 이름 지정 없이 사용 가능한
    - TailWindCSS를 선택하여 개발하였습니다.
- **Recoil**
    - 이번 프로젝트는 firebase를 활용한 서버리스로 제작되었습니다.
    - recoil의 경우 리액트 프로젝트에 최적화 되어 있는 라이브러리이고,
    - firebase의 경우 클라이언트에서만 상태를 관리하면 되기에
    - 간단한 문법으로 효율적으로 관리 가능하다 판단하여 선택하였습니다.
- **Firebase**
    - 오버독(OVERDOG) 프로젝트에서 제공하는 기능들은
    - 서버 없이 프론트에서 개발 가능한 기능들로 구성되어있습니다.
    - 그렇기 때문에 불필요한 서버 작업을 줄이고
    - 필요한 데이터 만을 관리하여 효율적으로 관리하기 위해 선택하였습니다.
- **Eslint, Prettier**
    - 일관된 코드를 작성하기 위해 도입하였습니다.
- **Github-actions**
    - CI/CD 구축를 위해 Github-actions를 도입하였습니다.

### 브랜치 전략

- Git-flow를 채택하였으며, main, dev, feat로 구분하여 진행하였습니다.
  - **main** 배포용으로 최종적으로 적용할 기능만을 합쳤습니다.
  - **dev** 모든 기능을 합치고 개발과 테스트 단계에 사용하는 브랜치 입니다.
  - **Feat** 개발을 효율적으로 진행하기 위해 기능 단위로 브랜치을 생성하여 dev 브랜치에 합치는 방식으로 진행하였습니다.

## 3. 프로젝트 구조

```
├── README.md
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc.json
├── pmpm-lock.json
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── index.html
├── .github/workflows
│    └── deploy.yml
├── public
├── styles
│    └── global.css
└── src
     ├── components
           ├── comment.tsx
           ├── comment_more.tsx
           ├── content_detail.tsx
           ├── header.tsx
           └── modal_menu.tsx
     ├── database
           └── firbase.tsx
     ├── routes
           └── introducePage.tsx
     ├── recoil/atoms
           ├── followState.tsx
           ├── likeState.tsx
           ├── postState.tsx
           └── userState.tsx
     ├── routes
           ├── content.tsx
           ├── notice.tsx
           ├── notice_detail.tsx
           ├── profile.tsx
           └── profile_content.tsx
     ├── utils
           ├── time.tsx
           └── timestamp.tsx
     ├── App.tsx
     ├── main.tsx
     └── vite-env.d.ts
           
```

<br>

## 4. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2024년 01월 07일 ~ 2024년 5월 7일


### 작업 관리

- Gihub를 통해 관리하였습니다.

## 5. 트러블 슈팅

- 오버독(OVERDOG)에서 제공하는 기능 중 댓글 기능을 제작해야 하는 부분이 있었습니다.
- 사용자 편의를 위해 해당 기능을 사용자 측면에서 새로고침을 하지 않아도
- 실시간으로 화면을 업데이트 해주는 실시간 업데이트 기능으로 구현하고자 하였습니다.
- 해당 기능의 경우 서버와의 소켓 통신을 통해 구현하는 경우가 보통이나
- 오버독(OVERDOG) 프로젝트의 경우 서버 리스로 제작되어 해당 기능을 구현하기에 어려움이 있었습니다.
- 저는 해당 이슈를 댓글 정보를 localStorage와 비동기 상태로 관리하는 것으로 해결하였습니다.
- firebase서버에서 주기적으로 댓글 정보를 불러오는 상태 관리 코드를 작성하였고,
- 해당 정보를 localStorage에 저장해 주고, localStorage에 저장된 값을 댓글 컴포넌트에서 주기적으로 불러와 사용자 입장에서는 실시간으로 화면이 업데이트 되는 것처럼 보이게 하여 소켓 통신을 하는 것과 같이 동작하게 하여 해당 이슈를 해결하였습니다.
