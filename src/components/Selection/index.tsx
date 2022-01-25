import React, { memo, VFC } from 'react';
import Link from 'next/link';
import { useInsertUserInfo } from '../../../FireBase/Mutation/Insert/useInsertUserInfo';

//クリエターアカウント or リスナーアカウントを選択する画面
const Selection: VFC = () => {
  const { handleSetUserInfo } = useInsertUserInfo();

  return (
    <>
      <h1 className="mt-8 text-xl font-bold text-center text-gray-400 underline">該当している方を選択してください</h1>
      <Link href="/listener">
        <a
          onClick={handleSetUserInfo}
          className="block py-3 mt-40 w-full text-2xl font-bold text-center text-white bg-orange-300 hover:bg-orange-400 rounded-xl border"
        >
          一般の方はこちら
        </a>
      </Link>
      <hr className="mt-14 border-gray-400" />
      <Link href="/creator">
        <a
          onClick={handleSetUserInfo}
          className="block py-3 mt-14 w-full text-2xl font-bold text-center text-white bg-orange-300 hover:bg-orange-400 rounded-xl border"
        >
          アーティストや
          <br />
          イベント主催者の方はこちら
        </a>
      </Link>
    </>
  );
};

export default memo(Selection);
