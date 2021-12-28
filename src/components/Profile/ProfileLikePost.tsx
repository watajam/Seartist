import React, { memo } from 'react';
import { useQueryProfileLikesPostsUsers } from '../../../FireBase/Query/Profile/useQueryProfileLikesPostsUsers';
import PostListItem from '../Post/PostListItem';
import SkeletonLoading from '../SkeletonLoading';

const ProfileLikePost = () => {
  const { posts, users, loading } = useQueryProfileLikesPostsUsers();

    if (loading || posts?.length === 0) {
      return <SkeletonLoading />;
    }

  if (users === undefined || posts === undefined) {
    return <p>エラー</p>;
  }

  if (posts === null || users === null) {
    return <p>いいねした投稿がありません。</p>;
  }

  return (
    <>
      <div className="grid gap-6 ">
        {posts?.map((post, index) => {
          return <PostListItem key={post.id} post={post} user={users[index]} />;
        })}
      </div>
    </>
  );
};

export default memo(ProfileLikePost);
