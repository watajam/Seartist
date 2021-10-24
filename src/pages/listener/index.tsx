import FormButton from "../../components/Form/FormButton";
import FormProfileTitle from "../../components/Form/FormProfileTitle";
import HeaderLayout from "../../components/Layout/HeaderLayout";
import ListenerProfilrFormList from "../../components/Form/FormList/ListenerProfilrFormList";

const Listener = () => {
  return (
    <HeaderLayout>
      <FormProfileTitle />
      <ListenerProfilrFormList>
        <FormButton backButtonUrl="/selection" title="次へ" />
      </ListenerProfilrFormList>
    </HeaderLayout>
  );
};

export default Listener;
