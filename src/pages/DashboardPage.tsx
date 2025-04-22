import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Shield, AlertTriangle, Map, Bell, UserPlus, Activity } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useAlerts } from '../contexts/AlertContext';
import AlertNotification from '../components/dashboard/AlertNotification';
import IncidentCard from '../components/dashboard/IncidentCard';
import { mockIncidents, mockBorderZones } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { alerts, unreadCount, getProximityAlerts, markAllAsRead } = useAlerts();
  const [nearbyAlerts, setNearbyAlerts] = useState(alerts);
  const [recentIncidents, setRecentIncidents] = useState(mockIncidents);
  
  useEffect(() => {
    if (user) {
      // Get alerts within 50km of the user's current location
      setNearbyAlerts(getProximityAlerts(user));
      
      // Sort incidents by reported date (newest first)
      setRecentIncidents(
        [...mockIncidents].sort((a, b) => 
          new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
        ).slice(0, 3)
      );
    }
  }, [user, alerts, getProximityAlerts]);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };
  
  const getThreatLevelClass = (level: string) => {
    switch (level) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'elevated': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-army-khaki-50 py-6">
        <div className="container mx-auto px-4">
          {/* Welcome Banner */}
          <div className="bg-army-green-700 text-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-headline font-bold">Welcome, {user?.name.split(' ')[0]}</h1>
                <p className="text-army-khaki-100">{user?.rank}, {user?.unit}</p>
              </div>
              <Shield className="h-12 w-12 text-army-khaki-200" />
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Active Incidents</p>
                  <p className="text-xl font-semibold">{mockIncidents.filter(i => i.status !== 'resolved').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <Map className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Border Zones</p>
                  <p className="text-xl font-semibold">{mockBorderZones.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <Bell className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">New Alerts</p>
                  <p className="text-xl font-semibold">{unreadCount}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <UserPlus className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Active Officers</p>
                  <p className="text-xl font-semibold">18</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Incidents */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-b px-6 py-3 flex justify-between items-center">
                  <h2 className="text-lg font-headline font-semibold">Recent Incidents</h2>
                  <a href="/incidents" className="text-army-green-600 text-sm hover:underline">View All</a>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentIncidents.map(incident => (
                    <IncidentCard key={incident.id} incident={incident} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Alerts & Zones */}
            <div className="space-y-6">
              {/* Alerts */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-b px-6 py-3 flex justify-between items-center">
                  <h2 className="text-lg font-headline font-semibold">Nearby Alerts</h2>
                  {unreadCount > 0 && (
                    <button 
                      className="text-army-green-600 text-sm hover:underline"
                      onClick={handleMarkAllAsRead}
                    >
                      Mark All Read
                    </button>
                  )}
                </div>
                <div className="p-4 max-h-[400px] overflow-y-auto">
                  {nearbyAlerts.length > 0 ? (
                    nearbyAlerts.map(alert => (
                      <AlertNotification key={alert.id} alert={alert} />
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No nearby alerts at this time</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Border Zones */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-b px-6 py-3">
                  <h2 className="text-lg font-headline font-semibold">Border Zone Status</h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {mockBorderZones.map(zone => (
                      <li key={zone.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center">
                          <Activity className="h-5 w-5 text-army-green-600 mr-2" />
                          <span>{zone.name}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getThreatLevelClass(zone.threatLevel)}`}>
                          {zone.threatLevel.toUpperCase()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;