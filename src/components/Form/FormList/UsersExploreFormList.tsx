import router from 'next/router';
import React, { memo, useState, VFC } from 'react';
import { SearchBox, Configure } from 'react-instantsearch-dom';
import { InstantSearch } from 'react-instantsearch-dom';
import { indexName, searchClient } from '../../../../lib/searchClient';
import { UserExplore } from '../../Explore/UsersExplore';

const UsersExploreFormList: VFC = () => {
  const [querystate, setQueryState] = useState();

  return (
    <>
      <InstantSearch
        indexName={indexName}
        searchClient={searchClient}
        onSearchStateChange={(state) => {
          setQueryState(state.query);
        }}
      >
        <Configure hitsPerPage={5} />

        <SearchBox
          onSubmit={(event) => {
            event.preventDefault();
            router.push(`/explore/users?userquery=${querystate}`);
          }}
          translations={{ placeholder: '氏名 ・ ユーザーID ・ ジャンル ・ 所在地検索' }}
          className="mt-2"
        />

        <UserExplore />
      </InstantSearch>
    </>
  );
};

export default memo(UsersExploreFormList);
