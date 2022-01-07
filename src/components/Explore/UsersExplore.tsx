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

const HitComponent = ({ hit, onClick }: HitComponentProps) => {
  return (
    <>
      <Link href={`profile/${hit.userId}`}>
        <a className="text-left   items-center font-bold text-base w-full" onClick={onClick}>
          <div className="flex justify-center">
            <Highlight attribute={`name`} hit={hit} className="text-xl " />
          </div>

          <div className="flex items-center mt-2 justify-center flex-wrap">
            <span className="text-orange-200 mr-1">@</span>
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
    <div className="rounded-b-2xl shadow pt-1 pb-5 px-5">
      <p className="mt-5 text-base font-semibold tracking-wider text-gray-500 mb-2">ユーザー一覧</p>
      <Hits hitComponent={hitComponent} />
      <Pagination />
      <PoweredBy />
    </div>
  );
});
