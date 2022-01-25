import { NextPage } from 'next';
import { useBackPage } from '../hooks/useBackPage';

//404ページ
const Custom404: NextPage = () => {
  const { backPage } = useBackPage();

  return (
    <div className="flex justify-center items-center py-6 min-h-screen bg-white sm:py-8 lg:py-12">
      <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
        <div className="flex flex-col items-center">
          <span className="inline-flex gap-2.5 items-center mb-8 text-2xl font-bold text-orange-400 md:text-3xl">
            Seartist
          </span>

          <p className="mb-4 text-sm font-semibold text-indigo-500 uppercase md:text-base">That’s a 404</p>
          <h1 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">ページが見つかりません。</h1>

          <p className="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">お探しのページは存在しません。</p>

          <button
            onClick={backPage}
            className="inline-block py-3 px-8 text-sm font-semibold text-center text-gray-500 active:text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg outline-none focus-visible:ring ring-indigo-300 transition duration-100 md:text-base"
          >
            前のページへ戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
