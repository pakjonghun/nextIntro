## 노마드코더 nextjs 인강 따라하기 입니다.

### start

npx create-next-app --typescript
처음ssr 이후csr(spa)
ssr : 처음부터 초기(init)상태의 html 이 출력됨(pre-render). 이후 백엔드에서 완성된 page 가 프론트 서버를 거쳐 브라우저에 전달되고 작동되기 시작함.

### page

- import React 없어도 됨.
- index가 있어야함.
- 404페이지가 자동으로 있음.

### masking

- redirect 를 허용하므로 이를 이용해서 브라우저에서 cdkey 를 숨길 수 있다.

```
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `${BASIC_URL}?api_key=${API_KEY}`,
      },
    ];
  },
```

### No Loading

- 데이터가 모두 받아진 다음에 랜더링이 되게 하려면 getServerSideProps 라는 이름으로 함수를 export 해주면된다.
- 이렇게 해도 cdkey 를 숨길 수 있다.

```
export async function getServerSideProps() {
  const API_KEY = process.env.NEXT_PUBLIC_KEY;
  const BASIC_URL = "https://api.themoviedb.org/3/movie/popular";

//url 은 이것도 가능하다 : http://localhost:3000/api/movies

  const res = await fetch(`${BASIC_URL}?api_key=${API_KEY}`);
  const { results }: { results: MovieType[] } = await res.json();
  return {
    props: {
      results,
    },
  };
}
```

-여기서 리턴된 props 는 그냥 프롭으로 받아 쓰면된다.

### 선택을 할 수 있는 폭이 넓어진다.

방법 1. CSR(빈 HTML + init State 만 띄우다가 Loading 도 띄워놓을 수 있음 선택사항 data 가 오면 다시 랜더링 할거냐?)

<!-- 방법 2. SPA(싱글 페이지에서 data 오기 전까지 Loading을 띄울 것인가) -->

방법 3. SSR 데이터까지 모두 받은 다음에 랜더링 시킬 것이냐(그 전까지는 흰 화면임.) : SEO 에 유리함

### 라우팅

- router.push 매서드와 Link 컴포넌트는 쿼리를 마스킹 하는 기능이 있다.

```
router.push(
                {
                  pathname: `/movies/${m.id}`,
                  query: {
                    title: m.title,
                  },
                },
                `/movies/${m.id}`
              )

              <Link
            as={`/movies/${m.id}`}
            href={{
              pathname: `/movies/${m.id}`,
              query: {
                title: m.title,
              },
            }}
          >
            <a>Link</a>
          </Link>
```

- 단순 쿼리로 데이터를 넘길 수도 있다

```
[...params].tsx 로 라우팅 타겟 파일명을 바꿔주면 router.query.params 가 배열로 변한다.

// "/"만큼 의 데이터가 배열로 받아짐.
// 넘어온 쿼리를 다시 useRouter 로 해서 접근해서 받아도 되지만
//그것보다 더 좋은 방식이 있다.


//이 방법은 링크로 넘긴 쿼리를 또 라우터 객체를 안 뒤지고 받는 방식 으로 이해하면 될듯 하다
//seo 도 챙기고, render수도 줄이고, ssr 과는 크게 상관 없는 방식임
export const getServerSideProps = ({
  query: { params },
}: GetServerSidePropsContext) => {
  return {
    props: { params },
  };
};


//만약 패치까지 하고 싶다면 getServerSideProps 함수에서 해주면되지만 그렇게까지 할 필요는 아직 없을것 같다.
```

### error 페이지 커스텀 : 파일명만 404.tsx 로 하면됨.
