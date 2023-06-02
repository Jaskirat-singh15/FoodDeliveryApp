import React, { useEffect } from "react";
import { DataTable } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { HiCurrencyRupee } from "../assests/icons";
import { deleteProduct, getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { alertNull, alertSuccess } from "../context/actions/alertAction";

const DBItems = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      })
    }
  });

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      {(products) && (<DataTable
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                className="w-32 h-16 object-contain rounded-md"
                src={rowData.imageURL}
                alt=""
              />
            ),
          },
          { title: "Name", field: "product_name" },
          { title: "Category", field: "product_category" },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="text-2xl font-semibold text-textColor flex items-center justify-center">
                <HiCurrencyRupee className="text-red-400" />
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
        ]}
        data={products}
        
        title="List of Products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              alert("You want to edit " + rowData.productId);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              if (
                window.confirm("Are you sure, you want to perform this action")
              ) {
                deleteProduct(rowData.productId).then((res) => {
                  dispatch(alertSuccess("Product Deleted "));
                  setInterval(() => {
                    dispatch(alertNull());
                  }, 3000);

                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            },
          },
        ]}
      />)}
    </div>
  );
};

export default DBItems;
