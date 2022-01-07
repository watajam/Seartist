import React, { memo, VFC } from 'react';
import PostDetailSkeletonLoadingItem from '../SkeletonLoading/PostDetailSkeletonLoadingItem';
import { useQueryPostByUserDetail } from '../../../FireBase/Query/Posts/useQueryPostByUserDetail';
import PostDetailItem from './PostDetailItem';

const PostDetail: VFC = () => {
  const { postByUser, postByUserLoading, error } = useQueryPostByUserDetail();

  if (postByUserLoading) {
    return <PostDetailSkeletonLoadingItem />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <PostDetailItem  postByUser={postByUser} />
  
  );
};

export default memo(PostDetail);
