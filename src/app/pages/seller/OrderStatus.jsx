import React from 'react';
import {
  useOrderStatusQuery,
  useUpdateOrderStatusMutation,
  AdminTableLayout,
} from '../../../shared';
import { FormControl, Select, MenuItem } from '@mui/material';

export const OrderStatus = () => {
  const { data, error, isLoading } = useOrderStatusQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (orderId, event) => {
    const newStatus = event.target.value;
    try {
      await updateStatus({ oid: orderId, status: newStatus }).unwrap();
      console.log('Status updated!');
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const columns = [
    {
      key: 'order_id',
      label: 'Order ID',
      render: (row) => <span style={{ color: '#9c35c5', fontWeight: 600 }}>{row.order_id}</span>,
    },
    {
      key: 'order_status',
      label: 'Status',
      render: (row) => (
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select value={row.order_status} onChange={(e) => handleStatusChange(row.order_id, e)}>
            <MenuItem value="created">Created</MenuItem>
            <MenuItem value="invoiced">Invoiced</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
            <MenuItem value="unavailable">Unavailable</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      key: 'estimated_delivery_date',
      label: 'Est. Delivery',
    },
    {
      key: 'payment_type',
      label: 'Payment',
    },
    {
      key: 'Installation',
      label: 'Installation',
    },
    {
      key: 'price',
      label: 'Price',
      render: (row) => `$${row.price}`,
    },
    {
      key: 'freight_value',
      label: 'Freight',
      render: (row) => `$${row.freight_value}`,
    },
    {
      key: 'total',
      label: 'Total',
      render: (row) => `$${(Number(row.price) + Number(row.freight_value)).toFixed(2)}`,
    },
  ];

  return (
    <AdminTableLayout
      title="Order Status"
      columns={columns}
      data={data}
      page={0}
      rowsPerPage={10}
      totalCount={data.length}
      isLoading={isLoading}
      isError={!!error}
      getRowId={(row) => row.order_id}
    />
  );
};
