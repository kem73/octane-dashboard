import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Select } from "@mantine/core";
import { ReusableTable } from "../../components/shared/generic-table";
import { LoaderCom } from "../../components/shared/loader";
import OrderDetailsModal  from "../ui/models/edit-orders";
import {
  OrderData,
  OrderStatus,
  OrderDetailsResponse,
  OrderTableState,
} from "../../types/orders-types";
import { Column, TableAction } from "../../types/generic-table-types";
import baseURL from "../../services/baseURl";


export const Orders = () => {
  const [state, setState] = useState<OrderTableState>({
    orders: [],
    isModalOpen: false,
    selectedOrder:  undefined,
    loading: true,
  });

  // Fetch Orders from API
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}orders`);
      setState((prev) => ({ ...prev, orders: response.data }));
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Fetch Order Details
  const getOrderDetails = async (id: string) => {
    try {
      const { data } = await axios.get<OrderDetailsResponse>(`${baseURL}orders/${id}`);
      setState((prev) => ({
        ...prev,
        selectedOrder: data,
        isModalOpen: true,
      }));
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  // Update Order 
  const updateOrderStatus = async (id: string, newStatus: OrderStatus) => {
    try {
      const { status } = await axios.patch(`${baseURL}orders/${id}`, { status: newStatus });
      if (status === 200) {
        setState((prev) => ({
          ...prev,
          orders: prev.orders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Delete Order
  const deleteOrder = async (id: string) => {
    try {
      const { status } = await axios.delete(`${baseURL}orders/${id}`);
      if (status === 200) {
        setState((prev) => ({
          ...prev,
          orders: prev.orders.filter((order) => order.id !== id),
        }));
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const columns: Column<OrderData>[] = [
    { accessor: "id", header: "Order ID" },
    { accessor: "customerName", header: "Customer Name" },
    {
      accessor: "orderDate",
      header: "Order Date",
      render: (row) => new Date(row.orderDate).toLocaleDateString(),
    },
    { accessor: "status", header: "Status" },
    {
      accessor: "totalAmount",
      header: "Total Amount",
      render: (row) => `$${row.totalAmount.toFixed(2)}`,
    },
  ];

  // Table Actions (Reusable Buttons & Select)
  const actions: TableAction<OrderData>[] = [
    {
      content: (row) => (
        <Button
          size="xs"
          variant="outline"
          onClick={() => getOrderDetails(row.id)}
        >
          View Details
        </Button>
      ),
    },
    {
      content: (row) => (
        <Button
          size="xs"
          color="red"
          variant="outline"
          onClick={() => deleteOrder(row.id)}
        >
          Delete
        </Button>
      ),
    },
    {
      content: (row) => (
        <Select
          size="xs"
          data={Object.values(OrderStatus)}
          value={row.status}
          onChange={(value) => {
            if (value) updateOrderStatus(row.id, value as OrderStatus);
          }}
        />
      ),
    },
  ];

  if (state.loading) return <LoaderCom />;

  return (
    <div>
      <ReusableTable<OrderData>
        data={state.orders}
        columns={columns}
        actions={actions}
      />
      
      {state.selectedOrder && (
        <OrderDetailsModal
          order={state.selectedOrder}
          isOpen={state.isModalOpen}
          onClose={() =>
            setState((prev) => ({ ...prev, isModalOpen: false }))
          }
        />
      )}
    </div>
  );
};
