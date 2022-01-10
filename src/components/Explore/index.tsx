import React, { memo, VFC } from 'react';
import FormProfileTitle from '../Form/FormProfileTitle';
import UsersExploreFormList from '../Form/FormList/UsersExploreFormList';
import PostsExploreFormList from '../Form/FormList/PostsExploreFormList';

//各検索フォームのリスト
const ExploreForm: VFC = () => {
  return (
    <>
      <FormProfileTitle title="検索" />
      <h2 className=" text-base text-gray-400 mt-10 underline">ユーザーを検索</h2>
      {/* ユーザー検索フォーム */}
      <UsersExploreFormList />
      {/* 投稿検索フォーム */}
      <PostsExploreFormList />
    </>
  );
};

export default memo(ExploreForm);
