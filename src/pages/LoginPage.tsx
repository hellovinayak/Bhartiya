import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-camo-pattern bg-cover bg-center relative">
        <div className="absolute inset-0 bg-army-green-900 bg-opacity-80"></div>
        <div className="relative container mx-auto px-4 py-16 flex justify-center">
          <LoginForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;