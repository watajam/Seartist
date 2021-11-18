import React, { memo, useEffect, useState, VFC } from 'react';
import Link from 'next/link';
import { HiHome } from 'react-icons/hi';
import { HiOutlineHome } from 'react-icons/hi';
import { BiSearchAlt } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';
import { BiUserCircle } from 'react-icons/bi';
import { HiUserCircle } from 'react-icons/hi';
import { RiQuillPenLine } from 'react-icons/ri';
import { useRouter } from 'next/dist/client/router';
import { FormData } from '../../../types/FormData';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../../../lib/firebase';

const BottomNavigation: VFC = () => {
  const [user, setUser] = useState<Pick<FormData, 'userId' | 'genre'>>(null);
  const { userEmail } = useRecoilSetEmail();
  const router = useRouter();

  // ユーザー情報取得
  useEffect(() => {
    if (userEmail !== null) {
      const postsRef = doc(db, 'users', userEmail.email);
      const unsubscribe = onSnapshot(postsRef, (snapshot) => {
        setUser({
          userId: snapshot.data().userId,
          genre: snapshot.data().genre,
        });
      });
      return () => unsubscribe();
    }
  }, [userEmail, user]);

  return (
    <aside className="w-full fixed  bottom-0 z-10 bg-orange-400  md:static md:w-1/4   md:max-w-xs md:bg-orange-300 h-auto">
      <nav className="flex justify-around md:fixed  md:flex-col md:w-1/4   md:max-w-xs  md:justify-center ">
        <Link href="/posts">
          <a className="w-full text-center pt-2 pb-3 md:mt-4 md:flex md:items-center md:space-x-4 md:pl-8">
            {router.pathname === '/posts' ? (
              <HiHome className="w-7 h-7  text-white inline-block  mb-1" />
            ) : (
              <HiOutlineHome className="w-7 h-7  text-white inline-block  mb-1" />
            )}
            <span className="block text-sm text-white">ホーム</span>
          </a>
        </Link>

        <Link href="/explore">
          <a className="w-full text-center pt-2 pb-3 md:mt-4 md:flex md:items-center  md:space-x-4 md:pl-8">
            {router.pathname === '/explore' ? (
              <BiSearchAlt className="w-7 h-7 text-white inline-block  mb-1" />
            ) : (
              <BiSearch className="w-7 h-7 text-white inline-block  mb-1" />
            )}
            <span className="block text-sm text-white">検索</span>
          </a>
        </Link>

        <Link href={`/profile/${user?.userId}`}>
          <a className="w-full text-center pt-2 pb-3 md:mt-4 md:flex md:items-center  md:space-x-2 md:pl-8">
            {router.pathname === '/profile/[id]' ? (
              <HiUserCircle className="w-7 h-7 text-white inline-block  mb-1" />
            ) : (
              <BiUserCircle className="w-7 h-7 text-white inline-block  mb-1" />
            )}
            <span className="block text-sm text-white">プロフィール</span>
          </a>
        </Link>

        {user?.genre ? (
          <Link href="/posts/create">
            <a className="w-full text-center pt-2 pb-3 hidden  md:mt-4 md:flex md:items-center md:space-x-4 md:pl-8">
              {router.pathname === '/posts/create' ? (
                <RiQuillPenLine className="w-7 h-7 text-white inline-block  mb-1" />
              ) : (
                <RiQuillPenLine className="w-7 h-7 text-white inline-block  mb-1" />
              )}
              <span className="block text-sm text-white">投稿</span>
            </a>
          </Link>
        ) : null}
      </nav>
    </aside>
  );
};

export default memo(BottomNavigation);
