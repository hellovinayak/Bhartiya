import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-army-green-900 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8" />
            <span className="font-headline font-bold text-xl">भारतीय सीमा</span>
          </Link>
        </div>
        <div className="text-center">
          <p className="text-army-khaki-100 text-sm mb-4">
            Secure India's borders with cutting-edge monitoring and rapid response technology. 
            Protecting our nation, empowering our forces.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;