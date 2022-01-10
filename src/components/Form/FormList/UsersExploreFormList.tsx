import React, { memo, VFC } from 'react';
import { SearchBox, Configure } from 'react-instantsearch-dom';
import { InstantSearch } from 'react-instantsearch-dom';
import { indexName, searchClient } from '../../../../lib/searchClient';
import { UserExplore } from '../../Explore/UsersExplore';

//ユーザー検索フォーム
const UsersExploreFormList: VFC = () => {
  return (
    <>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Configure hitsPerPage={5} />

        <SearchBox translations={{ placeholder: '氏名 ・ ユーザーID ・ ジャンル ・ 所在地' }} className="mt-2" />

        <UserExplore />
      </InstantSearch>
    </>
  );
};

export default memo(UsersExploreFormList);
