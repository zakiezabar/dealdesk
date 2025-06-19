"use client"

import React, { useState } from 'react';
import ConversationStep from '@/components/ConversationStep';
import SystemAnalysisStep from '@/components/SystemAnalysisStep';
import CostEstimationStep from '@/components/CostEstimationStep';
import FinalSummaryStep from '@/components/FinalSummaryStep';
import WorkflowProgress from '@/components/WorkflowProgress';

// Define proper types
interface StepData {
  [key: string]: string | number | boolean | string[];
}

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StepData>({});

  const handleStepComplete = (stepData: StepData) => {
    setFormData(prevData => ({ ...prevData, ...stepData }));
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(prevStep => Math.max(1, prevStep - 1));
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setFormData({});
  };

  const steps = [
    'Conversation',
    'System Analysis & Client Info',
    'Cost Estimation',
    'Final Summary'
  ];

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ConversationStep onNext={handleStepComplete} />;
      case 2:
        return <SystemAnalysisStep onNext={handleStepComplete} onBack={handleBack} clientData={formData} />;
      case 3:
        return <CostEstimationStep onNext={handleStepComplete} onBack={handleBack} />;
      case 4:
        return <FinalSummaryStep onBack={handleBack} onExport={() => {}} onEditRegenerate={handleRestart} costData={formData} clientData={formData} />;
      default:
        return <ConversationStep onNext={handleStepComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-2">
        <WorkflowProgress currentStep={currentStep} totalSteps={steps.length} steps={steps} />
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default HomePage;