import { atom } from 'recoil';

type User = {
  email: string;
};

//ログインしている人のメールアドレスをグローバルステートに持たせる
export const userEmailState = atom<User>({
  key: 'userEmailState',
  default: null,
});
