import React, { memo, VFC } from 'react';
import Link from 'next/link';
import { useBackPage } from '../../hooks/useBackPage';

type Props = {
  backButtonUrl?: string;
  title: string;
};

const FormButton: VFC<Props> = (props) => {
  const { backPage } = useBackPage();
  return (
    <div className="flex justify-between ">
      {props.backButtonUrl ? (
        <Link href={props.backButtonUrl}>
          <a className="w-12/25   text-center inline-block py-3  text-2xl font-bold text-white rounded-xl bg-gray-400 hover:bg-gray-500">
            戻る
          </a>
        </Link>
      ) : (
        <button
          onClick={backPage}
          type="button"
          className="w-12/25   text-center inline-block py-3  text-2xl font-bold text-white rounded-xl bg-gray-400 hover:bg-gray-500"
        >
          戻る
        </button>
      )}

      <button className="w-12/25  py-3  text-2xl font-bold text-white bg-orange-300 border rounded-xl hover:bg-orange-400">
        {props.title}
      </button>
    </div>
  );
};

export default memo(FormButton);
