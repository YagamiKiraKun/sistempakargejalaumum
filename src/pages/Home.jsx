import React, { useState } from "react";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import ResultDisplay from "../components/ResultDisplay";

const Home = () => {
  const [step1Result, setStep1Result] = useState(null);
  const [finalResult, setFinalResult] = useState(null);

  return (
    <div>
      <h1>Diagnosis Penyakit</h1>
      {!step1Result && <Step1 setStep1Result={setStep1Result} goToStep2={() => setStep1Result({})} />}
      {step1Result && !finalResult && <Step2 step1Result={step1Result} setFinalResult={setFinalResult} />}
      {finalResult && <ResultDisplay result={finalResult} />}
    </div>
  );
};

export default Home;
