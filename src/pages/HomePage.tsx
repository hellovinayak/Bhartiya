import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, AlertTriangle, MapPin, Clock, Activity } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="bg-cover bg-center relative"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center">
            <Shield className="h-16 w-16 text-white mb-4" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-white leading-tight mb-4">
              BHARTIYA SEEMA
            </h1>
            <p className="text-xl md:text-2xl text-army-khaki-100 mb-8 max-w-3xl">
              Borders aren't just lines on a map — they are the frontlines of courage, held by our warriors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="btn bg-army-green-600 hover:bg-army-green-700 text-white px-8 py-3 rounded-md font-semibold transition-all">
                Login
              </Link>
              <Link to="/signup" className="btn bg-white hover:bg-gray-100 text-army-green-800 px-8 py-3 rounded-md font-semibold transition-all">
                Register
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-army-khaki-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-headline font-bold text-army-green-800 mb-2"></h2>
              <p className="text-army-green-700 max-w-2xl mx-auto">
                
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-army-green-600 mb-4">
                  <AlertTriangle className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-2">Real-time Alerts</h3>
                <p className="text-gray-600">
                  Instant notification system that alerts the nearest officers when border incidents occur, reducing response time.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-army-green-600 mb-4">
                  <MapPin className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-2">Geo-location Tracking</h3>
                <p className="text-gray-600">
                  Precise location tracking of all incidents and personnel for optimal coordination and resource allocation.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-army-green-600 mb-4">
                  <Activity className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-2">Threat Assessment</h3>
                <p className="text-gray-600">
                  Advanced algorithms to categorize threats based on severity, enabling prioritized response to critical situations.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-army-green-600 mb-4">
                  <Clock className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-2">Rapid Response</h3>
                <p className="text-gray-600">
                  Streamlined incident reporting and communication to minimize response times during critical events.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-army-green-600 mb-4">
                  <Shield className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-2">Secure Platform</h3>
                <p className="text-gray-600">
                  Military-grade encryption and secure authentication protocols to ensure sensitive information stays protected.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-army-green-600 mb-4">
                  <Award className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-2">Proven Results</h3>
                <p className="text-gray-600">
                  Demonstrated success in enhancing border security operations and preventing unauthorized incursions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial/Quote Section */}
        <section className="py-16 bg-army-green-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <svg className="h-12 w-12 text-army-khaki-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-2xl font-headline mb-8">
                "हमारे कदम थम नहीं सकते, क्योंकि जब तक एक भी जवान खड़ा है, तब तक भारत की धरती पर कोई खतरा नहीं आ सकता।"
              </blockquote>
              <div className="flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80" alt="Army" className="h-12 w-12 rounded-full object-cover mr-4" />
                <div className="text-left">
                  <p className="font-semibold"></p>
                  <p className="text-army-khaki-300 text-sm"></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-camo-pattern bg-cover bg-center relative">
          <div className="absolute inset-0 bg-army-green-900 bg-opacity-90"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-3xl font-headline font-bold text-white mb-6">Ready to Enhance Border Security?</h2>
            <p className="text-army-khaki-100 max-w-2xl mx-auto mb-8">
              Join our network of military personnel dedicated to protecting India's borders. Get access to cutting-edge technology and real-time alert systems.
            </p>
            <Link to="/signup" className="btn bg-white hover:bg-gray-100 text-army-green-800 px-8 py-3 rounded-md font-semibold transition-all">
              Join Border Sentinel Today
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
