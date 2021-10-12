import { signInWithPopup } from "@firebase/auth";
import { useRouter } from "next/dist/client/router";
import React, { memo } from "react";

import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../../../lib/firebase";

//Googleログイン
const GoogleLogin = () => {
  const router = useRouter();

  //Googleログイン
  const googleLogin = async () => {
    await signInWithPopup(auth, provider)
      .then(() => {
        router.push(`/`);
      })
      .catch((error) => {
        alert("ログインできません。")
      });
  };

  return (
    <button
      onClick={googleLogin}
      className="border border-gray-400  pl-2 w-full mt-4 py-3 font-bold  rounded-xl flex justify-center  hover:bg-gray-100 "
    >
      <FcGoogle className="text-2xl" />
      <span className="pl-2 text-2xl text-gray-400 ">Googleでログイン</span>
    </button>
  );
};

export default memo(GoogleLogin);
