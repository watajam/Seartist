import React, { memo } from "react";
import { useReactHookForm } from "../../../hooks/uselReactHookForm";
import { useReactDropzon } from "../../../hooks/useReactDropzon";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {
  children: React.ReactNode;
};

const SelfLntroductionFormList: React.VFC<Props> = (props) => {
  const { register, handleSubmit, errors, onSubmit, setValue } =
    useReactHookForm("/posts");
  const { getRootProps, getInputProps, open, img } = useReactDropzon();

  setValue("image", img);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {/* プロフィール画像追加 */}
        <div
          {...getRootProps()}
          className="h-24 w-24  outline-none m-auto  rounded-full bg-gray-200 relative"
        >
          <span className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <AiOutlineCamera className="w-6 h-6" />
          </span>
          <input {...getInputProps()} />
          <img
            src={img}
            className="object-cover h-24 w-24  rounded-full  m-auto  relative "
          />
        </div>
        <button
          onClick={open}
          className=" text-base text-gray-400 mt-4 block m-auto"
          type="button"
        >
          プロフィール写真を変更
        </button>

        {/* 自己紹介 */}
        <label
          htmlFor="自己紹介"
          className="block mt-8 text-base text-gray-400 appearance-none"
        >
          自己紹介
        </label>
        <textarea
          id="自己紹介"
          {...register("writing", {
            maxLength: {
              value: 160,
              message: "パスワードは160文字以下で入力してください",
            },
          })}
          className=" w-full h-32 pt-2 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.writing && (
          <p className="text-red-600">{errors.writing?.message}</p>
        )}
        <div className="mt-14">{props.children}</div>
      </form>
    </>
  );
};

export default memo(SelfLntroductionFormList);
