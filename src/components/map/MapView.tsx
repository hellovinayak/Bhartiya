import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { mockIncidents, mockBorderZones, currentUser } from '../../data/mockData';
import { BorderIncident, BorderZone } from '../../types';

const getSeverityColor = (severity: BorderIncident['severity']) => {
  switch (severity) {
    case 'critical': return '#dc2626'; // red-600
    case 'high': return '#ea580c'; // orange-600
    case 'medium': return '#d97706'; // amber-600
    case 'low': return '#16a34a'; // green-600
    default: return '#2563eb'; // blue-600
  }
};

const getStatusColor = (status: BorderIncident['status']) => {
  switch (status) {
    case 'reported': return '#2563eb'; // blue-600
    case 'investigating': return '#d97706'; // amber-600
    case 'resolved': return '#16a34a'; // green-600
    case 'false-alarm': return '#6b7280'; // gray-500
    default: return '#2563eb'; // blue-600
  }
};

const getThreatLevelColor = (threatLevel: BorderZone['threatLevel']) => {
  switch (threatLevel) {
    case 'normal': return '#16a34a'; // green-600
    case 'elevated': return '#d97706'; // amber-600
    case 'high': return '#dc2626'; // red-600
    default: return '#2563eb'; // blue-600
  }
};

// Custom marker icons
const createCustomIcon = (severity: BorderIncident['severity'], status: BorderIncident['status']) => {
  return divIcon({
    className: '',
    html: `<div style="background-color: ${getSeverityColor(severity)}; 
                       border: 2px solid ${getStatusColor(status)}; 
                       width: 12px; 
                       height: 12px; 
                       border-radius: 50%; 
                       box-shadow: 0 0 0 2px white;">
          </div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
};

const userLocationIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapView: React.FC = () => {
  const [activeIncident, setActiveIncident] = useState<BorderIncident | null>(null);
  const navigate = useNavigate();
  
  // Center on current user's location or default to a position in India
  const defaultPosition: [number, number] = currentUser 
    ? [currentUser.location.lat, currentUser.location.lng] 
    : [32.7177, 74.8573]; // Default: Near Jammu
  
  const handleIncidentClick = (incident: BorderIncident) => {
    setActiveIncident(incident);
  };
  
  const handleViewDetails = (incidentId: string) => {
    navigate(`/incidents/${incidentId}`);
  };

  return (
    <div className="h-[calc(100vh-64px)] border rounded-lg overflow-hidden shadow-md">
      <MapContainer center={defaultPosition} zoom={11} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Border Zones */}
        {mockBorderZones.map(zone => (
          <Circle
            key={zone.id}
            center={[zone.boundaries[0].lat, zone.boundaries[0].lng]}
            radius={1000}
            pathOptions={{
              color: getThreatLevelColor(zone.threatLevel),
              fillColor: getThreatLevelColor(zone.threatLevel),
              fillOpacity: 0.2,
            }}
          >
            <Tooltip direction="top" opacity={0.9} permanent>
              {zone.name} - {zone.threatLevel.toUpperCase()}
            </Tooltip>
          </Circle>
        ))}
        
        {/* Incidents */}
        {mockIncidents.map(incident => (
          <Marker
            key={incident.id}
            position={[incident.location.lat, incident.location.lng]}
            icon={createCustomIcon(incident.severity, incident.status)}
            eventHandlers={{
              click: () => handleIncidentClick(incident),
            }}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-semibold mb-1">{incident.title}</h3>
                <p className="text-xs text-gray-600 mb-1">{incident.description.substring(0, 100)}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    incident.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    incident.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    incident.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {incident.severity.toUpperCase()}
                  </span>
                  <button
                    onClick={() => handleViewDetails(incident.id)}
                    className="text-xs bg-army-green-600 hover:bg-army-green-700 text-white py-0.5 px-2 rounded"
                  >
                    Details
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Current User Location */}
        {currentUser && (
          <Marker position={[currentUser.location.lat, currentUser.location.lng]} icon={userLocationIcon}>
            <Popup>
              <div>
                <h3 className="font-semibold">{currentUser.name}</h3>
                <p className="text-xs">{currentUser.rank}, {currentUser.unit}</p>
                <p className="text-xs">Your Current Position</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;