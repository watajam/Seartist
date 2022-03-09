import { NextRouter, useRouter } from 'next/router';
import React, { memo } from 'react';
import { useQueryProfileLikesPostsByUsers } from '../../../FireBase/Query/Profile/useQueryProfileLikesPostsByUsers';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';
import { useFetch } from '../../hooks/useFetch';
import { useFetchArray } from '../../hooks/useFetchArray';
import PostListItem from '../Post/PostListItem';
import SkeletonLoading from '../SkeletonLoading';

type PostsByUsers = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

//プロフィールに表示するいいねした投稿一覧
const ProfileLikePost = () => {
  const { queryUser, queryProfileLikedPostsByUsers, queryUsersByLikedPosts } = useQueryProfileLikesPostsByUsers();
  const router = useRouter();

  const { data: user, error: userError } = useFetch<UserData, (router: NextRouter) => Promise<UserData>>(
    router.query.id ? [`firestore/users`, router.query.id] : null,
    () => queryUser(router)
  );

  const {
    data: likedPosts,
    error: likedPostsError,
    isEmpty: likedPostsIsEmpty,
  } = useFetchArray<PostData, undefined, (email: string) => Promise<PostData[]>>(
    user ? `firestore/users/${user.email}/likedPosts` : null,
    () => queryProfileLikedPostsByUsers(user.email)
  );

  const {
    data: usersByLikedPosts,
    error: usersByLikedPostsError,
    isLoading: usersByLikedPostsIsLoading,
    isEmpty: usersByLikedPostsIsEmpty,
  } = useFetchArray<PostsByUsers, string, (likedPosts: PostData[]) => Promise<PostsByUsers[]>>(
    likedPosts && user ? [`firestore/users`, user.email] : null,
    () => queryUsersByLikedPosts(likedPosts)
  );

  if (!userError && !likedPostsError && usersByLikedPostsIsLoading) {
    return <SkeletonLoading />;
  }

  if (userError || likedPostsError || usersByLikedPostsError) {
    return <p className="text-xl font-bold text-center">エラーが発生した為、データの取得に失敗しました。</p>;
  }

  if (likedPostsIsEmpty || usersByLikedPostsIsEmpty) {
    return <p className="text-xl font-bold text-center">いいねした投稿がありません</p>;
  }

  return (
    <>
      <div className="grid gap-6 ">
        {usersByLikedPosts?.map((postByUser) => {
          return <PostListItem key={postByUser.id} postsByUsers={postByUser} />;
        })}
      </div>
    </>
  );
};

export default memo(ProfileLikePost);
