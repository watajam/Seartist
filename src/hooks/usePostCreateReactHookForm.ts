import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../../lib/firebase";
import { FormData } from "../../types/FormData";
import { useRecoilSetEmail } from "./useRecoilSetEmail";

export const usePostCreateReactHookForm = (url: string) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
  }, [userEmail]);

  //追加
  const postsRef =
    userEmail !== null
      ? collection(db, "users", userEmail.email, "posts")
      : null;

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user.genre !== "" && user.genre !== null) {
        await addDoc(postsRef, {
          image: data.image,
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
      } else {
        alert("投稿できるのはクリエイターアカウントのみです");
      }
      router.push(url);
    },
    [user]
  );

  return { register, handleSubmit, errors, onSubmit, setValue };
};
