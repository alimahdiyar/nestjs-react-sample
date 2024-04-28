import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "views/HomePage/Homepage";
import LoginPage from "views/Auth/LoginPage/LoginPage";
import RegisterPage from "views/Auth/RegisterPage/RegisterPage";
import validateToken from "core/utils/validateToken";
import Orders from "views/Orders/Orders";
import Order from "views/Orders/Order";
import { useEffect, useState } from "react";

export default () => {
  const [auth, setAuth] = useState<boolean | null>(null);
  useEffect(() => {
    validateToken()
      .then((value) => setAuth(value))
      .catch((e) => alert(String(e)));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {auth === true ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders/:id" element={<Order />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Navigate to={"/"} />} />
            <Route path="/register" element={<Navigate to={"/"} />} />
          </>
        ) : auth === false ? (
          <>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </>
        ) : (
          <Route path="*" element={<div>loading...</div>} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
