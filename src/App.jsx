import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';

function App() {
  // Application states
  const [currentStep, setCurrentStep] = useState(0);
  const [responTubuh, setResponTubuh] = useState("");
  const [etiologiUmum, setEtiologiUmum] = useState("");

  // Handle the start of the diagnosis process
  const handleStart = () => {
    setCurrentStep(1);
  };

  // Handle completion of Step 1
  const handleStep1Complete = (respon) => {
    setResponTubuh(respon);
    setCurrentStep(2);
  };

  // Handle completion of Step 2
  const handleStep2Complete = (etiologi) => {
    setEtiologiUmum(etiologi);
    setCurrentStep(3);
  };

  // Handle restart of the diagnosis process
  const handleRestart = () => {
    setCurrentStep(0);
    setResponTubuh("");
    setEtiologiUmum("");
  };

  // Render the appropriate component based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Home onStart={handleStart} />;
      case 1:
        return <Step1 onNext={handleStep1Complete} />;
      case 2:
        return <Step2 responTubuh={responTubuh} onNext={handleStep2Complete} />;
      case 3:
        return <Step3 
          responTubuh={responTubuh} 
          etiologiUmum={etiologiUmum} 
          onRestart={handleRestart} 
        />;
      default:
        return <Home onStart={handleStart} />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        {currentStep > 0 && (
          <div className="progress-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>Gejala Awal</div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>Batuk & Sakit</div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>Keterlibatan Medis</div>
          </div>
        )}
      </header>
      <main className="app-content">
        {renderStep()}
      </main>
      <footer className="app-footer">
        <p>© 2025 Sistem Pakar Diagnosa Penyakit - Dibuat untuk Edukasi</p>
      </footer>
    </div>
  );
}

export default App;