import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [responTubuh, setResponTubuh] = useState("");
    const [etiologiUmum, setEtiologiUmum] = useState("");

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div>
            {step === 1 && <Step1 onNext={(data) => { setResponTubuh(data); nextStep(); }} />}
            {step === 2 && <Step2 responTubuh={responTubuh} onNext={(data) => { setEtiologiUmum(data); nextStep(); }} />}
            {step === 3 && <Step3 responTubuh={responTubuh} etiologiUmum={etiologiUmum} onNext={nextStep} />}
            
            {step > 1 && <button onClick={prevStep}>⬅️ Kembali</button>}
        </div>
    );
};

export default MultiStepForm;
