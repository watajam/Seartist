import { NextPage } from 'next';
import { useBackPage } from '../hooks/useBackPage';

//404ページ
const Custom404: NextPage = () => {
  const { backPage } = useBackPage();

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 flex justify-center items-center min-h-screen ">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="flex flex-col items-center">
          <span className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5 mb-8 text-orange-400">
            Seartist
          </span>

          <p className="text-indigo-500 text-sm md:text-base font-semibold uppercase mb-4">That’s a 404</p>
          <h1 className="text-gray-800 text-2xl md:text-3xl font-bold text-center mb-2">ページが見つかりません。</h1>

          <p className="max-w-screen-md text-gray-500 md:text-lg text-center mb-12">お探しのページは存在しません。</p>

          <button
            onClick={backPage}
            className="inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
          >
            前のページへ戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
