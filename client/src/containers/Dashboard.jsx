import React, { useEffect } from "react";
import { DBLeftSection, DBRightSection } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getAllUsers } from "../api";
import { setAllUserDetails } from "../context/actions/allUsersAction";
import { setAllProducts } from "../context/actions/productActions";

const Dashboard = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.allUsers);

  useEffect(() => {
    console.log(allUsers);
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, []);

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen flex items-center bg-primary">
      <DBLeftSection />
      <DBRightSection />
    </div>
  );
};

export default Dashboard;
