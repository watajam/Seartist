import CreatorProfileFormList from '../../components/Form/FormList/CreatorProfileFormList';
import FormButton from '../../components/Form/FormButton';
import HeaderLayout from '../../components/Layout/HeaderLayout';
import { NextPage } from 'next';

const Creator: NextPage = () => {
  return (
    <HeaderLayout>
      <CreatorProfileFormList>
        <FormButton backButtonUrl="/selection" title="次へ" />
      </CreatorProfileFormList>
    </HeaderLayout>
  );
};

export default Creator;
