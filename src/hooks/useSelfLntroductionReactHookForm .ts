import { useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "@firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { FormData } from "../../types/FormData";

export const useSelfLntroductionReactHookForm = (url: string) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Pick<FormData, "image" | "writing">>({
    mode: "onChange",
  });

  const onSubmit = useCallback(async (data: FormData) => {
    await updateDoc(doc(db, "users", auth.currentUser.email), {
      image: data.image,
      writing: data.writing,
    });
    router.push(url);
  }, []);

  return { register, handleSubmit, errors, onSubmit, setValue };
};
