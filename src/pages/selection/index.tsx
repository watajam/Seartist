import { NextPage } from 'next';
import React from 'react';
import HeaderLayout from '../../components/Layout/HeaderLayout';
import Selection from '../../components/Selection';

//クリエター or 一般ユーザを選択するページ
const SelectionPage: NextPage = () => {
  return (
    <HeaderLayout>
      <Selection />
    </HeaderLayout>
  );
};

export default SelectionPage;
