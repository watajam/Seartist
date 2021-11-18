import React, { VFC } from 'react';
import HeaderLayout from '../../components/Layout/HeaderLayout';
import ResetPassword from '../../components/Form/LoginForm/ResetPassword';

const ChangePasswordPage: VFC = () => {
  return (
    <HeaderLayout>
      <ResetPassword />
    </HeaderLayout>
  );
};

export default ChangePasswordPage;
