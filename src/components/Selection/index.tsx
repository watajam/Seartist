import React, { memo, VFC } from 'react';
import Link from 'next/link';
import { useInsertUserInfo } from '../../../FireBase/Mutation/Insert/useInsertUserInfo';

//クリエターアカウント or リスナーアカウントを選択する画面
const Selection: VFC = () => {
  const { handleSetUserInfo } = useInsertUserInfo();

  return (
    <>
      <h1 className="text-xl font-bold text-center text-gray-400 underline mt-8">該当している方を選択してください</h1>
      <Link href="/listener">
        <a
          onClick={handleSetUserInfo}
          className="w-full block  py-3 text-center mt-40 text-2xl font-bold text-white bg-orange-300 border rounded-xl hover:bg-orange-400"
        >
          一般の方はこちら
        </a>
      </Link>
      <hr className="mt-14 border-gray-400" />
      <Link href="/creator">
        <a
          onClick={handleSetUserInfo}
          className="w-full block  py-3 text-center mt-14 text-2xl font-bold text-white bg-orange-300 border rounded-xl hover:bg-orange-400"
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
