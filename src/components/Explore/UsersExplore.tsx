import { Hit } from '@algolia/client-search';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { IoLocationSharp } from 'react-icons/io5';
import { Hits, connectSearchBox, Pagination, Highlight, PoweredBy } from 'react-instantsearch-dom';

type HitDoc = {
  name: string;
  userId: string;
  genre: string;
  location: string;
  profilePhoto: string;
};

type Props = {
  hit: Hit<HitDoc>;
};

type HitComponentProps = Props & {
  onClick: () => void;
};

//ユーザーを検索した時のヒットリスト
const HitComponent = ({ hit, onClick }: HitComponentProps) => {
  return (
    <>
      <Link href={`profile/${hit.userId}`}>
        <a className="items-center w-full text-base font-bold text-left" onClick={onClick}>
          <div className="flex justify-center">
            <Highlight attribute={`name`} hit={hit} className="text-xl " />
          </div>

          <div className="flex flex-wrap justify-center items-center mt-2">
            <span className="mr-1 text-orange-200">@</span>
            <Highlight attribute={`userId`} hit={hit} className="mr-2" />
            <span className="text-orange-200">
              <AiFillStar className="mr-1" />
            </span>
            <Highlight attribute={`genre`} hit={hit} className="mr-2" />
            <span className="text-orange-200">
              <IoLocationSharp className="mr-1" />
            </span>
            <Highlight attribute={`location`} hit={hit} />
          </div>
        </a>
      </Link>
    </>
  );
};

export const UserExplore = connectSearchBox(({ refine, currentRefinement }) => {
  const [isShow, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(!!currentRefinement);
  }, [currentRefinement]);

  const handleResetSearchWords = useCallback(() => {
    refine('');
  }, [refine]);

  const hitComponent = ({ hit }: Props): JSX.Element => <HitComponent hit={hit} onClick={handleResetSearchWords} />;

  if (!isShow) return null;
  return (
    <div className="px-5 pt-1 pb-5 rounded-b-2xl shadow">
      <p className="mt-5 mb-2 text-base font-semibold tracking-wider text-gray-500">ユーザー一覧</p>
      <Hits hitComponent={hitComponent} />
      <Pagination />
      <PoweredBy />
    </div>
  );
});
