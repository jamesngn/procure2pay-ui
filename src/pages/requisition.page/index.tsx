import React from 'react';

import { HeaderTitle } from '@/layout/app-layout';

import RequisitionTable from './components/requisition-table';


const RequisitionPage: React.FC = () => {
  return (
    <>
      <HeaderTitle>Requisition</HeaderTitle>
      <RequisitionTable />
    </>
  );
};

export default RequisitionPage;
