import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { HeaderTitle } from '@/layout/app-layout';

import CreateRequisitionV2 from './components/create-requisition/index-v2';
import RequisitionTable from './components/requisition-table';

const RequisitionPage: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/create" element={<CreateRequisitionV2 />} />
      </Routes>

      <HeaderTitle>Requisition</HeaderTitle>

      <RequisitionTable />
    </>
  );
};

export default RequisitionPage;
