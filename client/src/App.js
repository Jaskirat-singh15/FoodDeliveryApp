import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Main, Menu, Aboutus } from "./containers";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { app } from "./config/firebase.config";
import { setUserDetails } from "./context/actions/userActions";
import { fadeInOut } from "./animations";
import { motion } from "framer-motion";
import { Alert, MainLoader, CheckOutSuccess, UserOrder, Profile } from "./components";
import { setCartItems } from "./context/actions/cartActions";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            if (data) {
              getAllCartItems(data.user_id).then((items) => {
                console.log(items);
                dispatch(setCartItems(items));
              });
            }
            
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-lightgrey backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />
        <Route path="/user-orders" element={<UserOrder/>}/>
        <Route path="/menu" element={<Menu />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/aboutus" element={<Aboutus />} />

      </Routes>
      {alert?.type && (
        <Alert type={alert?.type} message={alert?.message}>
          er
        </Alert>
      )}
    </div>
  );
};

export default App;
