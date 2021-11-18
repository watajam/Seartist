import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { auth, db, storage } from "../../lib/firebase";
import { FormData } from "../../types/FormData";
import { useRecoilSetEmail } from "./useRecoilSetEmail";

export type firebaseOnLoadProp = {
  bytesTransferred: number;
  totalBytes: number;
  state: "error" | "paused" | "running" | "success";
};

export const usePostCreatUpload = () => {
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [src, setSrc] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    Pick<
      FormData,
      | "image"
      | "writing"
      | "eventName"
      | "genre"
      | "location"
      | "eventLocation"
      | "eventDate"
      | "openTime"
      | "closeTime"
      | "minAmount"
      | "maxAmount"
      | "coupon"
      | "tickets"
    >
  >({
    mode: "onChange",
  });
  const router = useRouter();

  const [user, setUser] = useState<Pick<FormData, "genre">>(null);
  const { userEmail } = useRecoilSetEmail();

  // ユーザー情報取得
  useEffect(() => {
    if (userEmail !== null) {
      const postsRef = doc(db, "users", userEmail.email);
      const unsubscribe = onSnapshot(postsRef, (snapshot) => {
        setUser({
          genre: snapshot.data().genre,
        });
      });
      return () => unsubscribe();
    }
    if (user?.genre === "" || user?.genre === undefined) {
      alert("投稿できるのはクリエイターアカウントのみです");
      router.push("/posts");
    }
  }, [userEmail]);

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
      | "writing"
      | "eventName"
      | "genre"
      | "location"
      | "eventLocation"
      | "eventDate"
      | "openTime"
      | "closeTime"
      | "minAmount"
      | "maxAmount"
      | "coupon"
      | "tickets"
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
            const postsRef = collection(
              db,
              "users",
              auth.currentUser.email,
              "posts"
            );
            await addDoc(postsRef, {
              image: url,
              writing: data.writing,
              eventName: data.eventName,
              genre: data.genre,
              location: data.location,
              eventLocation: data.eventLocation,
              eventDate: data.eventDate,
              openTime: data.openTime,
              closeTime: data.closeTime,
              minAmount: data.minAmount,
              maxAmount: data.maxAmount,
              coupon: data.coupon,
              tickets: data.tickets,
              timestamp: serverTimestamp(),
              email: userEmail?.email,
            });

            router.push("/posts");
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
      if (src === "") {
        const postsRef = collection(
          db,
          "users",
          auth.currentUser.email,
          "posts"
        );
        await addDoc(postsRef, {
          image: "",
          writing: data.writing,
          eventName: data.eventName,
          genre: data.genre,
          location: data.location,
          eventLocation: data.eventLocation,
          eventDate: data.eventDate,
          openTime: data.openTime,
          closeTime: data.closeTime,
          minAmount: data.minAmount,
          maxAmount: data.maxAmount,
          coupon: data.coupon,
          tickets: data.tickets,
          timestamp: serverTimestamp(),
          email: userEmail?.email,
        });
        router.push("/posts");
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
    errors,
  };
};
