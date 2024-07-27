// ProductStatus | InterestPolicyStatus
export enum RequisitionStatus {
  UNKNOWN = 0, // Unknown
  AWAITING_APPROVAL = 1, // Waiting for approval
  APPROVED = 2, // Approved
  DECLINED = 3, // Rejected
  EXPIRED = 4, // Expired
  CLOSED = 5 // Closed
}

export const requisitionStatusData = {
  [RequisitionStatus.UNKNOWN]: { label: 'Unknown', color: 'var(--mantine-color-black)' },
  [RequisitionStatus.AWAITING_APPROVAL]: {
    label: 'Awaiting approval',
    color: 'var(--mantine-color-yellow-6)'
  },
  [RequisitionStatus.APPROVED]: { label: 'Approved', color: 'var(--mantine-color-green-6)' },
  [RequisitionStatus.DECLINED]: { label: 'Declined', color: 'var(--mantine-color-red-6)' },
  [RequisitionStatus.EXPIRED]: { label: 'Expired', color: 'var(--mantine-color-red-6)' },
  [RequisitionStatus.CLOSED]: { label: 'Closed', color: 'var(--mantine-color-blue-6)' }
};

export enum SupplierItemState {
  'UNKNOWN' = 0,
  'IN_STOCK' = 1,
  'OUT_OF_STOCK' = 2
}
