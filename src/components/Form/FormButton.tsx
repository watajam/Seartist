import React, { memo } from "react";
import Link from "next/link";

type Props = {
  backButtonurl: string;
  title: string;
};

export const FormButton: React.VFC<Props> = (props) => {
  return (
    <div className="flex justify-between ">
      <Link href={props.backButtonurl}>
        <a className="w-12/25   text-center inline-block py-3  text-2xl font-bold text-white rounded-xl bg-gray-400 hover:bg-gray-500">
          戻る
        </a>
      </Link>
      <button className="w-12/25  py-3  text-2xl font-bold text-white bg-orange-300 border rounded-xl hover:bg-orange-400">
        {props.title}
      </button>
    </div>
  );
};

export default memo(FormButton);
