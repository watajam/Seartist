import UrlFormList from "../../components/Form/FormList/UrlFormList";
import FormButton from "../../components/Form/FormButton";
import HeaderLayout from "../../components/Layout/HeaderLayout";
import { VFC } from "react";

const UrlForm: VFC = () => {
  return (
    <HeaderLayout>
      <UrlFormList>
        <FormButton backButtonUrl="/creator" title="次へ" />
      </UrlFormList>
    </HeaderLayout>
  );
};

export default UrlForm;
