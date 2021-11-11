import React, { VFC } from "react";

const ProfileUserSkeletonLoadingItem: VFC = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between">
        <div className="rounded-full w-24 h-24 bg-gray-300"></div>

        <a className="flex flex-col items-center font-bold">
          <span className="bg-gray-300 p-2"></span>
          <span className="mt-2 bg-gray-300 w-10 h-4 rounded"></span>
        </a>

        <a className="flex flex-col items-center font-bold">
          <span className="bg-gray-300 p-2"></span>
          <span className="mt-2 bg-gray-300 w-10 h-4 rounded"></span>
        </a>

        <a className="flex flex-col items-center font-bold">
           <span className="bg-gray-300 p-2"></span>
          <span className="mt-2 bg-gray-300 w-10 h-4 rounded"></span>
        </a>
      </div>

      {/* {props.user?.name} */}
      <div className="bg-gray-300 h-4 w-24 mt-2 rounded"></div>

      {/* {`@ ${props.user?.userId}`} */}
      <div className="bg-gray-300 h-2 w-16 mt-2 rounded"></div>

      <div className="flex items-center text-gray-400 mt-2">
        <span className="mr-1 bg-gray-300 p-2 " />
        <span className="mr-4 bg-gray-300 h-4 w-12 rounded" />
        <span className="mr-1 bg-gray-300 p-2" />
        <span className="mr-4 bg-gray-300 h-4 w-12 rounded" />
        <span className="mr-1 bg-gray-300 p-2" />
        <span className="bg-gray-300 h-4 w-12 rounded" />
      </div>

      {/* writing */}
      <div className="mt-8  bg-gray-300 h-4 rounded"></div>
      <div className="mt-2  bg-gray-300 h-4 rounded w-3/4"></div>

      <nav className="mt-6">
        <ul className="flex w-full">
          <li className="flex justify-center w-1/4">
            <span className="p-7 rounded-full bg-gray-300 "></span>
          </li>

          <li className="flex justify-center w-1/4">
            <span className="p-7 rounded-full bg-gray-300 "></span>
          </li>

          <li className="flex justify-center w-1/4">
            <span className="p-7 rounded-full bg-gray-300 "></span>
          </li>

          <li className="flex justify-center w-1/4">
            <span className="p-7 rounded-full bg-gray-300 "></span>
          </li>
        </ul>
      </nav>

      <a className="bg-gray-300 h-7 text-white text-center mt-6 p-1 block"></a>
    </div>
  );
};

export default ProfileUserSkeletonLoadingItem;
