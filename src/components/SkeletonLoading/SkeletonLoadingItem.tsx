import React, { VFC } from 'react';

const SkeletonLoadingItem: VFC = () => {
  return (
    <div className="rounded-2xl shadow-md animate-pulse key={post.id}">
      <div className="bg-gray-400   text-white flex  p-7 rounded-t-2xl items-center font-bold text-base "></div>
      <div className="p-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
        <div className="bg-gray-300  p-20 rounded-2xl mt-5"></div>
        <table className="table-fixed text-center text-base w-full mt-6 ">
          <tbody className="mt-2">
            <tr className="bg-gray-300">
              <th className="border  py-4 "></th>
              <td className="border  py-4  "></td>
            </tr>
            <tr className="bg-gray-300">
              <th className="border  py-4"></th>
              <td className="border  py-4"></td>
            </tr>
            <tr className="bg-gray-300">
              <th className="border  py-4"></th>
              <td className="border  py-4 "></td>
            </tr>
            <tr className="bg-gray-300">
              <th className="border  py-4 "></th>
              <td className="border  py-4 "></td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end  items-center mt-6 ">
          <span className="text-base bg-gray-300 py-2 px-4"></span>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingItem;
