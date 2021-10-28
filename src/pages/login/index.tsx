import React, { VFC } from "react";
import HeaderLayout from "../../components/Layout/HeaderLayout";
import LoginForm from "../../components/Form/LoginForm";

const Login: VFC = () => {
  return (
    <HeaderLayout>
      <LoginForm />
    </HeaderLayout>
  );
};

export default Login;
