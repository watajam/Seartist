import React, { memo, ReactNode, VFC } from 'react';
import { useQueryUserEmailCheck } from '../../../../FireBase/query/User/useQueryUserEmailCheck';

import { useUrlReactHookForm } from '../../../hooks/useUrlReactHookForm';
import FormProfileTitle from '../FormProfileTitle';

type Props = {
  children: ReactNode;
};

const UrlFormList: VFC<Props> = (props) => {
  const { register, handleSubmit, errors, onSubmit } = useUrlReactHookForm('/creator/selflntroductionform');

  useQueryUserEmailCheck();

  return (
    <>
      <FormProfileTitle title="プロフィール登録" />
      <p className="text-base font-bold text-center text-gray-400 underline mt-6">
        URLを入力するとプロフィールに表示されます
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Twitter */}
        <label htmlFor="twitter" className="block mt-8 text-base text-gray-400 ">
          Twitter
        </label>
        <input
          type="url"
          id="twitter"
          placeholder="URLを入力してください"
          {...register('twitterUrl', {
            pattern: {
              value: /(https|http):\/\/(twitter.com)\/([A-Za-z0-9_]*)/,
              message: '正しい形式で入力してください',
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 appearance-none"
        />
        {errors.twitterUrl && <p className="text-red-600">{errors.twitterUrl?.message}</p>}
        {/* Instagram */}
        <label htmlFor="instagram" className="block mt-8 text-base text-gray-400 ">
          Instagram
        </label>
        <input
          type="url"
          id="instagram"
          placeholder="URLを入力してください"
          {...register('instagramUrl', {
            pattern: {
              value: /(https|http):\/\/(www.instagram.com)\/([A-Za-z0-9_]*)/,
              message: '正しい形式で入力してください',
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 appearance-none"
        />
        {errors.instagramUrl && <p className="text-red-600">{errors.instagramUrl?.message}</p>}
        {/* HomePage */}
        <label htmlFor="homepage" className="block mt-8 text-base text-gray-400 ">
          HomePage
        </label>
        <input
          type="url"
          id="homepage"
          placeholder="URLを入力してください"
          {...register('homepageUrl', {
            pattern: {
              value: /(https|http):\/\//,
              message: '正しい形式で入力してください',
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 appearance-none"
        />
        {errors.homepageUrl && <p className="text-red-600">{errors.homepageUrl?.message}</p>}
        {/* その他 */}
        <label htmlFor="other" className="block mt-8 text-base text-gray-400 ">
          その他
        </label>
        <input
          type="url"
          id="other"
          placeholder="URLを入力してください"
          {...register('otherUrl', {
            pattern: {
              value: /(https|http):\/\//,
              message: '正しい形式で入力してください',
            },
          })}
          className=" w-full h-10 pl-2 mt-2 text-base text-black border border-orange-400 cursor-pointer focus:outline-none focus:ring focus:border-blue-300 appearance-none"
        />
        {errors.otherUrl && <p className="text-red-600">{errors.otherUrl?.message}</p>}
        <div className="mt-14">{props.children}</div>
      </form>
    </>
  );
};

export default memo(UrlFormList);
