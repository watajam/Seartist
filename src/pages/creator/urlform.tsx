import UrlFormList from "../../components/Form/FormList/UrlFormList";
import FormButton from "../../components/Form/FormButton";
import HeaderLayout from "../../components/Layout/HeaderLayout";
import FormProfileTitle from "../../components/Form/FormProfileTitle";
import SelfLntroductionFormSubTitle from "../../components/Form/SelfLntroductionFormSubTitle";

const UrlForm = () => {
  return (
    <HeaderLayout>
      <FormProfileTitle />
      <SelfLntroductionFormSubTitle />
      <UrlFormList>
        <FormButton backButtonUrl="/creator" title="次へ" />
      </UrlFormList>
    </HeaderLayout>
  );
};

export default UrlForm;
