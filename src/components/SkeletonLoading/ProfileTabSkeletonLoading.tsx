import React, { VFC } from "react";

const ProfileTabSkeletonLoading: VFC = () => {
  return (
    <div className="animate-pulse  flex w-full">
      <button className={`w-2/4 flex justify-center border-b-2 pb-2   `}>
        <div className={`w-5 h-5  bg-gray-300`} />
      </button>

      <button className={`w-2/4 flex justify-center border-b-2 pb-2  `}>
        <div className={`w-5 h-5   bg-gray-300`} />
      </button>
    </div>
  );
};

export default ProfileTabSkeletonLoading;
