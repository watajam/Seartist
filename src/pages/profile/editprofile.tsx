import ProfileEditing from '../../components/Profile/ProfileEditing';
import ProfileEditLayout from '../../components/Layout/ProfileEditLayout';
import { NextPage } from 'next';

//プロフィールの編集ページ
const Editprofile: NextPage = () => {
  return (
    <ProfileEditLayout>
      <ProfileEditing />
    </ProfileEditLayout>
  );
};

export default Editprofile;
