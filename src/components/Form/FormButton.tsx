import React, { memo, VFC } from 'react';
import Link from 'next/link';
import { useBackPage } from '../../hooks/useBackPage';

type Props = {
  backButtonUrl?: string;
  title: string;
  disabled?: boolean;
};

//各Formで使用するボタン
const FormButton: VFC<Props> = (props) => {
  const { backPage } = useBackPage();
  return (
    <div className="flex justify-between ">
      {props.backButtonUrl ? (
        <Link href={props.backButtonUrl}>
          <a className="inline-block py-3 w-12/25 text-2xl font-bold text-center text-white bg-gray-400 hover:bg-gray-500 rounded-xl">
            戻る
          </a>
        </Link>
      ) : (
        <button
          onClick={backPage}
          type="button"
          className="inline-block py-3 w-12/25 text-2xl font-bold text-center text-white bg-gray-400 hover:bg-gray-500 rounded-xl"
        >
          戻る
        </button>
      )}

      <button
        disabled={props.disabled}
        className="py-3 w-12/25 text-2xl font-bold text-white bg-orange-300 hover:bg-orange-400 rounded-xl border"
      >
        {props.title}
      </button>
    </div>
  );
};

export default memo(FormButton);
