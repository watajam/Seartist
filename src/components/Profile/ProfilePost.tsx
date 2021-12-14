import React, { memo, VFC } from 'react';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';
import ListItem from '../Post/ListItem';
import SkeletonLoading from '../SkeletonLoading';

type Props = {
  posts: Omit<PostData, `email`>[];
  user: Pick<UserData, 'userId' | 'name' | 'image' | 'email'>;
  postsLoading: boolean;
  userLoading: boolean;
};

const ProfilePost: VFC<Props> = (props) => {
  if (props.postsLoading || props.userLoading) {
    return <SkeletonLoading />;
  }

  if (props.user === undefined || props.posts === undefined) {
    return <p>エラー</p>;
  }

  if (props.posts && props.posts.length === 0 && props.user) {
    return <p>まだ投稿がありません</p>;
  }
  return (
    <>
      <div className="grid gap-6 ">
        {props.posts.map((post) => {
          return <ListItem key={post.id} post={post} user={props.user} />;
        })}
      </div>
    </>
  );
};

export default memo(ProfilePost);
