import React, { VFC } from 'react';

//投稿詳細のスケルトンローディング
const PostDetailSkeletonLoadingItem: VFC = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center p-7 text-base font-bold text-white bg-gray-400 rounded-t-2xl"></div>
      <div className="p-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="p-20 mt-5 bg-gray-300 rounded-2xl"></div>
        <table className="mt-6 w-full text-base text-center table-fixed">
          <tbody className="mt-2">
            <tr className="bg-gray-300">
              <th className="py-4 border"></th>
              <td className="py-4 border"></td>
            </tr>
            <tr className="bg-gray-300">
              <th className="py-4 border"></th>
              <td className="py-4 border"></td>
            </tr>
            <tr className="bg-gray-300">
              <th className="py-4 border"></th>
              <td className="py-4 border"></td>
            </tr>
            <tr className="bg-gray-300">
              <th className="py-4 border"></th>
              <td className="py-4 border"></td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end items-center mt-6">
          <span className="py-2 px-4 text-base bg-gray-300"></span>
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeletonLoadingItem;
