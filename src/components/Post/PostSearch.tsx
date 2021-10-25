import React, { memo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useReactHookForm } from "../../hooks/uselReactHookForm";

const PostExplore: React.VFC = () => {
  const { register, handleSubmit, onSubmit } = useReactHookForm("/posts");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="relative">
          <input
            type="text"
            placeholder="店名 ・ キーワード検索"
            {...register("search")}
            className=" w-full h-10 pl-8  text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 appearance-none"
          />
          <div className="absolute  inset-y-0 left-0 flex items-center px-2 pointer-events-none">
            <AiOutlineSearch className="text-gray-400 " />
          </div>
        </div>
      </form>
    </>
  );
};

export default memo(PostExplore);
