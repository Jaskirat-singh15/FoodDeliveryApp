import React, { useEffect,useState } from 'react';
import {Header, OrderData} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../api';
import { setOrders } from '../context/actions/ordersAction';

const UserOrder = () => {
  const user = useSelector((state)=>state.user);
  const order = useSelector((state)=>state.order);
  const dispatch=useDispatch();

  const [userOrders, setuserOrders] = useState(null);

  useEffect(()=>{

    if(!order){
      // console.log("in use effect if",order);
      getAllOrder().then((data)=>{
        dispatch(setOrders(data));
        setuserOrders(data.filter((item) => item.userId === user?.user_id));
      });
    }else{
      setuserOrders(order.filter((item) => item.userId === user?.user_id));
    }
  },[order])
  return (
    <main className='w-screen min-h-screen flex items-center justify-start flex-col bg-primary'>
      <Header/>
      <div className='w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24'>
      {userOrders?.length>0 ? (userOrders.map((item,i)=>(
        <OrderData key={i} index={i} data = {item} admin={false} />))) : (<>
        <h1 className='text-[72px] text-headingColor fond-bold '>NO Data </h1>
        </>
      )}
      </div>
    </main>
  )
}

export default UserOrder;