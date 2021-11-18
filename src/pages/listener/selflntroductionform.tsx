import { VFC } from 'react';
import FormButton from '../../components/Form/FormButton';
import SelfLntroductionFormList from '../../components/Form/FormList/SelfLntroductionFormList';
import HeaderLayout from '../../components/Layout/HeaderLayout';

const SelfLntroductionForm: VFC = () => {
  return (
    <HeaderLayout>
      <SelfLntroductionFormList>
        <FormButton backButtonUrl="/listener" title="始める" />
      </SelfLntroductionFormList>
    </HeaderLayout>
  );
};

export default SelfLntroductionForm;
