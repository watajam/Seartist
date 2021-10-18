import { useRouter } from "next/dist/client/router";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import FormButton from "../FormButton";

type UrlFormData = {
  twitterUrl: string;
  instagramUrl: string;
  homepageUrl: String;
  otherUrl: String;
};

export const UrlFormList: React.VFC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UrlFormData>({
    mode: "onChange",
  });

  const onSubmit = (data: UrlFormData) => {
    console.log(data);
    router.push("/creator/selflntroductionform");
  };
  return (
    <>
      <h1 className="text-2xl font-bold text-center text-orange-300 ">
        プロフィール登録
      </h1>

      <p className="text-base font-bold text-center text-gray-400 underline mt-6">
        URLを入力するとプロフィールに表示されます
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Twitter */}
        <label
          htmlFor="twitter"
          className="block mt-8 text-base text-gray-400 "
        >
          Twitter
        </label>
        <input
          type="url"
          id="twitter"
          placeholder="URLを入力してください"
          {...register("twitterUrl", {
            pattern: {
              value: /(https|http):\/\/(twitter.com)\/([A-Za-z0-9_]*)/,
              message: "正しい形式で入力してください",
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.twitterUrl && (
          <p className="text-red-600">{errors.twitterUrl?.message}</p>
        )}
        {/* Instagram */}
        <label
          htmlFor="instagram"
          className="block mt-8 text-base text-gray-400 "
        >
          Instagram
        </label>
        <input
          type="url"
          id="instagram"
          placeholder="URLを入力してください"
          {...register("instagramUrl", {
            pattern: {
              value: /(https|http):\/\/(www.instagram.com)\/([A-Za-z0-9_]*)/,
              message: "正しい形式で入力してください",
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.instagramUrl && (
          <p className="text-red-600">{errors.instagramUrl?.message}</p>
        )}
        {/* HomePage */}
        <label
          htmlFor="homepage"
          className="block mt-8 text-base text-gray-400 "
        >
          HomePage
        </label>
        <input
          type="url"
          id="homepage"
          placeholder="URLを入力してください"
          {...register("homepageUrl", {
            pattern: {
              value: /(https|http):\/\//,
              message: "正しい形式で入力してください",
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.homepageUrl && (
          <p className="text-red-600">{errors.homepageUrl?.message}</p>
        )}
        {/* その他 */}
        <label htmlFor="other" className="block mt-8 text-base text-gray-400 ">
          その他
        </label>
        <input
          type="url"
          id="other"
          placeholder="URLを入力してください"
          {...register("otherUrl", {
            pattern: {
              value: /(https|http):\/\//,
              message: "正しい形式で入力してください",
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.otherUrl && (
          <p className="text-red-600">{errors.otherUrl?.message}</p>
        )}
        <div className="mt-14">
          <FormButton backButtonurl="/creator" title="次へ" />
        </div>
      </form>
    </>
  );
};

export default memo(UrlFormList);
