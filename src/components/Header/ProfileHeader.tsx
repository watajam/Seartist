import React, { memo, VFC } from 'react';
import { useBackPage } from '../../hooks/useBackPage';
import { IoMdArrowBack } from 'react-icons/io';
import { FiMoreHorizontal } from 'react-icons/fi';

type Props = {
  openModal: () => void;
};

//プロフィール画面の際に使用するヘッダー
const ProfileHeader: VFC<Props> = (props) => {
  const { backPage } = useBackPage();

  return (
    <header className="flex fixed z-10 justify-between py-3 px-4 w-full text-4xl font-bold text-white bg-orange-300 md:max-w-xl lg:max-w-2xl">
      <IoMdArrowBack onClick={backPage} />

      <button
        type="button"
        onClick={props.openModal}
        className="font-medium text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <FiMoreHorizontal />
      </button>
    </header>
  );
};

export default memo(ProfileHeader);
