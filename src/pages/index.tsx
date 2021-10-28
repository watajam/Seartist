import Link from "next/link";
import { VFC } from "react";

const Home: VFC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Link href="/login">
        <a className="inline-block text-base text-orange-200 underline cursor-pointer hover:text-orange-400 ">
          ログインページへ
        </a>
      </Link>
    </div>
  );
};

export default Home;
