import { NextRouter, useRouter } from 'next/router';
import React, { memo } from 'react';
import { useQueryProfilePostsByUser } from '../../../FireBase/Query/Profile/useQueryProfilePostsByUser';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';
import { useFetch } from '../../hooks/useFetch';
import { useFetchArray } from '../../hooks/useFetchArray';
import PostListItem from '../Post/PostListItem';
import SkeletonLoading from '../SkeletonLoading';

type PostsByUser = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

//プロフィールに表示する投稿一覧
const ProfilePost = () => {
  const router = useRouter();
  const { queryUser, queryProfilePostsByUser } = useQueryProfilePostsByUser();
  const { data: user, error: userError } = useFetch<UserData, (router: NextRouter) => Promise<UserData>>(
    router.query.id ? [`firestore/users`, router.query.id] : null,
    () => queryUser(router)
  );

  const {
    data: postsByUser,
    error: postsByUserError,
    isLoading: postsByUserIsLoading,
    isEmpty: postsByUserIsEmpty,
  } = useFetchArray<PostsByUser, string, (user: any) => Promise<PostsByUser[]>>(
    user ? [`firestore/users/${user.email}/posts`, user.email, user.name, user.profilePhoto] : null,
    () => queryProfilePostsByUser(user)
  );

  if (!userError && postsByUserIsLoading) {
    return <SkeletonLoading />;
  }

  if (userError || postsByUserError) {
    return <p className="text-xl font-bold text-center">エラーが発生した為、データの取得に失敗しました。</p>;
  }

  if (postsByUserIsEmpty) {
    return <p className="text-xl font-bold text-center">投稿がありません</p>;
  }

  return (
    <>
      <div className="grid gap-6">
        {postsByUser?.map((postsByUser) => {
          return <PostListItem key={postsByUser.id} postsByUsers={postsByUser} />;
        })}
      </div>
    </>
  );
};

export default memo(ProfilePost);
