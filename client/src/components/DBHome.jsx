import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getAllUsers } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import { setAllUserDetails } from '../context/actions/allUsersAction';

const DBHome = () => {
  // const products = useSelector((state) => state.products);
  // const dispatch = useDispatch();

  // const allUsers = useSelector((state)=> state.allUsers);

  // useEffect(() => {
  //   if(!allUsers) {
  //     getAllUsers().then((data)=>{ dispatch(setAllUserDetails(data)); });
  //   }
  // }, []);

  // useEffect(() => {
  //   if(!products) {
  //     getAllProducts().then((data)=> {
  //       dispatch(setAllProducts(data));
  //     })
  //   }
  // }, []);
  
  return (
    
    <div>DBHome</div>
  )
}

export default DBHome