import React from 'react';

import { HeaderTitle } from '@/layout/app-layout';

import RequisitonTable from './components/requistion-table';

const RequisitionPage: React.FC = () => {
  return (
    <>
      <HeaderTitle>Requisition</HeaderTitle>
      <RequisitonTable />
    </>
  );
};

export default RequisitionPage;
