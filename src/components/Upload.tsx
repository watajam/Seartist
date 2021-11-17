import { doc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import React, { useState, useCallback, VFC } from "react";
import { useDropzone } from "react-dropzone";
import { auth, db, storage } from "../../lib/firebase";
import { useProfileUpload } from "../hooks/useProfileUpload";

export type firebaseOnLoadProp = {
  bytesTransferred: number;
  totalBytes: number;
  state: "error" | "paused" | "running" | "success";
};

const Upload: VFC = () => {
  const {
    getRootProps,
    getInputProps,
    open,
    handleUpload,
    src,
    clickable,
    myFiles,
  } = useProfileUpload();
  // const [myFiles, setMyFiles] = useState<File[]>([]);
  // const [clickable, setClickable] = useState(false);
  // const [src, setSrc] = useState("");

  // const onDrop = useCallback(async (acceptedFiles: File[]) => {
  //   if (!acceptedFiles[0]) return;
  //   try {
  //     setMyFiles([...acceptedFiles]);
  //     setClickable(true);
  //     handlePreview(acceptedFiles);
  //   } catch (error) {
  //     alert(error);
  //   }
  // }, []);

  // const onDropRejected = () => {
  //   alert("画像のみ受け付けることができます。");
  // };

  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: ["image/*"],
  //   onDrop,
  //   onDropRejected,
  // });

  // const handleUpload = async () => {
  //   try {
  //     if (!myFiles) return;

  //     console.log(myFiles[0].name);

  //     //  await firebase.firestore().collection("sample").doc().set({
  //     //    filename: myFiles[0].name,
  //     //    fileUrl: url,
  //     //  });

  //     const storageRef = ref(storage, `/images/${myFiles[0].name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, myFiles[0]);
  //     const url = await getDownloadURL(storageRef);
  //     console.log(url);

  //     // await updateDoc(doc(db, "users", auth.currentUser.email), {
  //     //   image: url,
  //     //   writing: writing,
  //     // });

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress: number =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //         }
  //       },
  //       (error: any) => {
  //         switch (error.code) {
  //           case "storage/unauthorized":
  //             console.error("許可がありません");
  //             break;
  //           case "storage/canceled":
  //             console.error("アップロードがキャンセルされました");
  //             break;
  //           case "storage/unknown":
  //             console.error("不明なエラーが発生しました");
  //             break;
  //         }
  //       },
  //       () => {
  //         try {
  //           () => {
  //             getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
  //               console.log("ダウンロードしたURL" + url);
  //             });
  //           };
  //         } catch (error) {
  //           switch (error.code) {
  //             case "storage/object-not-found":
  //               console.log("ファイルが存在しませんでした");
  //               break;
  //             case "storage/unauthorized":
  //               console.log("許可がありません");
  //               break;
  //             case "storage/canceled":
  //               console.log("キャンセルされました");
  //               break;
  //             case "storage/unknown":
  //               console.log("予期せぬエラーが生じました");
  //               break;
  //           }
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.log("エラーキャッチ", error);
  //   }
  // };

  // const handlePreview = (files: any) => {
  //   if (files === null) {
  //     return;
  //   }
  //   const file = files[0];
  //   if (file === null) {
  //     return;
  //   }
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setSrc(reader.result as string);
  //   };
  // };


  return (
    <div>
      <div className="w-4/5 px-4 py-2 mx-auto my-4 text-center rounded-md">
        <div
          className="bg-gray-400 border-2 border-gray-500 rounded-md"
          {...getRootProps()}
        >
          {/* この中をタップすれば画像を選択できる */}
          <input {...getInputProps()} />
          {myFiles.length === 0 ? (
            <p className="py-4">画像を選択またはドラッグ＆ドロップできます</p>
          ) : (
            <div>
              <>{src && <img src={src} />}</>
            </div>
          )}
        </div>
        <button
          disabled={!clickable}
          type="submit"
          className="px-4 py-2 my-4 bg-gray-200 rounded-md"
          onClick={() => handleUpload("書き込み")}
        >
          UPLOAD
        </button>
      </div>
    </div>
  );
};

export default Upload;
