import React, { memo, VFC } from "react";

import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import ProfileTabSkeletonLoading from "../SkeletonLoading/ProfileTabSkeletonLoading";

type Props = {
  user: {
    genre: string;
  };
  chengePage: boolean;
  handleChengePage: () => void;
  userLoading: boolean;
};
const ProfileTab: VFC<Props> = (props) => {
  if (props.userLoading) {
    return <ProfileTabSkeletonLoading />;
  }

  if (props.user === null) {
    return <p>エラー</p>;
  }
  return (
    <>
      {/* タブ */}

      {props.user?.genre ? (
        <>
          <button
            className={`w-2/4 flex justify-center border-b-2 pb-2 ${
              props.chengePage ? "border-orange-400" : "border-gray-400"
            }   `}
            onClick={props.handleChengePage}
            disabled={props.chengePage}
          >
            <AiOutlineEye
              className={`w-6 h-6 ${
                props.chengePage ? "text-orange-400" : "text-gray-400 "
              }   `}
            />
          </button>

          <button
            className={`w-2/4 flex justify-center border-b-2 pb-2 ${
              props.chengePage ? "border-gray-400" : " border-orange-400"
            }   `}
            onClick={props.handleChengePage}
            disabled={!props.chengePage}
          >
            <AiOutlineHeart
              className={`w-6 h-6 ${
                props.chengePage ? "text-gray-400 " : "text-orange-400  "
              }  `}
            />
          </button>
        </>
      ) : null}
      {props.user?.genre === "" ? (
        <>
          <button
            className="w-full flex justify-center border-b-2 pb-2
            border-orange-400"
          >
            <AiOutlineHeart className="w-6 h-6 text-orange-400" />
          </button>
        </>
      ) : null}
    </>
  );
};

export default memo(ProfileTab);
