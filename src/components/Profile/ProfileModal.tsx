import React, { memo, VFC } from 'react';
import { Dialog } from '@headlessui/react';
import { useAuthLogout } from '../../../FireBase/Authentication/useAuthLogout';
import Link from 'next/link';

type Props = {
  closeModal: () => void;
  isOpen: boolean;
};

//プロフィールモーダル
const ProfileModal: VFC<Props> = (props) => {
  const { handleLogout, isLoading } = useAuthLogout();

  return (
    <Dialog open={props.isOpen} onClose={props.closeModal} className="overflow-y-auto fixed inset-0 z-10">
      <div className="flex justify-center items-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative mx-auto w-4/5 max-w-sm bg-white rounded">
          <Link href="/profile/terms-of-service">
            <a className="block p-6 w-full text-center hover:bg-orange-100 active:bg-orange-100 outline-none">
              利用規約
            </a>
          </Link>
          <hr />
          <Link href="/profile/privacy-policy">
            <a className="block p-6 w-full text-center hover:bg-orange-100 active:bg-orange-100">
              プライバシーポリシー
            </a>
          </Link>
          <hr />

          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="block p-6 w-full text-center hover:bg-orange-100 active:bg-orange-100"
          >
            ログアウト
          </button>
          <hr />
          <button
            onClick={props.closeModal}
            className="block p-6 w-full text-center hover:bg-orange-100 active:bg-orange-100"
          >
            キャンセル
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default memo(ProfileModal);
