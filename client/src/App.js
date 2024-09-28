import React from "react";
import Home from "./Components/Home/Home";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Category from "./Components/Category/Category";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Brand from "./Components/Brands/Brand";
import Bill from "./Components/Bill/Bill";
import Product from "./Components/Product/Product";
import EditBill from "./Components/Bill/EditBill";
import BillDetails from "./Components/Bill/BillDetails";
import ProductEdit from "./Components/Product/EditProduct";
import User from "./Components/Admin/Users/Users";
import Settings from "./Components/Admin/Settings/Settings";
import UserProtectedRoute from "./Components/UserProtectedRoute";
import AuthProvider from "./Context/AuthContext";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";
import PageNotFound from "./Components/ErrorPage/PageNotFound";
import CreateBill from "./Components/Bill/CreateBill";
import CreateProduct from "./Components/Product/CreateProduct";

const App = () => {
  return (
    <>
      <StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route element={<UserProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bill" element={<Bill />} />
                <Route path="/bill/create" element={<CreateBill />} />
                <Route path="/bill/edit/:id" element={<EditBill />} />
                <Route path="/bill/details" element={<BillDetails />} />
                <Route path="/brands" element={<Brand />} />
                <Route path="/category" element={<Category />} />
                {/* <Route path="/settings" element={<Setting />} /> */}
                <Route path="/product" element={<Product />} />
                <Route path="/product/create" element={<CreateProduct />} />
                <Route path="/product/edit/:id" element={<ProductEdit />} />
              </Route>

              <Route element={<AdminProtectedRoute />}>
                <Route path="/admin/dashboard" element={<User />} />
                {/* <Route path="/admin/settings" element={<Settings />} /> */}
              </Route>

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token/:userId" element={<ResetPassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </StrictMode>
    </>
  );
};

export default App;
