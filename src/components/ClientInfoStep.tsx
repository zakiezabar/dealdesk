import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClientInfoStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const ClientInfoStep: React.FC<ClientInfoStepProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    infraSize: '',
    userCount: '',
    complianceNeeds: '',
    regions: ''
  });

  const handleSubmit = () => {
    onNext(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Client Information & Requirements</CardTitle>
        <p className="text-muted-foreground">Tell us about your organization and needs</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="clientName">Who is the client?</Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              placeholder="Client organization name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="infraSize">Infrastructure Size / User Count</Label>
            <Select onValueChange={(value) => setFormData({...formData, infraSize: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select infrastructure size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (1-50 users)</SelectItem>
                <SelectItem value="medium">Medium (51-200 users)</SelectItem>
                <SelectItem value="large">Large (201-1000 users)</SelectItem>
                <SelectItem value="enterprise">Enterprise (1000+ users)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="complianceNeeds">Compliance Requirements</Label>
            <Textarea
              id="complianceNeeds"
              value={formData.complianceNeeds}
              onChange={(e) => setFormData({...formData, complianceNeeds: e.target.value})}
              placeholder="GDPR, SOC2, ISO27001, etc."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="regions">Deployment Regions</Label>
            <Input
              id="regions"
              value={formData.regions}
              onChange={(e) => setFormData({...formData, regions: e.target.value})}
              placeholder="EU, APAC, US, etc."
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientInfoStep;