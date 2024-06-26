import React, { memo, VFC } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';
import FormButton from '../Form/FormButton';
import FormProfileTitle from '../Form/FormProfileTitle';
import { useQueryCreatorCheck } from '../../../FireBase/Query/User/useQueryCreatorCheck';
import { useDropzoneUpload } from '../../hooks/useDropzoneUpload';
import { useUpdatePostCreate } from '../../../FireBase/Mutation/Update/useUpdatePostCreate';

//投稿作成画面のフォーム
const PostCreate: VFC = () => {
  const { updatePostCreate, isLoading, register, handleSubmit, errors } = useUpdatePostCreate();
  const { getRootProps, getInputProps, open, handleUpload, src } = useDropzoneUpload(updatePostCreate);
  useQueryCreatorCheck();

  return (
    <>
      <FormProfileTitle title="投稿作成" />

      <form onSubmit={handleSubmit(handleUpload)} className="mt-8">
        {/* 投稿写真 */}
        <div {...getRootProps()} className="relative h-56 overflow-hidden border-2 rounded-2xl">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <AiOutlineCamera className="w-9 h-9" />
          </span>
          <input {...getInputProps()} />
          {src ? (
            <img src={src} className="object-cover absolute h-full w-full top-0 left-0 rounded-2xl border-none rounded-2xl" />
          ) : null}
        </div>
        <button onClick={open} className="block m-auto mt-4 text-base text-gray-400" type="button">
          投稿写真を追加
        </button>
        {/* 自己紹介 */}
        <label htmlFor="紹介文" className="block mt-8 text-base text-gray-400">
          紹介文
        </label>
        <textarea
          id="紹介文"
          {...register('writing', {
            maxLength: {
              value: 140,
              message: '紹介文は140文字以下で入力してください',
            },
          })}
          className="pt-2 pl-2 mt-2 w-full h-32 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
        />
        {errors.writing && <p className="text-red-600">{errors.writing?.message}</p>}
        {/* イベント名 */}
        <label htmlFor="イベント名" className="block mt-8 text-base text-gray-400 ">
          イベント名
          <span className="ml-2 text-sm text-white bg-orange-200">必須</span>
        </label>
        <input
          type="text"
          id="イベント名"
          {...register('eventName', {
            required: '必須項目です。',
            maxLength: {
              value: 30,
              message: 'イベント名は30字以下で入力してください',
            },
          })}
          className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
        />
        {errors.eventName && <p className="text-red-600">{errors.eventName?.message}</p>}
        {/* ジャンル */}
        <label htmlFor="genre" className="block mt-8 text-base text-gray-400 ">
          ジャンル
          <span className="ml-2 text-sm text-white bg-orange-200">必須</span>
        </label>
        <div className="relative mt-2">
          <select
            {...register('genre', {
              required: true,
            })}
            id="genre"
            className="pl-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
          >
            <option defaultValue="アーティスト">アーティスト</option>
            <option defaultValue="イベント主催者">イベント主催者</option>
            <option defaultValue="J-POP">J-POP</option>
            <option defaultValue="K-POP">K-POP</option>
            <option defaultValue="HIP-HOP">HIP-HOP</option>
            <option defaultValue="R&B">R&B</option>
            <option defaultValue="ダンス/エレクトロニック">ダンス/エレクトロニック</option>
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
            <option defaultValue="プロモーションイベント">プロモーションイベント</option>
            <option defaultValue="学園祭">学園祭</option>
            <option defaultValue="発表会">発表会</option>
            <option defaultValue="その他">その他</option>
          </select>
          <div className="flex absolute inset-y-0 right-0 items-center px-2 pointer-events-none">
            <AiFillCaretDown />
          </div>
        </div>
        {errors.genre && <p className="text-red-600">{errors.genre?.message}</p>}
        {/* 都道府県 */}
        <label htmlFor="location" className="block mt-8 text-base text-gray-400 ">
          都道府県
          <span className="ml-2 text-sm text-white bg-orange-200">必須</span>
        </label>

        <div className="relative mt-2">
          <select
            {...register('location')}
            id="location"
            className="pl-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
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
          <div className="flex absolute inset-y-0 right-0 items-center px-2 pointer-events-none">
            <AiFillCaretDown />
          </div>
        </div>

        {/* 開催場所*/}
        <label htmlFor="開催場所" className="block mt-8 text-base text-gray-400 ">
          開催場所
          <span className="ml-2 text-sm text-white bg-orange-200">必須</span>
        </label>
        <input
          type="text"
          id="開催場所"
          {...register('eventLocation', {
            required: '必須項目です。',
            maxLength: {
              value: 30,
              message: '開催場所は30字以下で入力してください',
            },
          })}
          className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
        />
        {errors.eventLocation && <p className="text-red-600">{errors.eventLocation?.message}</p>}

        {/* 開催日 */}
        <label htmlFor="開催日" className="block mt-8 text-base text-gray-400">
          開催日
          <span className="ml-2 text-sm text-white bg-orange-200">必須</span>
        </label>

        <input
          {...register('eventDate', {
            required: '必須項目です。',
          })}
          type="date"
          id="開催日"
          className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
        ></input>
        {errors.eventDate && <p className="text-red-600">{errors.eventDate?.message}</p>}
        {/* 開催時間 */}
        <label htmlFor="開催時間" className="block mt-8 text-base text-gray-400">
          開催時間
          <span className="ml-2 text-sm text-white bg-orange-200">必須</span>
        </label>
        <div className="flex justify-between">
          <input
            type="time"
            id="開催時間"
            {...register('openTime', {
              required: 'オープン時間は必須項目です。',
            })}
            className="mt-2 w-2/5 h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
          />
          <span className="self-center mx-2">～</span>
          <input
            type="time"
            id="開催時間"
            {...register('closeTime', {
              required: 'クローズ時間は必須項目です。',
            })}
            className="mt-2 w-2/5 h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
          />
        </div>
        {errors.openTime && <p className="text-red-600">{errors.openTime?.message}</p>}
        {errors.closeTime && <p className="text-red-600">{errors.closeTime?.message}</p>}
        {/* 値段 */}

        <label htmlFor="値段" className="block mt-8 text-base text-gray-400">
          値段
        </label>
        <div className="flex justify-between">
          <input
            type="number"
            id="値段"
            placeholder="0000000"
            {...register('minAmount', {
              maxLength: {
                value: 7,
                message: '最低金額は7字以下で入力してください',
              },
            })}
            className="pl-2 mt-2 w-2/5 h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
          />

          <span className="self-center mx-2">～</span>
          <input
            type="number"
            id="値段"
            placeholder="9999999"
            {...register('maxAmount', {
              maxLength: {
                value: 7,
                message: '最大金額は7字以下で入力してください',
              },
            })}
            className="pl-2 mt-2 w-2/5 h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
          />
        </div>
        {errors.minAmount && <p className="text-red-600 ">{errors.minAmount?.message}</p>}
        {errors.maxAmount && <p className="text-red-600 k">{errors.maxAmount?.message}</p>}
        {/* クーポンコード */}
        <label htmlFor="クーポンコード" className="block mt-8 text-base text-gray-400">
          クーポンコード
        </label>
        <input
          type="text"
          id="クーポンコード"
          {...register('coupon', {
            maxLength: {
              value: 20,
              message: 'クーポンコードは20字以下で入力してください',
            },
          })}
          className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
        />
        {errors.coupon && <p className="text-red-600">{errors.coupon?.message}</p>}

        {/* チケット*/}
        <label className="block mt-8 text-base text-gray-400 ">チケット</label>
        <label className="inline-block mt-4 mr-14">
          <input {...register('tickets')} type="radio" value="あり" />
          <span className="ml-2">あり</span>
        </label>
        <label className="inline-block mt-4">
          <input {...register('tickets')} type="radio" value="なし" />
          <span className="ml-2">なし</span>
        </label>

        <div className="mt-8">
          <FormButton title="投稿" disabled={isLoading} />
        </div>
      </form>
    </>
  );
};

export default memo(PostCreate);
