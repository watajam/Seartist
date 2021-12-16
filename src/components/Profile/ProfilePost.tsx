import React, { memo} from 'react';
import { useQueryProfilePosts } from '../../../FireBase/Query/Profile/useQueryProfilePosts';
import { useQueryProfileUserInfo } from '../../../FireBase/Query/Profile/useQueryProfileUserInfo';
import ListItem from '../Post/ListItem';
import SkeletonLoading from '../SkeletonLoading';

const ProfilePost = () => {
  const { user, userLoading } = useQueryProfileUserInfo();
  const { posts, postsLoading } = useQueryProfilePosts(user);

  if (postsLoading || userLoading) {
    return <SkeletonLoading />;
  }

  if (user === undefined || posts === undefined) {
    return <p>エラー</p>;
  }

  if (posts && posts.length === 0 && user) {
    return <p>まだ投稿がありません</p>;
  }
  return (
    <>
      <div className="grid gap-6 ">
        {posts.map((post) => {
          return <ListItem key={post.id} post={post} user={user} />;
        })}
      </div>
    </>
  );
};

export default memo(ProfilePost);
