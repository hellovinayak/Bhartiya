import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Alert, BorderIncident, User } from '../types';
import { mockAlerts, mockIncidents } from '../data/mockData';
import { useAuth } from './AuthContext';

interface AlertContextType {
  alerts: Alert[];
  unreadCount: number;
  markAsRead: (alertId: string) => void;
  markAllAsRead: () => void;
  getProximityAlerts: (user: User) => Alert[];
  getIncidentDetails: (incidentId: string) => BorderIncident | undefined;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Calculate distance between two points in km using Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const { user } = useAuth();
  
  // Filter alerts based on proximity to the current user (within 50km)
  const getProximityAlerts = (user: User): Alert[] => {
    if (!user) return [];
    
    return alerts.filter(alert => {
      const distance = calculateDistance(
        user.location.lat, 
        user.location.lng, 
        alert.location.lat, 
        alert.location.lng
      );
      return distance <= 50; // Within 50km
    });
  };
  
  const unreadCount = alerts.filter(alert => !alert.read).length;
  
  const markAsRead = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };
  
  const markAllAsRead = () => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => ({ ...alert, read: true }))
    );
  };
  
  const getIncidentDetails = (incidentId: string): BorderIncident | undefined => {
    return mockIncidents.find(incident => incident.id === incidentId);
  };
  
  // Simulate receiving new alerts periodically
  useEffect(() => {
    // Only run this effect if user is authenticated
    if (!user) return;
    
    const interval = setInterval(() => {
      // 10% chance of new alert every 30 seconds (for demo purposes)
      if (Math.random() < 0.1) {
        const randomIncident = mockIncidents[Math.floor(Math.random() * mockIncidents.length)];
        const newAlert: Alert = {
          id: `a${Date.now()}`,
          incidentId: randomIncident.id,
          title: `New Alert: ${randomIncident.title}`,
          message: `New activity detected related to incident "${randomIncident.title}". Please check immediately.`,
          severity: randomIncident.severity,
          timestamp: new Date().toISOString(),
          read: false,
          location: randomIncident.location
        };
        
        setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [user]);
  
  return (
    <AlertContext.Provider value={{ 
      alerts, 
      unreadCount, 
      markAsRead, 
      markAllAsRead,
      getProximityAlerts,
      getIncidentDetails
    }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};