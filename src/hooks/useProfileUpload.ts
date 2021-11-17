import { doc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { auth, db, storage } from "../../lib/firebase";

export type firebaseOnLoadProp = {
  bytesTransferred: number;
  totalBytes: number;
  state: "error" | "paused" | "running" | "success";
};

export const useProfileUpload = () => {
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [clickable, setClickable] = useState(false);
  const [src, setSrc] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;
    try {
      setMyFiles([...acceptedFiles]);
      setClickable(true);
      handlePreview(acceptedFiles);
    } catch (error) {
      alert(error);
    }
  }, []);

  const onDropRejected = () => {
    alert("画像のみ受け付けることができます。");
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: ["image/*"],
    onDrop,
    onDropRejected,
  });

  const handleUpload = async (writing: string) => {
    try {
      if (!myFiles) return;

      console.log(myFiles[0].name);

      const storageRef = ref(storage, `/images/${myFiles[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, myFiles[0]);

      uploadTask.on(
        "state_changed",
        async (snapshot) => {
          const progress: number =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
          if (progress === 100) {
            const url = await getDownloadURL(storageRef);
            await updateDoc(doc(db, "users", auth.currentUser.email), {
              image: url,
              writing: writing,
            });
          }
        },
        (error: any) => {
          switch (error.code) {
            case "storage/unauthorized":
              console.error("許可がありません");
              break;
            case "storage/canceled":
              console.error("アップロードがキャンセルされました");
              break;
            case "storage/unknown":
              console.error("不明なエラーが発生しました");
              break;
          }
        },
        () => {
          try {
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
                console.log("ダウンロードしたURL" + url);
              });
            };
          } catch (error) {
            switch (error.code) {
              case "storage/object-not-found":
                console.log("ファイルが存在しませんでした");
                break;
              case "storage/unauthorized":
                console.log("許可がありません");
                break;
              case "storage/canceled":
                console.log("キャンセルされました");
                break;
              case "storage/unknown":
                console.log("予期せぬエラーが生じました");
                break;
            }
          }
        }
      );
    } catch (error) {
      console.log("エラーキャッチ", error);
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
    myFiles,
    clickable,
  };
};
