import { useRouter } from "next/dist/client/router";
import React, { memo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import FormButton from "../FormButton";

type SelfLntroductionFormData = {
  image: string;
  twitterUrl: string;
  userId: String;
  writing: string;
};

export const SelfLntroductionFormList: React.VFC = () => {
  const [img, setImg] = useState("/camera.svg");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SelfLntroductionFormData>({
    mode: "onChange",
  });

  setValue("image", img);

  // URL.createObjectURL() を用いて画像パスをセットします。
  const onDrop = useCallback((acceptedFiles) => {
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL;

    //追加画像は１枚まで
    if (acceptedFiles.length != 0) setImg(createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: ["image/*"],
    onDrop,
  });

  const onSubmit = (data: SelfLntroductionFormData) => {
    console.log(data);
    router.push("");
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-orange-300 ">
        プロフィール登録
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {/* プロフィール画像追加 */}
        <div
          {...getRootProps()}
          className="w-36 h-36  m-auto rounded-full outline-none"
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

        {/* ユーザーID */}
        <label
          htmlFor="ユーザーID"
          className="block mt-10 text-base text-gray-400 "
        >
          ユーザーID
          <span className="ml-2 bg-orange-200 text-white text-sm">必須</span>
        </label>
        <input
          type="text"
          id="ユーザーID"
          placeholder="例 : seartist_jp"
          {...register("userId", {
            required: "必須項目です。",
            pattern: {
              value: /[0-9a-zA-Z_]{1,15}/,
              message: "正しい形式で入力してください",
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.userId && (
          <p className="text-red-600">{errors.userId?.message}</p>
        )}

        {/* 自己紹介 */}
        <label
          htmlFor="自己紹介"
          className="block mt-8 text-base text-gray-400 "
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
        <div className="mt-14">
          <FormButton backButtonurl="/listener" title="始める" />
        </div>
      </form>
    </>
  );
};

export default memo(SelfLntroductionFormList);
