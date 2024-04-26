import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage/Homepage";
import LoginPage from "./views/Auth/LoginPage/LoginPage";
import RegisterPage from "./views/Auth/RegisterPage/RegisterPage";
import validateToken from "../core/utils/validateToken";
import Orders from "./views/Orders/Orders";
import Order from "./views/Orders/Order";

const auth = await validateToken();

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        {auth && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<Order />} />
            <Route path="/login" element={<Navigate to={"/"} />} />
            <Route path="/register" element={<Navigate to={"/"} />} />
          </>
        )}
        {!auth && (
          <>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
