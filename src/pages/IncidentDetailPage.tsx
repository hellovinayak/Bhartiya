import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, AlertTriangle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import IncidentDetail from '../components/incidents/IncidentDetail';
import { useAuth } from '../contexts/AuthContext';
import { BorderIncident, IncidentUpdate } from '../types';
import { mockIncidents } from '../data/mockData';

const IncidentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [incident, setIncident] = useState<BorderIncident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API call to fetch incident details
    setLoading(true);
    try {
      const foundIncident = mockIncidents.find(inc => inc.id === id);
      
      if (foundIncident) {
        setIncident(foundIncident);
      } else {
        setError('Incident not found');
      }
    } catch (err) {
      setError('Error loading incident details');
    } finally {
      setLoading(false);
    }
  }, [id]);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const handleBack = () => {
    navigate('/incidents');
  };
  
  const handleAddUpdate = (content: string, status?: BorderIncident['status']) => {
    if (!incident || !user) return;
    
    // Create a new update
    const newUpdate: IncidentUpdate = {
      id: `up${incident.updates.length + 1}`,
      content,
      timestamp: new Date().toISOString(),
      updatedBy: user.id,
      status
    };
    
    // Create updated incident object
    const updatedIncident: BorderIncident = {
      ...incident,
      updates: [...incident.updates, newUpdate],
      // Update status if provided
      status: status || incident.status
    };
    
    // Update the incident state
    setIncident(updatedIncident);
    
    // In a real app, we would make an API call to update the incident in the database
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-army-khaki-50 py-6 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-army-green-600"></div>
            <p className="mt-2 text-army-green-700">Loading incident details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !incident) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-army-khaki-50 py-6">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-army-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-army-red-700 mb-2">Error</h2>
              <p className="text-gray-600 mb-4">{error || 'Incident not found'}</p>
              <button 
                onClick={handleBack}
                className="btn btn-primary"
              >
                Return to Incidents
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-army-khaki-50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <button
              className="flex items-center text-army-green-700 hover:text-army-green-900 mr-4"
              onClick={handleBack}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back to Incidents</span>
            </button>
            <h1 className="text-2xl font-headline font-bold text-army-green-800">Incident Details</h1>
          </div>
          
          <IncidentDetail incident={incident} onAddUpdate={handleAddUpdate} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IncidentDetailPage;