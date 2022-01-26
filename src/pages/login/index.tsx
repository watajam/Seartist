import HeaderLayout from '../../components/Layout/HeaderLayout';
import LoginForm from '../../components/Form/LoginForm';
import { NextPage } from 'next';
import { useAuthAutoLogin } from '../../../FireBase/Authentication/uesAuthAutoLogin';

//ログイン&新規登録画面
const Login: NextPage = () => {
  useAuthAutoLogin();

  return (
    <HeaderLayout>
      <LoginForm />
    </HeaderLayout>
  );
};

export default Login;
