import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface FinalSummaryStepProps {
  onBack: () => void;
  onExport: () => void;
  onEditRegenerate: () => void;
  costData: any;
  clientData: any;
}

const FinalSummaryStep: React.FC<FinalSummaryStepProps> = ({ 
  onBack, 
  onExport, 
  onEditRegenerate,
  costData,
  clientData 
}) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Statement of Work Draft - Review & Export</CardTitle>
        <p className="text-sm text-muted-foreground">Final review of generated SOW</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 className="font-bold text-yellow-900 mb-4">
            Statement of Work Draft (v0.1) - Cloud Landing Zone for {clientData?.clientName || 'Sanofi'}
          </h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-yellow-900">Objective:</h4>
              <p>Set up a secure, compliant cloud landing zone for {clientData?.clientName || 'Sanofi'} in EU and APAC regions.</p>
            </div>

            <div>
              <h4 className="font-semibold text-yellow-900">Scope:</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Identity & Access Management</li>
                <li>Network Configuration</li>
                <li>Compliance Checks (GDPR)</li>
                <li>Logging & Monitoring</li>
                <li>Handoff & Documentation</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-yellow-900">Deliverables:</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Architecture diagrams</li>
                <li>Configured landing zone templates</li>
                <li>Deployment playbook</li>
              </ul>
            </div>
          </div>
        </div>

        {costData && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <h3 className="font-bold text-yellow-900 mb-4">Cost Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-300">
                    <th className="text-left p-2">Role</th>
                    <th className="text-center p-2">Rate (USD/hr)</th>
                    <th className="text-center p-2">Hours</th>
                    <th className="text-center p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {costData.rates?.map((item: any, index: number) => (
                    <tr key={index} className="border-b border-yellow-200">
                      <td className="p-2">{item.role}</td>
                      <td className="text-center p-2">${item.rate}</td>
                      <td className="text-center p-2">{item.hours}</td>
                      <td className="text-center p-2">${(item.rate * item.hours).toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="font-bold border-t-2 border-yellow-400">
                    <td className="p-2">Total</td>
                    <td className="p-2"></td>
                    <td className="p-2"></td>
                    <td className="text-center p-2">${costData.total?.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Check className="h-3 w-3" />
            Draft Ready
          </Badge>
          <Badge variant="secondary"
            className="flex items-center gap-1">
            <Check className="h-3 w-3" />
            Cost Calculated</Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Check className="h-3 w-3" />
            Compliance Verified</Badge>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button variant="outline" onClick={onEditRegenerate} className="flex-1">
            Edit / Regenerate / Save
          </Button>
          <Button onClick={onExport} className="flex-1">
            Export SOW
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinalSummaryStep;