// src/routes/Root.js
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IoSearch    } from "react-icons/io5";
import { FaUsers, FaRegUser, FaRunning  } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { PiSneakerMoveBold } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";


import {
  HomeIcon3,
  SearchIcon2,
  UserIcon3,
} from "liamc9npm";
import { useNotifications } from "../context/NotificationContext";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase auth functions
import { useAuth } from "../context/AuthContext"; // Import AuthContext for currentUser
import { TopWSideNav, BottomNav} from 'liamc9npm';


export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const { notifications } = useNotifications();
  const { currentUser } = useAuth(); // Access currentUser from AuthContext

  // Scroll to top whenever the location.pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Helper function to check if a path matches the current route, including dynamic paths
  const matchesPath = (pathPattern) => {
    const regex = new RegExp(`^${pathPattern.replace(":id", "[^/]+")}$`);
    return regex.test(location.pathname);
  };

  // Paths where TopNavBar should be hidden
  const topNavHiddenPaths = [
    "/login",
    "/account/:id",
    "/account/plansandbilling/:id",
    "/account/manageaccount/:id",
    "/account/managenotifications/:id",
    "/account/privacyandsecurity/:id",
    "/account/helpandfaqs",
    "/account/helpandfaqs/faqs",
    "/account/helpandfaqs/contactus",
    "/profile/:id",
    "/conversation/:id",
    "/pals"
  ];

  // Paths where BottomNavBar should be hidden
  const bottomNavHiddenPaths = ["/login", "/rooms/:id", "/conversation/:id"];

  const shouldHideTopNav = () =>
    topNavHiddenPaths.some((path) => matchesPath(path));
  const shouldHideBottomNav = () =>
    bottomNavHiddenPaths.some((path) => matchesPath(path));

  // Firebase Logout Function
  const handleLogout = async () => {
    const auth = getAuth(); // Get Firebase Auth instance
    try {
      await signOut(auth); // Sign out the user
      console.log("User logged out");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Dynamic bottom navigation items based on notification context and currentUser
  const bottomNavItems = [
    
    {
      text: "Explore",
      icon: IoSearch,
      path: "/explore",
      hasNotification: notifications.explore,
    },
    {
      text: "Runs",
      icon: PiSneakerMoveBold,
      path: "/runs",
      hasNotification: notifications.runs,
    },
    {
      text: "Pals",
      icon: GrGroup,
      path: "/pals",
      hasNotification: notifications.pals,
    },
    {
      text: "Account",
      icon: FaRegUser,
      path: currentUser ? `/account/${currentUser.uid}` : "/login", // Dynamic user ID path or login fallback
      hasNotification: notifications.account,
    },
  ];

  return (
    <div id="root" className="w-full overflow-x-hidden bg-white">
      {/* Top Navigation Bar */}
      {!shouldHideTopNav() && (
        <>
          {/* Mobile Top Navbar */}
          <div>
            <TopWSideNav
              appName="Joggr"
              signInColor="var(--color-primary)"
              navLinks={[
                { name: "Explore", path: "/explore", Icon: IoSearch },
                { name: "Runs", path: "/runs", Icon: PiSneakerMoveBold },
                { name: "Pals", path: "/pals", Icon: GrGroup },
                { name: "Account", path: currentUser ? `/account/${currentUser.uid}` : "/login", Icon: FaRegUser },
              ]}
              username={currentUser?.displayName || "Guest"}
              profilePic={
                currentUser?.photoURL || "https://via.placeholder.com/50"
              }
              onLogout={handleLogout} // Pass the Firebase logout function
            />
          </div>
          
        </>
      )}

      {/* Bottom Navigation Bar */}
      {!shouldHideBottomNav() && (
        <div className="md:hidden">
          <BottomNav items={bottomNavItems} activeColor="var(--color-primary)"/>
        </div>
      )}

      {/* Main Content with Conditional Margin */}
      <div className={!shouldHideBottomNav() ? "pb-16 md:pb-0" : ""}>
        <Outlet />
      </div>
    </div>
  );
}
