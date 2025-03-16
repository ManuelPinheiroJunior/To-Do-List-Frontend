import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import UsersPage from "../pages/Users";


const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer autoClose={3000} position={"top-center"} hideProgressBar={true} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;