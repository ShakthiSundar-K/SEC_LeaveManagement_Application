import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  ChevronDown,
  Home,
  Calendar,
  Clock,
  History,
  LogOut,
  Settings,
} from "lucide-react";

// CSS styles
const styles = `
  /* Base styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .navbar-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  /* Top Navbar */
  .top-navbar {
    background-color: #088cd4;
    color: white;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 20;
    position: relative;
  }

  .menu-button {
    color: white;
    background: none;
    border: none;
    cursor: pointer;
    display: flex; /* Always show hamburger menu */
  }

  .app-title {
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 1.25rem;
  }

  /* Profile Menu */
  .profile-button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }

  .profile-icon {
    height: 32px;
    width: 32px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-icon svg {
    color: #088cd4;
  }

  .profile-name {
    display: none;
    margin: 0 8px;
  }

  .profile-dropdown {
    position: absolute;
    right: 0;
    margin-top: 8px;
    width: 192px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 30;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px 16px;
    text-align: left;
    color: #4b5563;
    background: none;
    border: none;
    cursor: pointer;
  }

  .dropdown-item:hover {
    background-color: #f3f4f6;
  }

  .dropdown-item svg {
    margin-right: 8px;
  }

  /* Main Content Area */
  .main-content-area {
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  /* Sidebar Navigation */
  .sidebar {
    position: absolute;
    height: 100%;
    width: 256px;
    background-color: white;
    border-right: 1px solid #e5e7eb;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease-in-out;
    z-index: 10;
  }
  
  .sidebar.closed {
    transform: translateX(-100%);
  }

  .nav-list {
    margin-top: 16px;
    list-style-type: none;
  }

  .nav-item-button {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px 24px;
    text-align: left;
    color: #4b5563;
    background: none;
    border: none;
    cursor: pointer;
  }

  .nav-item-button:hover {
    background-color: #eff6ff;
  }

  .nav-item-button.active {
    background-color: #eff6ff;
    color: #088cd4;
    border-left: 4px solid #088cd4;
  }

  .nav-item-icon {
    margin-right: 12px;
  }

  /* Main Content */
  .main-content {
    flex: 1;
    overflow: auto;
    padding: 24px;
    background-color: #f9fafb;
    margin-left: 0;
    transition: margin-left 0.3s ease-in-out;
    width: 100%;
  }
  
  .main-content.sidebar-open {
    margin-left: 256px;
  }

  .content-card {
    background-color: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .content-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 16px;
  }

  .content-text {
    color: #6b7280;
  }

  /* Position relative for profile menu container */
  .profile-menu-container {
    position: relative;
  }

  /* Media queries for responsiveness */
  @media (min-width: 768px) {
    .app-title {
      text-align: left;
      margin-left: 16px;
    }

    .profile-name {
      display: block;
    }
  }
`;

// Route component to simulate navigation
const Route = ({ path, component }) => {
  return component;
};

// Main navbar component that can be used across all pages
export default function NavBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("/dashboard");
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size on initial render and when window is resized
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // On desktop, sidebar should be open by default
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Check on initial render
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    {
      name: "Leave Request",
      path: "/leave-request",
      icon: <Calendar size={20} />,
    },
    { name: "Leave Status", path: "/leave-status", icon: <Clock size={20} /> },
    { name: "History", path: "/history", icon: <History size={20} /> },
  ];

  // Handle navigation
  const navigate = (path) => {
    setCurrentRoute(path);
    // On mobile, close the sidebar after navigation
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Components for each route
  const routeComponents = {
    "/dashboard": (
      <div className='content-card'>
        <h1 className='content-title'>Dashboard</h1>
        <p className='content-text'>
          Welcome to your employee dashboard. Here you can manage all your
          work-related activities.
        </p>
      </div>
    ),
    "/leave-request": (
      <div className='content-card'>
        <h1 className='content-title'>Leave Request</h1>
        <p className='content-text'>Submit your leave requests here.</p>
      </div>
    ),
    "/leave-status": (
      <div className='content-card'>
        <h1 className='content-title'>Leave Status</h1>
        <p className='content-text'>
          Check the status of your leave applications.
        </p>
      </div>
    ),
    "/history": (
      <div className='content-card'>
        <h1 className='content-title'>History</h1>
        <p className='content-text'>
          View your leave history and other activities.
        </p>
      </div>
    ),
  };

  return (
    <>
      <style>{styles}</style>
      <div className='navbar-container'>
        {/* Top Navbar */}
        <div className='top-navbar'>
          {/* Hamburger Menu (always visible) */}
          <button onClick={toggleSidebar} className='menu-button'>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* App Title (center on mobile, left on desktop) */}
          <div className='app-title'>Employee Portal</div>

          {/* Profile Menu (right) */}
          <div className='profile-menu-container'>
            <button onClick={toggleProfileMenu} className='profile-button'>
              <div className='profile-icon'>
                <User size={20} />
              </div>
              <span className='profile-name'>John Doe</span>
              <ChevronDown size={16} />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className='profile-dropdown'>
                <div>
                  <button className='dropdown-item'>
                    <Settings size={16} />
                    <span>Update Profile</span>
                  </button>
                  <button className='dropdown-item'>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className='main-content-area'>
          {/* Side Navigation (with slide effect) */}
          <aside className={`sidebar ${isSidebarOpen ? "" : "closed"}`}>
            <nav>
              <ul className='nav-list'>
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`nav-item-button ${
                        currentRoute === item.path ? "active" : ""
                      }`}
                    >
                      <span className='nav-item-icon'>{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main
            className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}
          >
            <Route
              path={currentRoute}
              component={routeComponents[currentRoute]}
            />
          </main>
        </div>
      </div>
    </>
  );
}
