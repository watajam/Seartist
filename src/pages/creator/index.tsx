import CreatorProfileFormList from "../../components/Form/FormList/CreatorProfileFormList";
import FormButton from "../../components/Form/FormButton";
import FormProfileTitle from "../../components/Form/FormProfileTitle";
import HeaderLayout from "../../components/Layout/HeaderLayout";

const Creator = () => {
  return (
    <HeaderLayout>
      <FormProfileTitle />
      <CreatorProfileFormList>
        <FormButton backButtonUrl="/selection" title="次へ" />
      </CreatorProfileFormList>
    </HeaderLayout>
  );
};

export default Creator;
