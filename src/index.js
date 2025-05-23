import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
} from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import useAuth
import Root from "./routes/Root";
import Login from "./routes/Login";
import Explore from "./routes/Explore";
import Search from "./routes/Search";
import Account from "./routes/Account";
import ManageAccount from "./routes/ManageAccount";
import Profile from "./routes/Profile";
import ManageNotifications from "./routes/ManageNotifications";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FAQ from "./routes/FAQ";
import ContactUs from "./routes/ContactUs";
import HelpAndFAQs from "./routes/HelpAndFAQs";
import PrivacyAndSecurity from "./routes/PrivacyAndSecurity";
import Pals from "./routes/Pals";
import Runs from "./routes/Runs";
import PlansAndBilling from "./routes/PlansAndBilling";
import Conversation from "./routes/Conversation";
import Messages from "./routes/Messages";
import PostRun from "./components/PostRunForm";

// Helper component for route protection
const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

// ROUTES
const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to="/explore" replace />,
      },
      { path: "login", element: <Login /> },
      { path: "explore", element: <Explore /> },
      { path: "pals", element: <Pals /> },
      { path: "runs", element: <Runs /> },
      { path: "search", element: <Search /> },
      {
        path: "account/:userId",
        element: (
          <RequireAuth>
            <Account />
          </RequireAuth>
        ),
      },
      {
        path: "account/manageaccount/:userId",
        element: (
          <RequireAuth>
            <ManageAccount />
          </RequireAuth>
        ),
      },
      {
        path: "account/managenotifications/:userId",
        element: (
          <RequireAuth>
            <ManageNotifications />
          </RequireAuth>
        ),
      },
      { 
        path: "account/helpandfaqs",
        element: (
          <RequireAuth>
            <HelpAndFAQs />
          </RequireAuth>
        ),
      },
      {
        path: "account/helpandfaqs/faqs",
        element: (
          <RequireAuth>
            <FAQ />
          </RequireAuth>
        ),
      },
      {
        path: "account/helpandfaqs/contactus",
        element: (
          <RequireAuth>
            <ContactUs />
          </RequireAuth>
        ),
      },
      { path: "profile/:userId", element: <Profile /> },
      {
        path: "account/privacyandsecurity/:userId",
        element: (
          <RequireAuth>
            <PrivacyAndSecurity />
          </RequireAuth>
        ),
      },
      {
        path: "account/plansandbilling/:userId",
        element: (
          <RequireAuth>
            <PlansAndBilling />
          </RequireAuth>
        ),
      },
      {
      path: "conversation/:conversationId",
      element: (
        <RequireAuth>
          <Conversation />
        </RequireAuth>
      ),
    },
    {
      path: "messages",
      element: (
        <RequireAuth>
          <Messages />
        </RequireAuth>
      ),
    },
    {
      path: "postrun",
      element: (
        <RequireAuth>
          <PostRun />
        </RequireAuth>
      ),
    }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <AuthProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>
);
