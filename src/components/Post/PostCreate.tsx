import { useRouter } from "next/dist/client/router";
import React, { memo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { AiOutlineCamera } from "react-icons/ai";
import { FormButton } from "../Form/FormButton";

type PostCreateFormData = {
  image: string;
  writing: string;
  eventName: string;
  genre: string;
  location: string;
  eventDate: string;
  openTime: string;
  closeTime: string;
  minAmount: string;
  maxAmount: string;
  coupon: string;
  tickets: string;
};

const PostCreate: React.VFC = () => {
  const [img, setImg] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostCreateFormData>({
    mode: "onChange",
  });

  setValue("image", img);

  // URL.createObjectURL() を用いて画像パスをセットします。
  const onDrop = useCallback((acceptedFiles) => {
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL;

    //追加画像は１枚まで
    if (acceptedFiles.length != 0) setImg(createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: ["image/*"],
    onDrop,
  });

  const onSubmit = (data: PostCreateFormData) => {
    console.log(data);
    router.push("/posts");
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-orange-300 ">
        投稿作成
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {/* 投稿写真 */}
        <div
          {...getRootProps()}
          className=" h-80  outline-none  rounded-2xl bg-gray-200 relative"
        >
          <span className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <AiOutlineCamera className="w-9 h-9" />
          </span>
          <input {...getInputProps()} />
          <img src={img} className="object-contain h-80 m-auto  relative" />
        </div>
        <button
          onClick={open}
          className=" text-base text-gray-400 mt-4 block m-auto"
          type="button"
        >
          投稿写真を追加
        </button>
        {/* 自己紹介 */}
        <label htmlFor="紹介文" className="block mt-8 text-base text-gray-400">
          紹介文
        </label>
        <textarea
          id="紹介文"
          {...register("writing", {
            maxLength: {
              value: 140,
              message: "紹介文は140文字以下で入力してください",
            },
          })}
          className=" w-full h-32 pt-2 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.writing && (
          <p className="text-red-600">{errors.writing?.message}</p>
        )}
        {/* イベント名 */}
        <label
          htmlFor="イベント名"
          className="block mt-8 text-base text-gray-400 "
        >
          イベント名
          <span className="ml-2 bg-orange-200 text-white text-sm">必須</span>
        </label>
        <input
          type="text"
          id="イベント名"
          {...register("eventName", {
            required: "必須項目です。",
            maxLength: {
              value: 30,
              message: "イベント名は30字以下で入力してください",
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.eventName && (
          <p className="text-red-600">{errors.eventName?.message}</p>
        )}
        {/* ジャンル */}
        <label htmlFor="genre" className="block mt-8 text-base text-gray-400 ">
          ジャンル
          <span className="ml-2 bg-orange-200 text-white text-sm">必須</span>
        </label>
        <select
          {...register("genre", {
            required: true,
          })}
          id="genre"
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        >
          <option defaultValue="アーティスト">アーティスト</option>
          <option defaultValue="イベント主催者">イベント主催者</option>
          <option defaultValue="J-POP">J-POP</option>
          <option defaultValue="K-POP">K-POP</option>
          <option defaultValue="HIP-HOP">HIP-HOP</option>
          <option defaultValue="R&B">R&B</option>
          <option defaultValue="ダンス/エレクトロニック">
            ダンス/エレクトロニック
          </option>
          <option defaultValue="アニメ">アニメ</option>
          <option defaultValue="邦楽ロック">邦楽ロック</option>
          <option defaultValue="洋楽ロック">洋楽ロック</option>
          <option defaultValue="洋楽">洋楽</option>
          <option defaultValue="メタル">メタル</option>
          <option defaultValue="インディー">インディー</option>
          <option defaultValue="ジャズ">ジャズ</option>
          <option defaultValue="クラシック">クラシック</option>
          <option defaultValue="ファンク">ファンク</option>
          <option defaultValue="ラテン">ラテン</option>
          <option defaultValue="ニューエイジ">ニューエイジ</option>
          <option defaultValue="インスゥルメンタル">インスゥルメンタル</option>
          <option defaultValue="演歌">演歌</option>
          <option defaultValue="民族音楽">民族音楽</option>

          <option defaultValue="展示会">展示会</option>
          <option defaultValue="スポーツイベント">スポーツイベント</option>
          <option defaultValue="講演会">講演会</option>
          <option defaultValue="祭り">祭り</option>
          <option defaultValue="フリーマーケット">フリーマーケット</option>
          <option defaultValue="展示即売会">展示即売会</option>
          <option defaultValue="セレモニー・式典">セレモニー・式典</option>
          <option defaultValue="団体・企業の大会">団体・企業の大会</option>
          <option defaultValue="プロモーションイベント">
            プロモーションイベント
          </option>
          <option defaultValue="学園祭">学園祭</option>
          <option defaultValue="発表会">発表会</option>
          <option defaultValue="その他">その他</option>
        </select>
        {errors.genre && (
          <p className="text-red-600">{errors.genre?.message}</p>
        )}
        {/* 開催場所*/}
        <label
          htmlFor="開催場所"
          className="block mt-8 text-base text-gray-400 "
        >
          開催場所
          <span className="ml-2 bg-orange-200 text-white text-sm">必須</span>
        </label>
        <input
          type="text"
          id="開催場所"
          {...register("location", {
            required: "必須項目です。",
            maxLength: {
              value: 30,
              message: "開催場所は30字以下で入力してください",
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.location && (
          <p className="text-red-600">{errors.location?.message}</p>
        )}
        {/* 開催日 */}
        <label htmlFor="開催日" className="block mt-8 text-base text-gray-400">
          開催日
          <span className="ml-2 bg-orange-200 text-white text-sm">必須</span>
        </label>

        <input
          {...register("eventDate", {
            required: "必須項目です。",
          })}
          type="date"
          id="開催日"
          className="w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        ></input>
        {errors.eventDate && (
          <p className="text-red-600">{errors.eventDate?.message}</p>
        )}
        {/* 開催時間 */}
        <label
          htmlFor="開催時間"
          className="block mt-8 text-base text-gray-400"
        >
          開催時間
          <span className="ml-2 bg-orange-200 text-white text-sm">必須</span>
        </label>
        <div className="flex">
          <input
            type="time"
            id="開催時間"
            {...register("openTime", {
              required: "オープン時間は必須項目です。",
            })}
            className="h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 w-2/5 "
          />
          <span className="self-center mx-2">～</span>
          <input
            type="time"
            id="開催時間"
            {...register("closeTime", {
              required: "最大時間は必須項目です。",
            })}
            className="h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 w-2/5 "
          />
        </div>
        {errors.openTime && (
          <p className="text-red-600">{errors.openTime?.message}</p>
        )}
        {errors.closeTime && (
          <p className="text-red-600">{errors.closeTime?.message}</p>
        )}
        {/* 値段 */}

        <label htmlFor="値段" className="block mt-8 text-base text-gray-400">
          値段
        </label>
        <div className="flex ">
          <input
            type="number"
            id="値段"
            placeholder="00000000"
            {...register("minAmount", {
              maxLength: {
                value: 7,
                message: "最低金額は7字以下で入力してください",
              },
            })}
            className="  h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 w-2/5 "
          />

          <span className="self-center mx-2">～</span>
          <input
            type="number"
            id="値段"
            placeholder="9999999"
            {...register("maxAmount", {
              maxLength: {
                value: 7,
                message: "最大金額は7字以下で入力してください",
              },
            })}
            className="  h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 w-2/5"
          />
        </div>
        {errors.minAmount && (
          <p className="text-red-600 ">{errors.minAmount?.message}</p>
        )}
        {errors.maxAmount && (
          <p className="text-red-600 k">{errors.maxAmount?.message}</p>
        )}
        {/* クーポンコード */}
        <label
          htmlFor="クーポンコード"
          className="block mt-8 text-base text-gray-400"
        >
          クーポンコード
        </label>
        <input
          type="text"
          id="クーポンコード"
          {...register("coupon", {
            maxLength: {
              value: 20,
              message: "クーポンコードは20字以下で入力してください",
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.coupon && (
          <p className="text-red-600">{errors.coupon?.message}</p>
        )}

        {/* チケット*/}
        <label className="block mt-8 text-base text-gray-400 ">チケット</label>
        <label className="mt-4 mr-14 inline-block">
          <input {...register("tickets")} type="radio" value="あり" />
          <span className="ml-2">あり</span>
        </label>
        <label className="mt-4 mr-14 inline-block">
          <input {...register("tickets")} type="radio" value="なし" />
          <span className="ml-2">なし</span>
        </label>

        <div className="mt-8">
          <FormButton backButtonurl="/posts" title="投稿" />
        </div>
      </form>
    </>
  );
};

export default memo(PostCreate);
