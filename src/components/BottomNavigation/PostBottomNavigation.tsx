import React, { memo, VFC } from 'react';
import Link from 'next/link';
import { HiHome } from 'react-icons/hi';
import { HiOutlineHome } from 'react-icons/hi';
import { BiSearchAlt } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';
import { BiUserCircle } from 'react-icons/bi';
import { HiUserCircle } from 'react-icons/hi';
import { RiQuillPenLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { useQueryUserGenreCheckPassUserId } from '../../../FireBase/Query/User/useQueryUserGenreCheckPassUserId';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import { useFetchImmutable } from '../../hooks/useFetchImmutable';

//投稿ボタンを表示する場合のボトムナビゲーション
const PostBottomNavigation: VFC = () => {
  const { queryUserGenreCheckPassUserId } = useQueryUserGenreCheckPassUserId();
  const router = useRouter();
  const { userEmail } = useRecoilSetEmail();
  const { data: user } = useFetchImmutable(
    userEmail ? `firestore/users/${userEmail.email}` : null,
    queryUserGenreCheckPassUserId
  );

  const handlePreventDefault = (e: React.MouseEvent<HTMLAnchorElement>, url) => {
    if (user?.userId === undefined || router.pathname === url || router.query.id === url) {
      e.preventDefault();
    }
  };

  return (
    <aside className="fixed bottom-0 z-10 w-full h-auto bg-orange-400 md:static md:w-1/4 md:max-w-xs md:bg-orange-300">
      <nav className="flex justify-around md:fixed md:flex-col md:justify-center md:w-1/4 md:max-w-xs">
        <Link href="/posts">
          <a
            onClick={(e) => handlePreventDefault(e, '/posts')}
            className="pt-2 pb-3 w-full text-center md:flex md:items-center md:pl-8 md:mt-4 md:space-x-4"
          >
            {router.pathname === '/posts' ? (
              <HiHome className="inline-block mb-1 w-7 h-7 text-white" />
            ) : (
              <HiOutlineHome className="inline-block mb-1 w-7 h-7 text-white" />
            )}
            <span className="block text-sm text-white">ホーム</span>
          </a>
        </Link>

        <Link href="/explore">
          <a
            onClick={(e) => handlePreventDefault(e, '/explore')}
            className="pt-2 pb-3 w-full text-center md:flex md:items-center md:pl-8 md:mt-4 md:space-x-4"
          >
            {router.pathname === '/explore' ? (
              <BiSearchAlt className="inline-block mb-1 w-7 h-7 text-white" />
            ) : (
              <BiSearch className="inline-block mb-1 w-7 h-7 text-white" />
            )}
            <span className="block text-sm text-white">検索</span>
          </a>
        </Link>

        <Link href={`/profile/${user?.userId}`}>
          <a
            onClick={(e) => handlePreventDefault(e, user?.userId)}
            className="pt-2 pb-3 w-full text-center md:flex md:items-center md:pl-8 md:mt-4 md:space-x-2"
          >
            {router.pathname === '/profile/[id]' ? (
              <HiUserCircle className="inline-block mb-1 w-7 h-7 text-white" />
            ) : (
              <BiUserCircle className="inline-block mb-1 w-7 h-7 text-white" />
            )}
            <span className="block text-sm text-white">プロフィール</span>
          </a>
        </Link>
        {user?.genre ? (
          <>
            <Link href="/posts/create">
              <a
                onClick={(e) => handlePreventDefault(e, '/posts/create')}
                className="hidden pt-2 pb-3 w-full text-center md:flex md:items-center md:pl-8 md:mt-4 md:space-x-4"
              >
                {router.pathname === '/posts/create' ? (
                  <RiQuillPenLine className="inline-block mb-1 w-7 h-7 text-white" />
                ) : (
                  <RiQuillPenLine className="inline-block mb-1 w-7 h-7 text-white" />
                )}
                <span className="block text-sm text-white">投稿</span>
              </a>
            </Link>
          </>
        ) : null}
      </nav>
      {user?.genre ? (
        <>
          <Link href="/posts/create">
            <a
              onClick={(e) => handlePreventDefault(e, '/posts/create')}
              className="fixed right-4 bottom-20 p-4 bg-orange-400 rounded-full md:hidden"
            >
              <RiQuillPenLine className="w-6 h-6 text-white" />
            </a>
          </Link>
        </>
      ) : null}
    </aside>
  );
};

export default memo(PostBottomNavigation);
