import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { storage } from '../../lib/firebase';
import { PostDetailData } from '../../types/PostDetailData';
import { UserData } from '../../types/UserData';
import { useRecoilSetEmail } from './useRecoilSetEmail';

export type firebaseOnLoadProp = {
  bytesTransferred: number;
  totalBytes: number;
  state: 'error' | 'paused' | 'running' | 'success';
};

//画像ファイルアップロード機能
export const useDropzoneUpload = (setData) => {
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [src, setSrc] = useState('');
  const { userEmail } = useRecoilSetEmail();
  const { mutate } = useSWRConfig();

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

  const handleUpload = async (
    data: Pick<UserData, 'profilePhoto' | 'writing'> | Omit<PostDetailData, 'email' | 'id'>
  ) => {
    try {
      if (!myFiles) return;
      // ローカルのプロフィールデータを更新
      mutate(userEmail ? [`firestore/users/${userEmail.email}`, userEmail.email] : null, { ...data }, false);

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
            setData(url, data);
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
      if (src === '') {
        setData('', data);
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
  };
};
