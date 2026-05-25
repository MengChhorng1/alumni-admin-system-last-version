import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import SimpleAuthPage from "../pages/auth/SimpleAuthPage";

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const ResourcePage = lazy(() => import("../pages/resources/ResourcePage"));
const SettingsPage = lazy(() => import("../pages/settings/SettingsPage"));

export const routes = [
  { path: "/", element: <Navigate to="/app/dashboard" replace /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/register",
    element: (
      <SimpleAuthPage
        title="Register Admin"
        description="Registration UI placeholder with backend-ready route."
      />
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <SimpleAuthPage
        title="Forgot Password"
        description="Request a password reset link from this screen."
      />
    ),
  },
  {
    path: "/reset-password",
    element: (
      <SimpleAuthPage
        title="Reset Password"
        description="Reset password form route is ready for API integration."
      />
    ),
  },
  {
    path: "/verify-email",
    element: (
      <SimpleAuthPage
        title="Email Verification"
        description="Email verification UI route is ready."
      />
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "resources/:slug", element: <ResourcePage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/app/dashboard" replace /> },
];
