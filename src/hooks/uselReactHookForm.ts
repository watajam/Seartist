import { useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  userId: string;
  genre: string;
  location: string;
  birthday: string;
  image: string;
  writing: string;
  twitterUrl: string;
  instagramUrl: string;
  homepageUrl: String;
  otherUrl: String;
  eventName: string;
  eventLocation: string;
  eventDate: string;
  openTime: string;
  closeTime: string;
  minAmount: string;
  maxAmount: string;
  coupon: string;
  tickets: string;
  search: string;
};

export const useReactHookForm = (url: string) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = useCallback((data: FormData) => {
    console.log(data);
    router.push(url);
  }, []);

  return { register, handleSubmit, errors, onSubmit, setValue };
};
