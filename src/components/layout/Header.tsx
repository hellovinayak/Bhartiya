import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, ChevronDown, Shield, Map, AlertTriangle, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAlerts } from '../../contexts/AlertContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { unreadCount } = useAlerts();
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);
  
  const closeMenus = () => {
    setIsOpen(false);
    setProfileOpen(false);
  };
  
  const handleLogout = () => {
    logout();
    closeMenus();
  };
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-army-green-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenus}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" 
              alt="Border Sentinel Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="font-headline font-bold text-xl md:text-2xl">BHARTIYA SEEMA</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'text-white font-semibold' : 'text-army-khaki-100 hover:text-white'}`}
              onClick={closeMenus}
            >
              Home
            </Link>
            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${isActive('/dashboard') ? 'text-white font-semibold' : 'text-army-khaki-100 hover:text-white'}`}
                  onClick={closeMenus}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/incidents" 
                  className={`nav-link ${isActive('/incidents') ? 'text-white font-semibold' : 'text-army-khaki-100 hover:text-white'}`}
                  onClick={closeMenus}
                >
                  Incidents
                </Link>
                <Link 
                  to="/map" 
                  className={`nav-link ${isActive('/map') ? 'text-white font-semibold' : 'text-army-khaki-100 hover:text-white'}`}
                  onClick={closeMenus}
                >
                  Map
                </Link>
              </>
            )}
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <Link to="/alerts" className="relative p-1" onClick={closeMenus}>
                  <Bell className="h-6 w-6 text-army-khaki-100 hover:text-white" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-army-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>
                
                {/* User Profile Menu */}
                <div className="relative">
                  <button 
                    onClick={toggleProfile}
                    className="flex items-center space-x-1 focus:outline-none"
                  >
                    <img 
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full object-cover border-2 border-army-khaki-300"
                    />
                    <span className="hidden md:block text-sm font-medium truncate max-w-[100px]">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.rank}, {user.unit}</p>
                      </div>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-army-green-50 flex items-center space-x-2"
                        onClick={closeMenus}
                      >
                        <UserIcon className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-army-red-600 hover:bg-army-red-50 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="btn btn-secondary text-sm"
                  onClick={closeMenus}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary text-sm"
                  onClick={closeMenus}
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-army-green-700 mt-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`px-2 py-1 rounded ${isActive('/') ? 'bg-army-green-700 font-semibold' : 'hover:bg-army-green-700'}`}
                onClick={closeMenus}
              >
                Home
              </Link>
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`px-2 py-1 rounded flex items-center space-x-2 ${isActive('/dashboard') ? 'bg-army-green-700 font-semibold' : 'hover:bg-army-green-700'}`}
                    onClick={closeMenus}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    to="/incidents" 
                    className={`px-2 py-1 rounded flex items-center space-x-2 ${isActive('/incidents') ? 'bg-army-green-700 font-semibold' : 'hover:bg-army-green-700'}`}
                    onClick={closeMenus}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <span>Incidents</span>
                  </Link>
                  <Link 
                    to="/map" 
                    className={`px-2 py-1 rounded flex items-center space-x-2 ${isActive('/map') ? 'bg-army-green-700 font-semibold' : 'hover:bg-army-green-700'}`}
                    onClick={closeMenus}
                  >
                    <Map className="h-4 w-4" />
                    <span>Map</span>
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`px-2 py-1 rounded flex items-center space-x-2 ${isActive('/profile') ? 'bg-army-green-700 font-semibold' : 'hover:bg-army-green-700'}`}
                    onClick={closeMenus}
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="px-2 py-1 rounded flex items-center space-x-2 text-left text-army-red-300 hover:bg-army-green-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-2 py-1 rounded hover:bg-army-green-700"
                    onClick={closeMenus}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="px-2 py-1 rounded hover:bg-army-green-700"
                    onClick={closeMenus}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;