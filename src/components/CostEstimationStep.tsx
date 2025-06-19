import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

interface CostEstimationStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const CostEstimationStep: React.FC<CostEstimationStepProps> = ({ onNext, onBack }) => {
  const [rates, setRates] = useState([
    { role: 'Cloud Architect', rate: 150, hours: 40 },
    { role: 'DevOps Engineer', rate: 120, hours: 60 },
    { role: 'Compliance Consultant', rate: 140, hours: 20 },
    { role: 'PM', rate: 100, hours: 15 }
  ]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = rates.reduce((sum, item) => sum + (item.rate * item.hours), 0);
    setTotal(newTotal);
  }, [rates]);

  const updateRate = (index: number, field: 'rate' | 'hours', value: number) => {
    const newRates = [...rates];
    newRates[index][field] = value;
    setRates(newRates);
  };

  const handleSubmit = () => {
    onNext({ rates, total });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Cost Estimation & Rate Card</CardTitle>
        <p className="text-sm text-muted-foreground">Review and adjust hourly rates and estimated hours</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <h3 className="font-semibold mb-2">System applies pricing:</h3>
          <p className="text-muted-foreground">Region-EU</p>
        </div>

        <div className="overflow-x-auto">
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border-r border-border p-3 text-left">Role</th>
                  <th className="border-r border-border p-3 text-center">Rate (USD/hr)</th>
                  <th className="border-r border-border p-3 text-center">Hours</th>
                  <th className="p-3 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((item, index) => (
                  <tr key={item.role} className="border-t border-border">
                    <td className="border-r border-border p-3 font-medium">{item.role}</td>
                    <td className="border-r border-border p-3">
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateRate(index, 'rate', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </td>
                    <td className="border-r border-border p-3">
                      <Input
                        type="number"
                        value={item.hours}
                        onChange={(e) => updateRate(index, 'hours', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </td>
                    <td className="p-3 text-center font-medium">
                      ${(item.rate * item.hours).toLocaleString()}
                    </td>
                  </tr>
                ))}
                <tr className="bg-primary/10 border-t border-border">
                  <td className="border-r border-border p-3 font-bold">Total</td>
                  <td className="border-r border-border p-3"></td>
                  <td className="border-r border-border p-3"></td>
                  <td className="p-3 text-center font-bold text-lg">
                    ${total.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-accent/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Historical Data Applied</h4>
          <p className="text-sm text-muted-foreground">
            Rates and estimates based on similar EU region deployments for enterprise clients
          </p>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Generate SOW
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostEstimationStep;