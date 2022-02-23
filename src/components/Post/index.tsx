import React, { memo, VFC } from 'react';
import { useQueryUserEmailCheck } from '../../../FireBase/Query/User/useQueryUserEmailCheck';
import PostListItem from './PostListItem';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import SkeletonLoading from '../SkeletonLoading';
import { useFetchArray } from '../../hooks/useFetchArray';
import { useQueryPostsByUsers } from '../../../FireBase/Query/Posts/useQueryPostsByUsers';

//ホーム画面一覧
const Post: VFC = () => {
  const { queryPostsByFollowings, queryPostsByUsers } = useQueryPostsByUsers();
  const { userEmail } = useRecoilSetEmail();
  useQueryUserEmailCheck();

  const {
    data: posts,
    error: postsError,
    isEmpty: postsIsEmpty,
  } = useFetchArray(userEmail ? `firestore/users/${userEmail.email}/postsByFollowing` : null, queryPostsByFollowings);

  const {
    data: postsByUsers,
    error: postsByUsersError,
    isLoading: postsByUsersIsLoading,
    isEmpty: postsByUsersIsEmpty,
  } = useFetchArray(posts ? `firestore/users` : null, () => queryPostsByUsers(posts));

  if (!postsError && postsByUsersIsLoading) {
    return <SkeletonLoading />;
  }

  if (postsError || postsByUsersError) {
    return <p className="text-xl font-bold text-center">エラーが発生した為、データの取得に失敗しました。</p>;
  }

  if (postsByUsersIsEmpty || postsIsEmpty) {
    return <p className="text-xl font-bold text-center">フォローしているユーザーの投稿がありません</p>;
  }

  return (
    <div className="grid gap-6 md:max-w-xl lg:max-w-2xl">
      {postsByUsers?.map((postByUser) => {
        return <PostListItem key={postByUser.id} postsByUsers={postByUser} />;
      })}
    </div>
  );
};

export default memo(Post);
