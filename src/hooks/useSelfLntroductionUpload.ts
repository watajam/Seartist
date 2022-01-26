import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useUpdateUsereSelfLntroductionInfo } from '../../FireBase/Mutation/Update/useUpdateUsereSelfLntroductionInfo';
import { storage } from '../../lib/firebase';
import { UserData } from '../../types/UserData';

export type firebaseOnLoadProp = {
  bytesTransferred: number;
  totalBytes: number;
  state: 'error' | 'paused' | 'running' | 'success';
};

//ログインしているユーザーの情報を登録するformをReact Hook Formで作成し写真はDropzoneで作成
export const useSelfLntroductionUpload = () => {
  const { updateUserImageAndWritingInfo } = useUpdateUsereSelfLntroductionInfo();
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [src, setSrc] = useState('/profile.png');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<UserData, 'profilePhoto' | 'writing'>>({
    mode: 'onChange',
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;
    try {
      setMyFiles([...acceptedFiles]);
      handlePreview(acceptedFiles);
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const onDropRejected = () => {
    toast.error('画像のみ受け付けることができます。');
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: ['image/*'],
    onDrop,
    onDropRejected,
  });

  const handleUpload = async (data: Pick<UserData, 'profilePhoto' | 'writing'>) => {
    try {
      if (!myFiles) return;
      const randomValue1 = window.crypto.getRandomValues(new Uint32Array(1));
      const randomValue2 = window.crypto.getRandomValues(new Uint32Array(1));
      const storageRef = ref(storage, `/images/${randomValue1}/${randomValue2}/${myFiles[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, myFiles[0]);

      uploadTask.on(
        'state_changed',
        async (snapshot) => {
          const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error: any) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.error('許可がありません');
              break;
            case 'storage/canceled':
              console.error('アップロードがキャンセルされました');
              break;
            case 'storage/unknown':
              console.error('不明なエラーが発生しました');
              break;
          }
        },
        async () => {
          try {
            const url = await getDownloadURL(storageRef);
            updateUserImageAndWritingInfo(url, data);
          } catch (error) {
            switch (error.code) {
              case 'storage/object-not-found':
                console.log('ファイルが存在しませんでした');
                break;
              case 'storage/unauthorized':
                console.log('許可がありません');
                break;
              case 'storage/canceled':
                console.log('キャンセルされました');
                break;
              case 'storage/unknown':
                console.log('予期せぬエラーが生じました');
                break;
            }
          }
        }
      );
    } catch (error) {
      if (src === '/profile.png') {
        updateUserImageAndWritingInfo('', data);
      } else {
        console.log('エラーキャッチ', error);
      }
    }
  };

  const handlePreview = (files: any) => {
    if (files === null) {
      return;
    }
    const file = files[0];
    if (file === null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result as string);
    };
  };

  return {
    getRootProps,
    getInputProps,
    open,
    handleUpload,
    src,
    register,
    handleSubmit,
    errors,
  };
};
