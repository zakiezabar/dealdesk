import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SystemAnalysisStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  clientData: any;
}

const SystemAnalysisStep: React.FC<SystemAnalysisStepProps> = ({ onNext, onBack, clientData }) => {
  const suggestedTasks = [
    'Identity & Access Management',
    'Network Configuration', 
    'Compliance Checks (GDPR)',
    'Logging & Monitoring',
    'Handoff & Documentation'
  ];

  const [formData, setFormData] = useState({
    // Client Information
    clientName: clientData?.clientName || '',
    contactPerson: clientData?.contactPerson || '',
    email: clientData?.email || '',
    projectDescription: clientData?.projectDescription || '',
    infraSize: clientData?.infraSize || '',
    complianceNeeds: clientData?.complianceNeeds || '',
    regions: clientData?.regions || '',
    timeline: clientData?.timeline || '',
    
    // System Analysis
    systemChecked: false,
    dataSearched: false,
    internalSOWChecked: false,
    selectedTasks: [...suggestedTasks] // All tasks selected by default
  });

  const deliverables = [
    'Architecture diagrams',
    'Configured landing zone templates',
    'Deployment playbook'
  ];

  // Function to display infrastructure size with proper formatting
  const displayInfraSize = (infraSize: string): string => {
    if (!infraSize) return 'Not specified';
    
    const size = parseInt(infraSize);
    if (isNaN(size)) return infraSize; // If it's not a number, return as is
    
    if (size >= 1 && size <= 50) return 'Small';
    if (size >= 51 && size <= 200) return 'Medium';
    if (size >= 201 && size <= 1000) return 'Large';
    if (size > 1000) return 'Enterprise';
    
    return infraSize;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTaskToggle = (task: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTasks: prev.selectedTasks.includes(task)
        ? prev.selectedTasks.filter(t => t !== task)
        : [...prev.selectedTasks, task]
    }));
  };

  const handleSubmit = () => {
    onNext(formData);
  };

  return (
    <div className="space-y-6">
      {/* Client Information Section */}
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Client information & requirements</CardTitle>
          <p className="text-sm text-muted-foreground">Enter your client details</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-accent/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">
              Client: <span className="font-normal capitalize">{formData.clientName || 'Not specified'}</span></h3>
            <h3 className="font-semibold mb-2">
              Infrastructure Size: <span className="font-normal capitalize">{displayInfraSize(formData.infraSize)}</span>
            </h3>
            <h3 className="font-semibold mb-2">
              Compliance: <span className="font-normal capitalize">{formData.complianceNeeds || 'Not specified'}</span>
            </h3>
            <h3 className="font-semibold mb-2">
              Region: <span className="font-normal capitalize">{formData.regions || 'Not specified'}</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder="Enter client name"
                required
              />
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact person</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                placeholder="Enter contact person"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>

        </CardContent>
      </Card>

      {/* System Analysis Section */}
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>System Analysis & Project Overview</CardTitle>
          <p className="text-sm text-muted-foreground">Review and configure your project scope</p>
        </CardHeader>
        <CardContent className="space-y-6">

          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Suggested Tasks:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedTasks.map((task) => (
                <div 
                  key={task}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.selectedTasks.includes(task) 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleTaskToggle(task)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{task}</span>
                    {formData.selectedTasks.includes(task) && (
                      <Badge variant="default" className="text-xs">Selected</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Deliverables:</h4>
            <div className="space-y-1">
              {deliverables.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {/* <div className="w-2 h-2 bg-primary rounded-full"></div> */}
                  <span className="text-sm ">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Continue to Estimation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemAnalysisStep;