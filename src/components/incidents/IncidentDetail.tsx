import React, { useState } from 'react';
import { BorderIncident } from '../../types';
import { format } from 'date-fns';
import { AlertTriangle, CheckCircle, User, Clock, MapPin, MessageSquare } from 'lucide-react';
import { mockUsers } from '../../data/mockData';

interface IncidentDetailProps {
  incident: BorderIncident;
  onAddUpdate: (content: string, status?: BorderIncident['status']) => void;
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({ incident, onAddUpdate }) => {
  const [updateContent, setUpdateContent] = useState('');
  const [newStatus, setNewStatus] = useState<BorderIncident['status'] | ''>('');
  
  const getSeverityBadge = (severity: BorderIncident['severity']) => {
    switch (severity) {
      case 'critical':
        return <span className="bg-army-red-100 text-army-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Critical</span>;
      case 'high':
        return <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded">High</span>;
      case 'medium':
        return <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded">Medium</span>;
      case 'low':
        return <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Low</span>;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: BorderIncident['status']) => {
    switch (status) {
      case 'reported':
        return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Reported</span>;
      case 'investigating':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">Investigating</span>;
      case 'resolved':
        return <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Resolved</span>;
      case 'false-alarm':
        return <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">False Alarm</span>;
      default:
        return null;
    }
  };
  
  const getReporterName = (reportedBy: string) => {
    const reporter = mockUsers.find(user => user.id === reportedBy);
    return reporter ? reporter.name : 'Unknown Officer';
  };
  
  const getAssigneeName = (assignedTo?: string) => {
    if (!assignedTo) return 'Unassigned';
    const assignee = mockUsers.find(user => user.id === assignedTo);
    return assignee ? assignee.name : 'Unknown Officer';
  };
  
  const handleSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateContent.trim()) {
      onAddUpdate(updateContent, newStatus || undefined);
      setUpdateContent('');
      setNewStatus('');
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className={`p-2 text-center text-white ${
        incident.severity === 'critical' ? 'bg-army-red-600' :
        incident.severity === 'high' ? 'bg-orange-500' :
        incident.severity === 'medium' ? 'bg-amber-500' : 'bg-green-600'
      }`}>
        <h2 className="text-lg font-bold">{incident.title}</h2>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {getSeverityBadge(incident.severity)}
          {getStatusBadge(incident.status)}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{incident.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">Incident Details</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-army-green-700" />
                <span className="text-gray-700">Location: {incident.location.lat.toFixed(4)}, {incident.location.lng.toFixed(4)}</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-army-green-700" />
                <span className="text-gray-700">Reported: {format(new Date(incident.reportedAt), 'PPp')}</span>
              </li>
              <li className="flex items-center">
                <User className="h-4 w-4 mr-2 text-army-green-700" />
                <span className="text-gray-700">Reported by: {getReporterName(incident.reportedBy)}</span>
              </li>
              <li className="flex items-center">
                <User className="h-4 w-4 mr-2 text-army-green-700" />
                <span className="text-gray-700">Assigned to: {getAssigneeName(incident.assignedTo)}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {incident.updates.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Updates</h3>
            <div className="border-l-2 border-gray-200 pl-4 space-y-4">
              {incident.updates.map(update => {
                const updater = mockUsers.find(user => user.id === update.updatedBy);
                return (
                  <div key={update.id} className="relative">
                    <div className="absolute -left-6 mt-1 h-3 w-3 rounded-full bg-army-green-500"></div>
                    <div className="mb-1 flex justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        {updater?.name || 'Unknown'} ({updater?.rank})
                      </span>
                      <span className="text-xs text-gray-400">
                        {format(new Date(update.timestamp), 'PPp')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{update.content}</p>
                    {update.status && (
                      <div className="mt-1">
                        <span className="text-xs text-gray-500">Status changed to: </span>
                        {getStatusBadge(update.status)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Add Update</h3>
          <form onSubmit={handleSubmitUpdate}>
            <div className="mb-3">
              <label htmlFor="updateContent" className="form-label">Update</label>
              <textarea
                id="updateContent"
                rows={3}
                className="form-input"
                placeholder="Provide an update on the incident..."
                value={updateContent}
                onChange={(e) => setUpdateContent(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newStatus" className="form-label">Update Status (Optional)</label>
              <select
                id="newStatus"
                className="form-input"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as BorderIncident['status'] | '')}
              >
                <option value="">No Change</option>
                <option value="reported">Reported</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
                <option value="false-alarm">False Alarm</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary flex items-center"
              disabled={!updateContent.trim()}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Submit Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
