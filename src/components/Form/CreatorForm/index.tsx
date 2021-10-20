import { useRouter } from "next/dist/client/router";
import React, { memo } from "react";
import { useForm } from "react-hook-form";

import FormButton from "../FormButton";

type CreatorFormData = {
  name: string;
  userId: string;
  genre: string;
  location: string;
  birthday: string;
};

export const CreatorFormList: React.VFC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatorFormData>({
    mode: "onChange",
  });

  const onSubmit = (data: CreatorFormData) => {
    console.log(data);
    router.push("/creator/urlform");
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-orange-300 ">
        プロフィール登録
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 氏名/アーティスト名 */}
        <label htmlFor="name" className="block mt-8 text-base text-gray-400 ">
          氏名/アーティスト名
          <span className="ml-2 bg-orange-200 text-white text-sm">必須</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="氏名 or アーティスト名を入力してください"
          {...register("name", {
            required: "必須項目です。",
            maxLength: {
              value: 30,
              message: "氏名 or アーティスト名は30字以下で入力してください",
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.name && <p className="text-red-600">{errors.name?.message}</p>}

        {/* ユーザーID */}
        <label
          htmlFor="ユーザーID"
          className="block mt-8 text-base text-gray-400 "
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
            minLength: {
              value: 4,
              message: "ユーザーIDは4文字以上15字以下で入力してください",
            },
            maxLength: {
              value: 15,
              message: "ユーザーIDは4文字以上15字以下で入力してください",
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        />
        {errors.userId && (
          <p className="text-red-600">{errors.userId?.message}</p>
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

        {/* 所在地 */}
        <label
          htmlFor="location"
          className="block mt-8 text-base text-gray-400 "
        >
          所在地
          <span className="ml-2 bg-orange-200 text-white text-sm">必須</span>
        </label>
        <select
          {...register("location", {
            required: true,
          })}
          id="location"
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        >
          <option defaultValue="北海道">北海道</option>
          <option defaultValue="青森県">青森県</option>
          <option defaultValue="岩手県">岩手県</option>
          <option defaultValue="宮城県">宮城県</option>
          <option defaultValue="秋田県">秋田県</option>
          <option defaultValue="山形県">山形県</option>
          <option defaultValue="福島県">福島県</option>
          <option defaultValue="茨城県">茨城県</option>
          <option defaultValue="栃木県">栃木県</option>
          <option defaultValue="群馬県">群馬県</option>
          <option defaultValue="埼玉県">埼玉県</option>
          <option defaultValue="千葉県">千葉県</option>
          <option defaultValue="東京都">東京都</option>
          <option defaultValue="神奈川県">神奈川県</option>
          <option defaultValue="新潟県">新潟県</option>
          <option defaultValue="富山県">富山県</option>
          <option defaultValue="石川県">石川県</option>
          <option defaultValue="福井県">福井県</option>
          <option defaultValue="山梨県">山梨県</option>
          <option defaultValue="長野県">長野県</option>
          <option defaultValue="岐阜県">岐阜県</option>
          <option defaultValue="静岡県">静岡県</option>
          <option defaultValue="愛知県">愛知県</option>
          <option defaultValue="三重県">三重県</option>
          <option defaultValue="滋賀県">滋賀県</option>
          <option defaultValue="京都府">京都府</option>
          <option defaultValue="大阪府">大阪府</option>
          <option defaultValue="兵庫県">兵庫県</option>
          <option defaultValue="奈良県">奈良県</option>
          <option defaultValue="和歌山県">和歌山県</option>
          <option defaultValue="鳥取県">鳥取県</option>
          <option defaultValue="島根県">島根県</option>
          <option defaultValue="岡山県">岡山県</option>
          <option defaultValue="広島県">広島県</option>
          <option defaultValue="山口県">山口県</option>
          <option defaultValue="徳島県">徳島県</option>
          <option defaultValue="香川県">香川県</option>
          <option defaultValue="愛媛県">愛媛県</option>
          <option defaultValue="高知県">高知県</option>
          <option defaultValue="福岡県">福岡県</option>
          <option defaultValue="佐賀県">佐賀県</option>
          <option defaultValue="長崎県">長崎県</option>
          <option defaultValue="熊本県">熊本県</option>
          <option defaultValue="大分県">大分県</option>
          <option defaultValue="宮崎県">宮崎県</option>
          <option defaultValue="鹿児島県">鹿児島県</option>
          <option defaultValue="沖縄県">沖縄県</option>
        </select>

        {/* 生年月日 */}
        <label
          htmlFor="birthday"
          className="block mt-8 text-base text-gray-400 "
        >
          生年月日
          <span className="ml-2 bg-orange-200 text-white text-sm">必須</span>
        </label>
        <input
          {...register("birthday", {
            required: "必須項目です。",
          })}
          type="date"
          id="birthday"
          className="w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 "
        ></input>
        {errors.birthday && (
          <p className="text-red-600">{errors.birthday?.message}</p>
        )}

        <div className="mt-14">
          <FormButton backButtonurl="/selection" title="次へ" />
        </div>
      </form>
    </>
  );
};

export default memo(CreatorFormList);
