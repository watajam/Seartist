import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { auth, db, storage } from "../../lib/firebase";
import { FormData } from "../../types/FormData";

export type firebaseOnLoadProp = {
  bytesTransferred: number;
  totalBytes: number;
  state: "error" | "paused" | "running" | "success";
};

export const useProfileEditUpload = () => {
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [src, setSrc] = useState("/profile.png");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<
    Pick<
      FormData,
      | "image"
      | "name"
      | "userId"
      | "birthday"
      | "genre"
      | "location"
      | "writing"
      | "twitterUrl"
      | "instagramUrl"
      | "homepageUrl"
      | "otherUrl"
    >
  >({
    mode: "onChange",
  });
  const router = useRouter();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;
    try {
      setMyFiles([...acceptedFiles]);
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

  const handleUpload = async (
    data: Pick<
      FormData,
      | "image"
      | "name"
      | "userId"
      | "birthday"
      | "genre"
      | "location"
      | "writing"
      | "twitterUrl"
      | "instagramUrl"
      | "homepageUrl"
      | "otherUrl"
    >
  ) => {
    try {
      if (!myFiles) return;
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
        async () => {
          try {
            const url = await getDownloadURL(storageRef);
            const q = query(
              collection(db, "users"),
              where("userId", "==", data.userId),
              where("email", "==", auth.currentUser?.email)
            );

            const currentUser = await getDocs(q);
            if (currentUser.docs.length !== 1) {
              setError("userId", {
                type: "validate",
                message: "このユーザーIDは既に使用されています",
              });
            } else {
              await updateDoc(doc(db, "users", auth.currentUser.email), {
                image: url,
                name: data.name,
                userId: data.userId,
                genre: data.genre ? data.genre : "",
                location: data.location,
                birthday: data.birthday,
                writing: data.writing,
                twitterUrl: data.twitterUrl,
                instagramUrl: data.instagramUrl,
                homepageUrl: data.homepageUrl,
                otherUrl: data.otherUrl,
              });
              router.back();
            }
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
      if (src === "/profile.png") {
        const q = query(
          collection(db, "users"),
          where("userId", "==", data.userId),
          where("email", "==", auth.currentUser?.email)
        );

        const currentUser = await getDocs(q);
        if (currentUser.docs.length !== 1) {
          setError("userId", {
            type: "validate",
            message: "このユーザーIDは既に使用されています",
          });
        } else {
          await updateDoc(doc(db, "users", auth.currentUser.email), {
            name: data.name,
            userId: data.userId,
            genre: data.genre ? data.genre : "",
            location: data.location,
            birthday: data.birthday,
            writing: data.writing,
            twitterUrl: data.twitterUrl,
            instagramUrl: data.instagramUrl,
            homepageUrl: data.homepageUrl,
            otherUrl: data.otherUrl,
          });
          router.back();
        }
      } else {
        console.log("エラーキャッチ", error);
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
    setValue,
    errors,
  };
};
