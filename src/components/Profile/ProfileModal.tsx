import React, { memo, VFC } from 'react';
import { Dialog } from '@headlessui/react';
import { useAuthLogout } from '../../../FireBase/Authentication/useAuthLogout';
import Link from 'next/link';

type Props = {
  handleChengeModal: () => void;
  isOpen: boolean;
};

//プロフィールモーダル
const ProfileModal: VFC<Props> = (props) => {
  const { logout } = useAuthLogout();

  return (
    <Dialog open={!props.isOpen} onClose={props.handleChengeModal} className="fixed z-10 inset-0 overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen ">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded max-w-sm mx-auto w-4/5">
          <Link href="/profile/terms-of-service">
            <a className="block w-full text-center p-6 hover:bg-orange-100 active:bg-orange-100 outline-none">利用規約</a>
          </Link>
          <hr />
          <Link href="/profile/privacy-policy">
            <a className="block w-full text-center p-6 hover:bg-orange-100 active:bg-orange-100 outline-none">
              プライバシーポリシー
            </a>
          </Link>
          <hr />

          <button onClick={logout} className="block w-full text-center p-6 hover:bg-orange-100 active:bg-orange-100">
            ログアウト
          </button>
          <hr />
          <button
            onClick={props.handleChengeModal}
            className="block w-full text-center p-6 hover:bg-orange-100 active:bg-orange-100"
          >
            キャンセル
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default memo(ProfileModal);
