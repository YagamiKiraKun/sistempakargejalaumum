import React, { useState } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import "./styles.css";

const App = () => {
    const [step, setStep] = useState(1);
    const [responTubuh, setResponTubuh] = useState("");
    const [etiologiUmum, setEtiologiUmum] = useState("");

    const restartDiagnosis = () => {
        setStep(1);
        setResponTubuh("");
        setEtiologiUmum("");
    };

    return (
        <div>
            {step === 1 && (
                <Step1 onNext={(respon) => { 
                    setResponTubuh(respon);
                    setStep(2); 
                }} />
            )}
            {step === 2 && (
                <Step2 responTubuh={responTubuh} onNext={(etiologi) => { 
                    setEtiologiUmum(etiologi);
                    setStep(3); 
                }} />
            )}
            {step === 3 && (
                <Step3 responTubuh={responTubuh} etiologiUmum={etiologiUmum} onRestart={restartDiagnosis} />
            )}
        </div>
    );
};

export default App;
