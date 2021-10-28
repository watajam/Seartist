import React, { VFC } from "react";
import ProfileEditing from "../../components/Profile/ProfileEditing";
import ProfileEditLayout from "../../components/Layout/ProfileEditLayout";

const Editprofile: VFC = () => {
  return (
    <ProfileEditLayout>
      <ProfileEditing />
    </ProfileEditLayout>
  );
};

export default Editprofile;
