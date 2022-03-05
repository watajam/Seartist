import React, { memo, useEffect, VFC } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { Disclosure } from '@headlessui/react';
import FormButton from '../Form/FormButton';
import { useQueryUserEditInfo } from '../../../FireBase/Query/User/useQueryUserEditInfo';
import { useUpdateProfileEdit } from '../../../FireBase/Mutation/Update/useUpdateProfileEdit';
import { useDropzoneUpload } from '../../hooks/useDropzoneUpload';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import { useFetch } from '../../hooks/useFetch';

//プロフィール編集画面
const ProfileEditing: VFC = () => {
  const { updateProfileEdit, isLoading, register, handleSubmit, errors, setValue } = useUpdateProfileEdit();
  const { getRootProps, getInputProps, open, handleUpload, src } = useDropzoneUpload(updateProfileEdit);
  const { userEmail } = useRecoilSetEmail();
  const queryUserEditInfo = useQueryUserEditInfo();

  const {
    data: user,
    isLoading: userIsLoading,
    error: userError,
  } = useFetch(userEmail ? [`firestore/users/${userEmail.email}`, userEmail.email] : null, () => queryUserEditInfo());

  if (userIsLoading) {
    return (
      <div className="flex justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-orange-400 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (userError) {
    return <p className="text-xl font-bold text-center">エラーが発生した為、データの取得に失敗しました。</p>;
  }

  setValue('name', user?.name);
  setValue('userId', user?.userId);
  setValue('birthday', user?.birthday);
  setValue('genre', user?.genre);
  setValue('location', user?.location);
  setValue('writing', user?.writing);
  setValue('twitterUrl', user?.twitterUrl);
  setValue('instagramUrl', user?.instagramUrl);
  setValue('homepageUrl', user?.homepageUrl);
  setValue('otherUrl', user?.otherUrl);

  return (
    <form onSubmit={handleSubmit(handleUpload)}>
      <h1 className="mb-6 text-2xl font-bold text-center text-orange-300">プロフィール編集</h1>
      {/* 投稿写真 */}
      <div {...getRootProps()} className="m-auto w-24 h-24 bg-gray-200 rounded-full outline-none">
        <input {...getInputProps()} />

        {(user?.profilePhoto === undefined && src === '') || (user?.profilePhoto === '' && src === '') ? (
          <img src={'/profile.png'} className="object-cover m-auto w-24 h-24 rounded-full" />
        ) : (
          <img src={src ? src : user.profilePhoto} className="object-cover m-auto w-24 h-24 rounded-full" />
        )}
      </div>
      <button onClick={open} className="block m-auto mt-4 text-base text-gray-400" type="button">
        プロフィール写真を変更
      </button>
      {/* 氏名/アーティスト名 */}
      <label htmlFor="name" className="block mt-8 text-base text-gray-400 ">
        氏名/アーティスト名
        <span className="ml-2 text-sm text-white bg-orange-200">必須</span>
      </label>
      <input
        type="text"
        id="name"
        placeholder="山田 太郎"
        {...register('name', {
          required: '必須項目です。',
          maxLength: {
            value: 30,
            message: '氏名 or アーティスト名は30字以下で入力してください',
          },
        })}
        className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
      />
      {errors.name && <p className="text-red-600">{errors.name?.message}</p>}
      {/* ユーザーID */}
      <label htmlFor="ユーザーID" className="block mt-8 text-base text-gray-400 ">
        ユーザーID
        <span className="ml-2 text-sm text-white bg-orange-200">必須</span>
      </label>
      <input
        type="text"
        id="ユーザーID"
        placeholder="seartist_jp"
        {...register('userId', {
          required: '必須項目です。',
          pattern: {
            value: /^[a-zA-Z0-9_\-.]{3,15}$/,
            message: '正しい形式で入力してください',
          },
          minLength: {
            value: 4,
            message: 'ユーザーIDは4文字以上15字以下で入力してください',
          },
          maxLength: {
            value: 15,
            message: 'ユーザーIDは4文字以上15字以下で入力してください',
          },
        })}
        className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
      />
      {errors.userId && <p className="text-red-600">{errors.userId?.message}</p>}
      {/* ジャンル */}
      {user?.genre ? (
        <>
          <label htmlFor="genre" className="block mt-8 text-base text-gray-400 ">
            ジャンル
            <span className="ml-2 text-sm text-white bg-orange-200">必須</span>
          </label>
          <div className="relative mt-2">
            <select
              {...register('genre')}
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
        </>
      ) : null}

      {/* 所在地 */}
      <label htmlFor="location" className="block mt-8 text-base text-gray-400 ">
        所在地
      </label>
      <div className="relative mt-2">
        <select
          {...register('location')}
          id="location"
          className="pl-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
        >
          <option defaultValue=""></option>
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
      {/* 生年月日 */}
      <label htmlFor="birthday" className="block mt-8 text-base text-gray-400 ">
        生年月日
      </label>
      <input
        {...register('birthday')}
        type="date"
        id="birthday"
        className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
      ></input>
      {errors.birthday && <p className="text-red-600">{errors.birthday?.message}</p>}

      {/* 自己紹介 */}
      <label htmlFor="紹介文" className="block mt-8 text-base text-gray-400">
        紹介文
      </label>
      <textarea
        id="紹介文"
        placeholder="2022年1月1から活動を始めました。応援よろしくお願いします!!"
        {...register('writing', {
          maxLength: {
            value: 140,
            message: '紹介文は140文字以下で入力してください',
          },
        })}
        className="pt-2 pl-2 mt-2 w-full h-32 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring appearance-none cursor-pointer"
      />
      {errors.writing && <p className="text-red-600">{errors.writing?.message}</p>}
      {user?.genre ? (
        <>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button
                  className="                       text-white bg-orange-100 rounded-lg h-10  hover:bg-orange-200 focus:outline-none 
flex items-center justify-between w-full px-2 py-2 mt-8 text-base"
                >
                  <span>各URLの編集はこちら</span>
                  <AiFillCaretDown className={`${open ? 'transform rotate-180' : ''}  `} />
                </Disclosure.Button>
                <Disclosure.Panel className=" pt-4 pb-2 text-sm text-gray-500">
                  {/* Twitter */}
                  <label htmlFor="twitter" className="block text-base text-gray-400">
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    placeholder="https://twitter.com/ユーザー名"
                    {...register('twitterUrl', {
                      pattern: {
                        value: /(https|http):\/\/(twitter.com)\/([A-Za-z0-9_]*)/,
                        message: '正しい形式で入力してください',
                      },
                    })}
                    className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring cursor-pointer"
                  />
                  {errors.twitterUrl && <p className="text-red-600">{errors.twitterUrl?.message}</p>}
                  {/* Instagram */}
                  <label htmlFor="instagram" className="block mt-8 text-base text-gray-400 ">
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    placeholder="https://www.instagram.com/ユーザー名"
                    {...register('instagramUrl', {
                      pattern: {
                        value: /(https|http):\/\/(www.instagram.com)\/([A-Za-z0-9_]*)/,
                        message: '正しい形式で入力してください',
                      },
                    })}
                    className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring cursor-pointer"
                  />
                  {errors.instagramUrl && <p className="text-red-600">{errors.instagramUrl?.message}</p>}
                  {/* HomePage */}
                  <label htmlFor="homepage" className="block mt-8 text-base text-gray-400 ">
                    HomePage
                  </label>
                  <input
                    type="url"
                    id="homepage"
                    placeholder="https://~~~~"
                    {...register('homepageUrl', {
                      pattern: {
                        value: /(https|http):\/\//,
                        message: '正しい形式で入力してください',
                      },
                    })}
                    className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring cursor-pointer"
                  />
                  {errors.homepageUrl && <p className="text-red-600">{errors.homepageUrl?.message}</p>}
                  {/* その他 */}
                  <label htmlFor="other" className="block mt-8 text-base text-gray-400 ">
                    その他
                  </label>
                  <input
                    type="url"
                    id="other"
                    placeholder="https://~~~~"
                    {...register('otherUrl', {
                      pattern: {
                        value: /(https|http):\/\//,
                        message: '正しい形式で入力してください',
                      },
                    })}
                    className="pl-2 mt-2 w-full h-10 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring cursor-pointer"
                  />
                  {errors.otherUrl && <p className="text-red-600">{errors.otherUrl?.message}</p>}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </>
      ) : null}
      <div className="mt-8">
        <FormButton title="保存" disabled={isLoading} />
      </div>
    </form>
  );
};

export default memo(ProfileEditing);
