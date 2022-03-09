import React, { memo, VFC } from 'react';
import PostDetailSkeletonLoadingItem from '../SkeletonLoading/PostDetailSkeletonLoadingItem';
import { useQueryPostByUserDetail } from '../../../FireBase/Query/Posts/useQueryPostByUserDetail';
import PostDetailListItem from './PostDetailListItem';
import { useRouter } from 'next/router';
import { useFetch } from '../../hooks/useFetch';
import { PostDetailData } from '../../../types/PostDetailData';
import { UserData } from '../../../types/UserData';

type PostByUser = Omit<PostDetailData, 'email'> & Pick<UserData, 'name' | 'profilePhoto' | 'email'>;

//投稿詳細画面
const PostDetail: VFC = () => {
  const { queryDetailPost, queryDetailPostByUser } = useQueryPostByUserDetail();
  const router = useRouter();

  const { data: post, error: postError } = useFetch<PostDetailData, (router) => Promise<PostDetailData>>(
    router.query.id ? [`firestore/posts`, router.query.id] : null,
    () => queryDetailPost(router.query.id)
  );

  const {
    data: postByUser,
    error: postByUserError,
    isLoading: PostByUserLoading,
  } = useFetch<PostByUser, (post: PostDetailData) => Promise<PostByUser>>(
    post && router.query.id ? [`firestore/users`, router.query.id] : null,
    () => queryDetailPostByUser(post)
  );

  if (!postError && PostByUserLoading) {
    return <PostDetailSkeletonLoadingItem />;
  }

  if (postError || postByUserError) {
    return <p className="text-xl font-bold text-center">エラーが発生した為、データの取得に失敗しました。</p>;
  }

  return <PostDetailListItem postByUser={postByUser} />;
};

export default memo(PostDetail);
