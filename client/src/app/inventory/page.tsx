"use client";

import Header from "@/components/Header";
import {useGetProductsQuery} from "@/redux/stateApi";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

interface InventoryProps {}

const Inventory: React.FunctionComponent<InventoryProps> = () => {
  const {data: Products, isError, isLoading} = useGetProductsQuery();

  const columns: GridColDef[] = [
    {field: "productId", headerName: "ID", width: 90},
    {field: "name", headerName: "Product Name", width: 200},
    {
      field: "price",
      headerName: "Price",
      width: 110,
      type: "number",
      valueGetter: (value, row) => `$${row.price}`,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 110,
      type: "number",
      valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
    },
    {
      field: "stockQuantity",
      headerName: "Stock Quantity",
      width: 150,
      type: "number",
    },
  ];

  if (isLoading) {
    return <div className="py-4">Loading ...</div>;
  }

  if (isError || !Products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch Products
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={Products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;
