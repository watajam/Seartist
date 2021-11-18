import React, { memo, VFC } from 'react';
import SkeletonLoading from '../SkeletonLoading';
import ListItem from './ListItem';

type Props = {
  posts: {
    id: string;
    image: string;
    writing: string;
    eventName: string;
    genre: string;
    eventLocation: string;
    eventDate: string;
    openTime: string;
    closeTime: string;
  }[];
  user: {
    userId: string;
    name: string;
    image: string;
  };
  postsLoading: boolean;
  userLoading: boolean;
};

const PostProfile: VFC<Props> = (props) => {
  if (props.postsLoading) {
    return <SkeletonLoading />;
  }
  if (props.userLoading) {
    return <SkeletonLoading />;
  }

  if (props.user === null) {
    return <p>エラー</p>;
  }

  if (props.posts === []) {
    return <p>エラー</p>;
  }

  if (props.posts && props.posts.length === 0) {
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

export default memo(PostProfile);
