import CreatorProfileFormList from "../../components/Form/FormList/CreatorProfileFormList";
import FormButton from "../../components/Form/FormButton";
import HeaderLayout from "../../components/Layout/HeaderLayout";
import { VFC } from "react";

const Creator:VFC = () => {
  return (
    <HeaderLayout>
      <CreatorProfileFormList>
        <FormButton backButtonUrl="/selection" title="次へ" />
      </CreatorProfileFormList>
    </HeaderLayout>
  );
};

export default Creator;
