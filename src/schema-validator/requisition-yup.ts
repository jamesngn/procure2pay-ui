import * as yup from 'yup';

export const schema = yup
  .object({
    supplierId: yup.string().required('Supplier ID is required').trim(),
    supplierItems: yup.array().of(
      yup.object({
        supplierItemId: yup.string().required('Supplier Item ID is required').trim(),
        quantity: yup
          .number()
          .required('Quantity is required')
          .min(1, 'Quantity must be at least 1')
      })
    )
  })
  .required();
