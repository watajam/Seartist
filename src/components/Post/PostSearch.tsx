import { useRouter } from "next/dist/client/router";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";

type PostExploreData = {
  search: string;
};


const PostExplore:React.VFC = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<PostExploreData>({
    mode: "onChange",
  });

  const onSubmit = (data: PostExploreData) => {
    console.log(data);
    router.push("/posts");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="relative">
          <input
            type="text"
            placeholder="店名 ・ キーワード検索"
            {...register("search", {
              required: "必須項目です。",
              maxLength: {
                value: 30,
                message: "開催場所は30字以下で入力してください",
              },
            })}
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

export default memo( PostExplore);
