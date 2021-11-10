import React, { memo, useCallback, useEffect, useState, VFC } from "react";
import { HiUserCircle } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import { useRouter } from "next/dist/client/router";
import { useRecoilSetEmail } from "../../hooks/useRecoilSetEmail";
import { deleteDoc, doc, onSnapshot } from "@firebase/firestore";
import { db } from "../../../lib/firebase";
import { FormData } from "../../../types/FormData";
import PostDetailSkeletonLoadingItem from "../SkeletonLoading/PostDetailSkeletonLoadingItem";

const PostDetail: VFC = () => {
  const [post, setPost] =
    useState<
      Pick<
        FormData,
        | "writing"
        | "image"
        | "eventName"
        | "genre"
        | "eventDate"
        | "eventLocation"
        | "openTime"
        | "closeTime"
        | "minAmount"
        | "maxAmount"
        | "tickets"
        | "coupon"
        | "email"
      >
    >();
  const [user, setUser] = useState<Pick<FormData, "name">>(null);
  const { userEmail } = useRecoilSetEmail();
  const [postsLoading, setPostsLoading] = useState(true);
  const [userloading, setUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (userEmail !== null) {
      const postRef = doc(
        db,
        "users",
        userEmail.email,
        "posts",
        `${router.query.id}`
      );

      const unsubscribe = onSnapshot(postRef, (snapshot) => {
        setPost({
          writing: snapshot.data()?.writing,
          image: snapshot.data()?.image,
          eventName: snapshot.data()?.eventName,
          genre: snapshot.data()?.genre,
          eventDate: snapshot.data()?.eventDate,
          eventLocation: snapshot.data()?.eventLocation,
          openTime: snapshot.data()?.openTime,
          closeTime: snapshot.data()?.closeTime,
          minAmount: snapshot.data()?.minAmount,
          maxAmount: snapshot.data()?.maxAmount,
          tickets: snapshot.data()?.tickets,
          coupon: snapshot.data()?.coupon,
          email: snapshot.data()?.email,
        });
        setPostsLoading(false);
      });
      return () => unsubscribe();
    }
  }, [userEmail]);

  // ユーザー情報取得
  useEffect(() => {
    if (post?.email !== undefined) {
      const postsRef = doc(db, "users", `${post.email}`);
      const unsubscribe = onSnapshot(postsRef, (snapshot) => {
        setUser({
          name: snapshot.data()?.name,
        });
        setUserLoading(false);
      });
      return () => unsubscribe();
    }
  }, [post]);

  const deletePost = useCallback(async () => {
    if (post?.email !== undefined) {
      confirm("削除しますか？");
      await deleteDoc(
        doc(db, "users", `${post.email}`, "posts", `${router.query.id}`)
      );
      router.push("/posts");
    }
  }, [post]);

  if (postsLoading) {
    return <PostDetailSkeletonLoadingItem />;
  }
  if (userloading) {
    return <PostDetailSkeletonLoadingItem />;
  }

  if (user === null) {
    return <p>エラー</p>;
  }

  if (post === undefined) {
    return <p>エラー</p>;
  }

  return (
    <div>
      <div className=" flex  rounded-t-2xl items-center font-bold text-base ">
        <HiUserCircle className="w-8 h-8" />
        <h1 className="ml-2">{user?.name}</h1>
        <div className="ml-auto ">
          <FiHeart className="inline" />
          <span>200</span>
        </div>
      </div>

      <p className="text-base font-bold mt-4">{post?.writing}</p>
      <div className="bg-gray-200 text-center  h-48 mt-6">写真</div>

      <table className="table-fixed text-center text-base w-full mt-6">
        <tbody className="mt-2">
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left ">イベント名</th>
            <td className="border px-4 py-2 text-left break-words max-w-sm">
              {post?.eventName}
            </td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">ジャンル</th>
            <td className="border px-4 py-2 text-left">{post?.genre}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">開催日</th>
            <td className="border px-4 py-2 text-left">{post?.eventDate}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">開催場所</th>
            <td className="border px-4 py-2 text-left break-words max-w-sm">
              {post?.eventLocation}
            </td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">開催時間</th>
            <td className="border px-4 py-2 text-left">{`${post?.openTime}～${post?.closeTime}`}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">値段</th>
            <td className="border px-4 py-2 text-left">{`${post?.minAmount}～${post?.maxAmount}`}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">チケット</th>
            <td className="border px-4 py-2 text-left">{post?.tickets}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">クーポンコード</th>
            <td className="border px-4 py-2 text-left break-words max-w-sm">
              {post?.coupon}
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={deletePost}
        className="text-white font-bold block ml-auto mt-6 p-1 bg-red-500 hover:bg-red-600"
      >
        投稿を削除する
      </button>
    </div>
  );
};

export default memo(PostDetail);
