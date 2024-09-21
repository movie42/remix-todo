# 테크트리

항상 서버, db를 개발 할 때 난항을 겪는다. 그게 만들기 어려워서라기 보다 간단한 앱을 개발하는데도 클라이언트와 서버를 나눠야하고 시간도 오래걸린다. 나눠서 개발 후에 배포도 고민이 된다. 이번에는 그 유명한 full-stack frame work를 사용해서 간단한 어플리케이션을 만들고 vercel로 배포를 해보려고 한다. vercel의 대안이 있는지도 찾아보자.

## 기술 스텍

```
nodejs 20.16.0
remix 2.12.0
supabase 2.45.4
tailwind css
```

### Remix

remix를 선택한 이유는 fullstack framework이기 때문이었고 (next, svelt-kit등 종류가 많다.) server component 개념을 완전 적용한건 아니라고 들었기 때문이다. 그리고 ssr이 아니라고.....???하던데 알아봐야한다. 사실 아직 remix가 nextjs와 비교해서 어떤 점이 다르고 어떤 점이 좋은지는 모른다. 실무에서 nextjs를 사용해본적이 없고 블로그 만들때 편해서 사용해본 경험이 전부다.

- [Remix Guide](https://remix.guide)

현재까지 remix를 사용하면서 느낀건 loader, action으로 get, post를 처리할 수 있었다. action 함수 만들다가 물음표가 떴던것이 있었다. fsd를 아키텍쳐로 가져가고 싶어서 features에 CreateTodoForm을 만들었는데 이 ui에 action 함수를 만들어서 post를 진행했다. 그런데 계속 사용할수 없는 메서드라는 400대 에러가 발생해서 한참을 삽질을 했다. 그러다 문득 action이나 loader는 무조건 routes에 있어야하나? 하고 그쪽으로 옮겼더니 정상적으로 동작을 했다.

일단 CRUD를 해보면서 전체적으로 remix가 어떻게 동작하는지 알아볼 예정이다.

그럼 한 페이지 내부에서 ui는 컴포넌트로 분리할 수 있다 치지만 put이나 delete는 어떻게 나누나? 궁금해졌다.

- [x] 수정, 삭제 개발할때 찾아보기

#### Route Module

**action, loader**는 route module이라 routes 내부에서 그것도 route 컴포넌트 내부에서만 동작한다.

```
app/routes/todo._index
├── CreateTodoForm.tsx
├── route.tsx
└── TodoList.tsx
```

예를들어 todo.\_index는 Remix의 route 규칙에 따라 route.tsx만 route 컴포넌트로 랜더링이 된다. 나머지 CreateTodoForm, TodoList는 route가 아니기 때문에 이 컴포넌트 안에 action이나 loader 함수를 넣으면 동작하지 않게 된다.

그럼 action, loader는 컴포넌트를 따로 분리해서 사용할수 없나? [그렇지 않은 것 같다.](https://github.com/rajeshdavidbabu/remix-supabase-social) 여기에서는 resource를 앞에 붙여서 서버 호출을 하고 있다.

routes를 이용하면 된다. 예를들어 server측 호출을 위한 컴포넌트는 따로 만들었다. 예를 들어 api.todo.create는 todo를 만들기 위한 api이다. 왜 이렇게 만들었냐면 update와 구분할수가 없기 때문이다. Rest API스럽지 않아보인다.

그리고 난 뒤 호출하고자 하는 컴포넌트에서 useFetcher를 통해 fetcher.submit을 사용하면 create, delete를 호출할 수 있다.

##### 불편했던거

- action, loader api 모듈화가 너무 힘들다. NestJs 정도의 무언가를 바라는건 아니지만 적어도 뭔가 api.create.post 이렇게 하면 뭔가 post는 사라지고 /api/create만 남는다던가 아니면 api만 따로 모듈화 할수 있는 방법이 있었으면 좋겠다.

- [] 더 잘 쓸수 있는 방법 찾아보기

- nested 폴더를 허용해주면 좋겠다.(라이브러리가 있다고 하는데) 이게 허용 안된는거 진짜 구리다.(내가 되는줄 알고 몇분동안 삽질해서 구리다고 하는건 아니다.) remix에서 뭘 하려는 건지 알겠는데 그래도 todo는 todo로 묶을 수 있게 해주면 안되나?

### TailWind CSS

tailwind css를 선택한건 별다른 이유 없다. nextjs가 유명해지면서 함께 유명세를 타고 있는 라이브러리고 css-in-js를 nextjs에서 사용하기 위해 많은 세팅을 해야했던 고통때문에 간단한 어플을 만들어보는데 굳이 그 세팅을 또해야할까? remix에서는 또 얼마나 무시무시한 세팅을 해줘야할까 하는 생각에 선택하게 되었다.
사용해보니 css-in-js에 너무 익숙해져있어서 그런지 className에 클레스 name으로 스타일을 넣는게 힘들다. 그래서 ui는 shadcn/ui를 사용하려고 한다.

### Supabase

supabase는 auth를 내가 코딩하지 않아도 된다고 해서 선택했다. 선택하길 잘했다. 앞으로 supabase 많이 쓸것같다. 그동안 백엔드 공부 약간 해놓은게 supabase에 더 익숙해지게 한것 같다.

## 앱을 개발하면서 참고한 자료들

### remix.run

- [Remix.run V2 Full Stack Tutorial 2023 | Crash course](https://youtu.be/Z_33-pco_aA?si=Xa2mqn5eCLemjnC8)
  - 리믹스로 어떻게 fullstack web application을 만들 수 있을까? remix의 동작 방법과 loader에 대해서 간단하게 익히고 싶다면 간단하게 컨셉을 익혀보자.

### supabase

아래 자료는 remix에서 supabase를 사용해 authentication을 구현하는데 많은 도움을 주었다. 하지만 아래 동영상 자료에서 나오는 auth-helpers-remix는 ssr로 대체할 것을 권장하고 있다. [마이그레이션 방법](https://supabase.com/docs/guides/auth/server-side/migrating-to-ssr-from-auth-helpers?queryGroups=framework&framework=remix)은 그렇게 어렵지 않다.

- [Remix Databases and Auth](https://www.youtube.com/watch?v=Viaed7XWCY8)
- [Build a Realtime Chat App with Remix and Supabase](https://egghead.io/courses/build-a-realtime-chat-app-with-remix-and-supabase-d36e2618)

## 앱

할 수만 있다면 구독형 결제 앱을 만들어 보고 싶다. 아니면 후원으로 가고 싶기도 하고 광고를 넣어야하나 생각이 들기도 하고 비즈니스 모델 고민도 해볼 예정이다. 그전에 사용자가 모여야...
