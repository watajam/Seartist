import { useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "@firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { FormData } from "../../types/FormData";

export const useProfileEditReactHookForm = (url: string) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<
    Pick<
      FormData,
      "image"
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
    await setDoc(doc(db, "posts", auth.currentUser.email), {
      image: data.image,
      writing: data.writing,
    });
    router.push(url);
  }, []);

  return { register, handleSubmit, errors, onSubmit, setValue };
};
