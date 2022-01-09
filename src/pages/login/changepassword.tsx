import HeaderLayout from '../../components/Layout/HeaderLayout';
import ResetPassword from '../../components/Form/LoginForm/ResetPassword';
import { NextPage } from 'next';

//パスワードリセットページ
const ChangePasswordPage: NextPage = () => {
  return (
    <HeaderLayout>
      <ResetPassword />
    </HeaderLayout>
  );
};

export default ChangePasswordPage;
