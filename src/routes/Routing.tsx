import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import UsersPage from "../pages/Users";
import Tasks from "../pages/Tasks";
import CompletedTasks from "../pages/CompletedTasks";
import Books from "../pages/Books";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/books" element={<Books />} />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/completedTasks"
        element={
          <ProtectedRoute>
            <CompletedTasks />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routing;
