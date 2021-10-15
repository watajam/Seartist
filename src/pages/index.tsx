import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Link href="/login">
        <a className="inline-block text-base text-orange-200 underline cursor-pointer hover:text-orange-400 ">
          ログインページへ
        </a>
      </Link>
    </div>
  );
};

export default Home;
