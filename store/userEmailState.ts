import { atom } from "recoil";

type User = {
  email: string;
};

export const userEmailState = atom<User>({
  key: "userEmailState",
  default: null,
});
