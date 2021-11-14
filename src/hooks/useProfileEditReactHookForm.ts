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

export const useProfileEditReactHookForm = () => {
  const router = useRouter();

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

  const onSubmit = useCallback(async (data: FormData) => {
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
        image: data.image,
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
  }, []);

  return { register, handleSubmit, errors, onSubmit, setValue };
};
