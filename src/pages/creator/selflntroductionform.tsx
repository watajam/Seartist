import { NextPage } from 'next';
import FormButton from '../../components/Form/FormButton';
import SelfLntroductionFormList from '../../components/Form/FormList/SelfLntroductionFormList';
import HeaderLayout from '../../components/Layout/HeaderLayout';

//プロフィール登録ページ
const SelfLntroductionForm: NextPage = () => {
  return (
    <HeaderLayout>
      <SelfLntroductionFormList>
        <FormButton backButtonUrl="/creator/urlform" title="始める" />
      </SelfLntroductionFormList>
    </HeaderLayout>
  );
};

export default SelfLntroductionForm;
