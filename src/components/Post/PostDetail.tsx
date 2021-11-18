import React, { memo, useCallback, useEffect, useState, VFC } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { FiHeart } from 'react-icons/fi';
import { useRouter } from 'next/dist/client/router';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import { deleteDoc, doc, onSnapshot } from '@firebase/firestore';
import { auth, db } from '../../../lib/firebase';
import { FormData } from '../../../types/FormData';
import PostDetailSkeletonLoadingItem from '../SkeletonLoading/PostDetailSkeletonLoadingItem';

const PostDetail: VFC = () => {
  const [post, setPost] =
    useState<
      Pick<
        FormData,
        | 'writing'
        | 'image'
        | 'eventName'
        | 'genre'
        | 'location'
        | 'eventDate'
        | 'eventLocation'
        | 'openTime'
        | 'closeTime'
        | 'minAmount'
        | 'maxAmount'
        | 'tickets'
        | 'coupon'
        | 'email'
      >
    >();
  const [user, setUser] = useState<Pick<FormData, 'image' | 'name'>>(null);
  const { userEmail } = useRecoilSetEmail();
  const [postsLoading, setPostsLoading] = useState(true);
  const [userloading, setUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (userEmail !== null) {
      const postRef = doc(db, 'users', userEmail.email, 'posts', `${router.query.id}`);

      const unsubscribe = onSnapshot(postRef, (snapshot) => {
        setPost({
          writing: snapshot.data()?.writing,
          image: snapshot.data()?.image,
          eventName: snapshot.data()?.eventName,
          genre: snapshot.data()?.genre,
          location: snapshot.data()?.location,
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
      const postsRef = doc(db, 'users', `${post.email}`);
      const unsubscribe = onSnapshot(postsRef, (snapshot) => {
        setUser({
          image: snapshot.data()?.image,
          name: snapshot.data()?.name,
        });
        setUserLoading(false);
      });
      return () => unsubscribe();
    }
  }, [post]);

  const deletePost = useCallback(async () => {
    if (confirm('削除しますか？')) {
      await deleteDoc(doc(db, 'users', auth.currentUser.email, 'posts', `${router.query.id}`));
      router.push('/posts');
    }
  }, []);

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
        {user?.image !== '' ? (
          <img src={user?.image} className="w-8 h-8 rounded-full" />
        ) : (
          <HiUserCircle className="w-8 h-8" />
        )}
        <h1 className="ml-2">{user?.name}</h1>
        <div className="ml-auto ">
          <FiHeart className="inline" />
          <span>200</span>
        </div>
      </div>

      <p className="text-base font-bold mt-4">{post?.writing}</p>
      {post?.image !== '' ? (
        <div className="flex justify-center  h-80 mt-6  outline-none  rounded-2xl bg-gray-100 ">
          <img src={post?.image} className="text-center object-contain " />
        </div>
      ) : null}

      <table className="table-fixed text-center text-base w-full mt-6">
        <tbody className="mt-2">
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left ">イベント名</th>
            <td className="border px-4 py-2 text-left break-words max-w-sm">{post?.eventName}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">ジャンル</th>
            <td className="border px-4 py-2 text-left">{post?.genre}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">都道府県</th>
            <td className="border px-4 py-2 text-left">{post?.location}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">開催日</th>
            <td className="border px-4 py-2 text-left">{post?.eventDate}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">開催場所</th>
            <td className="border px-4 py-2 text-left break-words max-w-sm">{post?.eventLocation}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">開催時間</th>
            <td className="border px-4 py-2 text-left">{`${post?.openTime}～${post?.closeTime}`}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">値段</th>
            <td className="border px-4 py-2 text-left">
              {post?.minAmount}～{post?.maxAmount}
            </td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left">チケット</th>
            <td className="border px-4 py-2 text-left">{post?.tickets}</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">クーポンコード</th>
            <td className="border px-4 py-2 text-left break-words max-w-sm">{post?.coupon}</td>
          </tr>
        </tbody>
      </table>
      {userEmail.email === post?.email ? (
        <button
          onClick={deletePost}
          className="text-white font-bold block ml-auto mt-6 p-1 bg-red-500 hover:bg-red-600"
        >
          投稿を削除する
        </button>
      ) : null}
    </div>
  );
};

export default memo(PostDetail);
