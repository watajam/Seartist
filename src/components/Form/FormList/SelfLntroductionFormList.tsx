import React, { memo, ReactNode, VFC } from 'react';
import FormProfileTitle from '../FormProfileTitle';
import { useQueryUserEmailCheck } from '../../../../FireBase/Query/User/useQueryUserEmailCheck';
import { useDropzoneUpload } from '../../../hooks/useDropzoneUpload';
import { useUpdateUsereSelfLntroductionInfo } from '../../../../FireBase/Mutation/Update/useUpdateUsereSelfLntroductionInfo';

type Props = {
  children: ReactNode;
};

//プロフィール登録Form（profilePhoto/writing)
const SelfLntroductionFormList: VFC<Props> = (props) => {
  const { updateUserImageAndWritingInfo, register, handleSubmit, errors } = useUpdateUsereSelfLntroductionInfo();
  const { getRootProps, getInputProps, open, handleUpload, src } = useDropzoneUpload(updateUserImageAndWritingInfo);

  useQueryUserEmailCheck();

  return (
    <>
      <FormProfileTitle title="プロフィール登録" />
      <form onSubmit={handleSubmit(handleUpload)} className="mt-8">
        {/* プロフィール画像追加 */}
        <div {...getRootProps()} className="m-auto w-24 h-24 bg-gray-200 rounded-full outline-none">
          <input {...getInputProps()} />
          <img src={src === '' ? '/profile.png' : src} className="object-cover m-auto w-24 h-24 rounded-full" />
        </div>
        <button onClick={open} className="block m-auto mt-4 text-base text-gray-400" type="button">
          プロフィール写真を追加
        </button>

        {/* 自己紹介 */}
        <label htmlFor="自己紹介" className="block mt-8 text-base text-gray-400 appearance-none">
          自己紹介
        </label>
        <textarea
          id="自己紹介"
          {...register('writing', {
            maxLength: {
              value: 160,
              message: '自己紹介は160文字以下で入力してください',
            },
          })}
          className="pt-2 pl-2 mt-2 w-full h-32 text-base text-black border border-orange-400 focus:border-blue-300 focus:outline-none focus:ring cursor-pointer"
        />
        {errors.writing && <p className="text-red-600">{errors.writing?.message}</p>}
        <div className="mt-14">{props.children}</div>
      </form>
    </>
  );
};

export default memo(SelfLntroductionFormList);
