import FormButton from "../../components/Form/FormButton";
import SelfLntroductionFormList from "../../components/Form/FormList/SelfLntroductionFormList";
import HeaderLayout from "../../components/Layout/HeaderLayout";

const SelfLntroductionForm = () => {
  return (
    <HeaderLayout>
      <SelfLntroductionFormList>
        <FormButton backButtonUrl="/creator/urlform" title="始める" />
      </SelfLntroductionFormList>
    </HeaderLayout>
  );
};

export default SelfLntroductionForm;
