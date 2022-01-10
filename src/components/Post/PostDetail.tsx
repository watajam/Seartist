import React, { memo, VFC } from 'react';
import PostDetailSkeletonLoadingItem from '../SkeletonLoading/PostDetailSkeletonLoadingItem';
import { useQueryPostByUserDetail } from '../../../FireBase/Query/Posts/useQueryPostByUserDetail';
import PostDetailListItem from './PostDetailListItem';

//投稿詳細画面
const PostDetail: VFC = () => {
  const { postByUser, postByUserLoading, error } = useQueryPostByUserDetail();

  if (postByUserLoading) {
    return <PostDetailSkeletonLoadingItem />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <PostDetailListItem  postByUser={postByUser} />
  
  );
};

export default memo(PostDetail);
