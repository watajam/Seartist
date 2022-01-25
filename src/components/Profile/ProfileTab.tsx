import React, { memo, VFC } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { UserData } from '../../../types/UserData';

type Props = {
  user: Pick<UserData, 'genre'>;
  chengePage: boolean;
  handleChengePage: () => void;
};

//投稿一覧 or いいねした投稿一覧を切り替えるタブ
const ProfileTab: VFC<Props> = (props) => {
  return (
    <>
      {/* タブ */}
      {props.user?.genre ? (
        <>
          <button
            className={`w-2/4 flex justify-center border-b-2 pb-2 ${
              props.chengePage ? 'border-orange-400' : 'border-gray-400'
            }   `}
            onClick={props.handleChengePage}
            disabled={props.chengePage}
          >
            <AiOutlineEye className={`w-6 h-6 ${props.chengePage ? 'text-orange-400' : 'text-gray-400 '}   `} />
          </button>

          <button
            className={`w-2/4 flex justify-center border-b-2 pb-2 ${
              props.chengePage ? 'border-gray-400' : ' border-orange-400'
            }   `}
            onClick={props.handleChengePage}
            disabled={!props.chengePage}
          >
            <AiOutlineHeart className={`w-6 h-6 ${props.chengePage ? 'text-gray-400 ' : 'text-orange-400  '}  `} />
          </button>
        </>
      ) : null}
      {props.user?.genre === '' ? (
        <>
          <button
            className="border-orange-400
w-full flex justify-center border-b-2 pb-2"
          >
            <AiOutlineHeart className="w-6 h-6 text-orange-400" />
          </button>
        </>
      ) : null}
    </>
  );
};

export default memo(ProfileTab);
