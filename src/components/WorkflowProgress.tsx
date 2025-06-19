import React from 'react';

interface WorkflowProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const WorkflowProgress: React.FC<WorkflowProgressProps> = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full bg-card px-6 pb-6 pt-3 rounded-xl border">
      <div className="flex items-center justify-end mb-2">
        {/* <h3 className="text-lg font-semibold text-foreground">DevOps User Flow Progress</h3> */}
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
        {steps.slice(0, 6).map((step, index) => (
          <div 
            key={index}
            className={`p-2 rounded-md text-center transition-all ${
              index < currentStep 
                ? 'bg-primary text-primary-foreground' 
                : index === currentStep - 1
                ? 'bg-accent text-accent-foreground border-2 border-primary'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowProgress;