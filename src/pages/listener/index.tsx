import FormButton from "../../components/Form/FormButton";
import HeaderLayout from "../../components/Layout/HeaderLayout";
import ListenerProfilrFormList from "../../components/Form/FormList/ListenerProfilrFormList";
import { VFC } from "react";

const Listener: VFC = () => {
  return (
    <HeaderLayout>
      <ListenerProfilrFormList>
        <FormButton backButtonUrl="/selection" title="次へ" />
      </ListenerProfilrFormList>
    </HeaderLayout>
  );
};

export default Listener;
