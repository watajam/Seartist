import HeaderLayout from '../../components/Layout/HeaderLayout';
import LoginForm from '../../components/Form/LoginForm';
import { NextPage } from 'next';

//ログイン&新規登録画面
const Login: NextPage = () => {
  return (
    <HeaderLayout>
      <LoginForm />
    </HeaderLayout>
  );
};

export default Login;
