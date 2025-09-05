import React from 'react';
import '../styles/components/ProgressBar.css';

const ProgressBar = ({ currentStep, totalSteps }) => {
    const steps = [];
    for (let i = 1; i <= totalSteps; i++) {
        steps.push(
            <div key={i} className={`step ${i <= currentStep ? 'completed' : ''}`}>
                <div className="step-number">{i}</div>
            </div>
        );
    }

    const progressPercentage = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;

    return (
        <div className="progress-bar-container">
            <div className="progress-bar-line">
                <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="steps-container">
                {steps}
            </div>
        </div>
    );
};

export default ProgressBar;