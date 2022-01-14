import React, { memo, VFC } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useBackPage } from '../../hooks/useBackPage';
import { IoMdArrowBack } from 'react-icons/io';

type Props = {
  handleChengeModal: () => void;
};

//プロフィール画面の際に使用するヘッダー
const ProfileHeader: VFC<Props> = (props) => {
  const { backPage } = useBackPage();

  return (
    <header className="px-4 py-3 text-4xl font-bold text-white bg-orange-300 fixed w-full bg-opacity-95 z-10 flex justify-between  md:max-w-xl lg:max-w-2xl">
      <IoMdArrowBack onClick={backPage} />

      <button
        type="button"
        onClick={props.handleChengeModal}
        className="font-medium text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <AiOutlineSetting />
      </button>
    </header>
  );
};

export default memo(ProfileHeader);
