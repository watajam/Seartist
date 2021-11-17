import { useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { FormData } from "../../types/FormData";
import { useRecoilSetEmail } from "./useRecoilSetEmail";

export const useCreatorAndListenerReactHookForm = (url: string) => {
  const { userEmail } = useRecoilSetEmail();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<
    Pick<FormData, "name" | "userId" | "genre" | "location" | "birthday">
  >({
    mode: "onChange",
  });

  const onSubmit = useCallback(async (data: FormData) => {
    const q = query(
      collection(db, "users"),
      where("userId", "==", data.userId)
    );
    const userId = await getDocs(q);
    if (userId.docs.length === 1) {
      setError("userId", {
        type: "validate",
        message: "このユーザーIDは既に使用されています",
      });
    } else {
      updateDoc(doc(db, "users", auth.currentUser.email), {
        name: data.name,
        userId: data.userId,
        genre: data.genre ? data.genre : "",
        location: data.location,
        birthday: data.birthday,
        email: userEmail?.email,
      })
        .then(() => {
          router.push(url);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
