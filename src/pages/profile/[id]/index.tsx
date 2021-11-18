import React, { VFC } from 'react';
import ProfileLayout from '../../../components/Layout/ProfileLayout';
import Profile from '../../../components/Profile';

const ProfilePage: VFC = () => {
  return (
    <ProfileLayout>
      <Profile />
    </ProfileLayout>
  );
};

export default ProfilePage;
