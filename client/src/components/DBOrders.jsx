import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../api";
import { setOrders } from "../context/actions/ordersAction";

const DBOrders = () => {
  const orders = useSelector((state) =>state.orders);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!orders){
      getAllOrder().then((data)=>{
        dispatch(setOrders(data));
      });
    }
  },[]);
  return <div>DBOrders</div>;
};

export default DBOrders;
