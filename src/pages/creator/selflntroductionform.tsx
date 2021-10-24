import FormButton from "../../components/Form/FormButton";
import SelfLntroductionFormList from "../../components/Form/FormList/SelfLntroductionFormList";
import FormProfileTitle from "../../components/Form/FormProfileTitle";
import HeaderLayout from "../../components/Layout/HeaderLayout";

const SelfLntroductionForm = () => {
  return (
    <HeaderLayout>
      <FormProfileTitle />
      <SelfLntroductionFormList>
        <FormButton backButtonUrl="/creator/urlform" title="始める" />
      </SelfLntroductionFormList>
    </HeaderLayout>
  );
};

export default SelfLntroductionForm;
