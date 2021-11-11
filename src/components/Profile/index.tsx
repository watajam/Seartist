import React, { memo, useEffect, useState, VFC } from "react";

import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import Post from "../Post";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { db } from "../../../lib/firebase";
import { useRouter } from "next/dist/client/router";
import { FormData } from "../../../types/FormData";
import { useRecoilSetEmail } from "../../hooks/useRecoilSetEmail";
import ProfileUser from "./ProfileUser";

const Profile: VFC = () => {
  const [user, setUser] =
    useState<
      Pick<
        FormData,
        | "name"
        | "userId"
        | "genre"
        | "location"
        | "birthday"
        | "writing"
        | "image"
        | "twitterUrl"
        | "instagramUrl"
        | "homepageUrl"
        | "otherUrl"
        | "email"
      >
    >(null);
  const [chengePage, setChengePage] = useState(true);
  const { userEmail } = useRecoilSetEmail();
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  const handleChengePage = () => {
    setChengePage((prevChengePage) => {
      return !prevChengePage;
    });
  };

  useEffect(() => {
    const userRef = collection(db, "users");
    if (router.query.id !== "undefined") {
      const q = query(userRef, where("userId", "==", `${router.query.id}`));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setUser({
          name: snapshot.docs[0].data().name,
          userId: snapshot.docs[0].data().userId,
          genre: snapshot.docs[0].data().genre,
          location: snapshot.docs[0].data().location,
          birthday: snapshot.docs[0].data().birthday,
          writing: snapshot.docs[0].data().writing,
          image: snapshot.docs[0].data().image,
          twitterUrl: snapshot.docs[0].data().twitterUrl,
          instagramUrl: snapshot.docs[0].data().instagramUrl,
          homepageUrl: snapshot.docs[0].data().homepageUrl,
          otherUrl: snapshot.docs[0].data().otherUrl,
          email: snapshot.docs[0].data().email,
        });
        setUserLoading(false);
      });
      return () => unsubscribe();
    }
  }, [router.query.id]);



  return (
    <>
      <div className="px-5">
        <ProfileUser
          user={user}
          userEmail={userEmail}
          userLoading={userLoading}
        />
      </div>

      {/* タブ */}
      <div className="mt-6 flex">
        {user?.genre ? (
          <>
            <button
              className={`w-2/4 flex justify-center border-b-2 pb-2 ${
                chengePage ? "border-orange-400" : "border-gray-400"
              }   `}
              onClick={handleChengePage}
              disabled={chengePage}
            >
              <AiOutlineEye
                className={`w-6 h-6 ${
                  chengePage ? "text-orange-400" : "text-gray-400 "
                }   `}
              />
            </button>

            <button
              className={`w-2/4 flex justify-center border-b-2 pb-2 ${
                chengePage ? "border-gray-400" : " border-orange-400"
              }   `}
              onClick={handleChengePage}
              disabled={!chengePage}
            >
              <AiOutlineHeart
                className={`w-6 h-6 ${
                  chengePage ? "text-gray-400 " : "text-orange-400  "
                }  `}
              />
            </button>
          </>
        ) : null}
        {user?.genre === "" ? (
          <>
            <button
              className="w-full flex justify-center border-b-2 pb-2
            border-orange-400"
            >
              <AiOutlineHeart className="w-6 h-6 text-orange-400" />
            </button>
          </>
        ) : null}
      </div>
      <div className="px-5 mt-4">
        <Post />
      </div>
    </>
  );
};

export default memo(Profile);
