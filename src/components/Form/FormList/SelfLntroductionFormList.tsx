import React, { memo } from "react";
import Image from "next/image";
import { useReactHookForm } from "../../../hooks/uselReactHookForm";
import { useReactDropzon } from "../../../hooks/useReactDropzon";

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
          className="w-36 h-36  m-auto rounded-full outline-none appearance-none"
        >
          <input {...getInputProps()} />
          <Image
            src={img}
            alt="プロフィールアイコン"
            width={144}
            height={144}
            className="w-36   rounded-full object-cover "
          />
        </div>
        <button
          onClick={open}
          className=" text-base text-gray-400 mt-4 block m-auto"
          type="button"
        >
          プロフィール写真を追加
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
