import { NextPage } from 'next';
import React, { VFC } from 'react';
import HeaderLayout from '../../components/Layout/HeaderLayout';
import Selection from '../../components/Selection';

const SelectionPage: NextPage = () => {
  return (
    <HeaderLayout>
      <Selection />
    </HeaderLayout>
  );
};

export default SelectionPage;
