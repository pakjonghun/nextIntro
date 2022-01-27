import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

const PATHS = {
  ["/" as string]: "HOME",
  "/about": "ABOUT",
};
// "https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1";

const Layout: React.FC = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{PATHS[router.pathname]}</title>
      </Head>
      <NavBar />
      {children}
    </>
  );
};

export default Layout;
