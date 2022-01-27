import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

const URL = "https://api.themoviedb.org/3/movie";
const KEY = process.env.NEXT_PUBLIC_KEY;

type DetailType = {
  original_title: string;
};

interface IdProps {
  params: string[];
}

const Id: FC<IdProps> = ({ params }) => {
  console.log(params);

  const [detail, setDetail] = useState<DetailType>();
  useEffect(() => {
    (async () => {
      if (!params) return;
      const data: DetailType = await (
        await fetch(`/api/movies/${params[1]}`)
      ).json();
      setDetail(data);
    })();
  }, [params]);

  if (!detail) return <h1>Loading...</h1>;
  return <div>{detail?.original_title}</div>;
};

export default Id;

//이 방법은 링크로 넘긴 쿼리를 또 라우터 객체를 안 뒤지고 받는 방식 으로 이해하면 될듯 하다
//seo 도 챙기고, render수도 줄이고, ssr 과는 크게 상관 없는 방식임
export const getServerSideProps = ({
  query: { params },
}: GetServerSidePropsContext) => {
  return {
    props: { params },
  };
};
