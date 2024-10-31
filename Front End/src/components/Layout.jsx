import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserCog, Menu, X, MessageSquare } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/' },
    { icon: UserCog, text: 'Therapist Requests', path: '/therapist-requests' },
    { icon: Users, text: 'Users', path: '/users' },
    { icon: MessageSquare, text: 'Contact Messages', path: '/contact' },
  ];

  return (
    <div className="flex h-screen bg-prime-white">
      {/* Hamburger menu for mobile */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-prim-button text-white rounded-md lg:hidden hover:bg-hover-button transition-all"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition duration-200 ease-in-out lg:relative lg:flex z-40 w-64 bg-prim-dark text-black`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 text-black">HoCare Admin</h1>
            <nav>
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-all ${
                      isActive 
                        ? 'bg-prim-button text-white' 
                        : 'text-black hover:bg-hover-button hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.text}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}