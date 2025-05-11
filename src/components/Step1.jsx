import React, { useState, useEffect } from "react";
import './Step1.css'; 

const Step1 = ({ onNext }) => {
    const [timbulGejala, setTimbulGejala] = useState("");
    const [adaptasiTubuh, setAdaptasiTubuh] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [calculation, setCalculation] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        setIsDisabled(!(timbulGejala && adaptasiTubuh));
    }, [timbulGejala, adaptasiTubuh]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setIsCalculating(true);
        
        let responTubuh = "Tidak diketahui";
        let calculationSteps = [];
        let cfValue = 0;

        // Adding loading animation for calculations
        calculationSteps.push("Menganalisis data input...");
        setCalculation(calculationSteps);
        
        // Simulate calculation process with stepped animations
        setTimeout(() => {
            calculationSteps = [];
            calculationSteps.push("** Perhitungan Respon Tubuh **");
            setCalculation([...calculationSteps]);
            
            setTimeout(() => {
                if (timbulGejala === "awal" && adaptasiTubuh === "imun") {
                    responTubuh = "Langsung";
                    cfValue = 0.80;
                    calculationSteps.push("Rule 10: IF timbul_gejala = awal AND adaptasi_tubuh = imun THEN respon = Langsung (CF = 0.80)");
                } else if (timbulGejala === "awal" && adaptasiTubuh === "inflamasi") {
                    responTubuh = "Bertahap";
                    cfValue = 0.85;
                    calculationSteps.push("Rule 11: IF timbul_gejala = awal AND adaptasi_tubuh = inflamasi THEN respon = Bertahap (CF = 0.85)");
                } else if (timbulGejala === "lama") {
                    responTubuh = "Bertahap";
                    cfValue = 0.70;
                    calculationSteps.push("Rule 12: IF timbul_gejala = lama THEN respon = Bertahap (CF = 0.70)");
                }
                setCalculation([...calculationSteps]);
                
                setTimeout(() => {
                    calculationSteps.push(`Fakta cocok dengan rule yang dipilih, maka Respon = ${responTubuh} dengan CF = ${cfValue}`);
                    calculationSteps.push(`Tingkat kepercayaan diagnosis: ${(cfValue * 100).toFixed(0)}%`);
                    setCalculation([...calculationSteps]);
                    
                    setTimeout(() => {
                        setIsCalculating(false);
                        // Wait 1.5 seconds to show complete calculation then proceed
                        setTimeout(() => {
                            onNext(responTubuh);
                        }, 1500);
                    }, 600);
                }, 600);
            }, 600);
        }, 800);
    };

    // Get select field state class
    const getFieldStateClass = (value) => {
        if (formSubmitted) {
            return value ? "field-valid" : "field-invalid";
        }
        return "";
    };

    return (
        <div className="step1-container">
            <div className="step1-header">
                <span className="step-number">1</span>
                <span className="step-title">Gejala awal yang dirasakan pasien</span>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${getFieldStateClass(timbulGejala)}`}>
                        <label htmlFor="timbulGejala">
                            <span className="label-icon">⏱️</span> Timbul Gejala:
                        </label>
                        <select 
                            id="timbulGejala"
                            value={timbulGejala} 
                            onChange={(e) => setTimbulGejala(e.target.value)}
                            disabled={isCalculating}
                            className={timbulGejala ? "has-value" : ""}
                        >
                            <option value="" disabled>Pilih waktu timbulnya gejala</option>
                            <option value="awal">Awal (tiba-tiba)</option>
                            <option value="lama">Lama (bertahap)</option>
                        </select>
                        <div className="hint">
                            "Awal" berarti gejala muncul tiba-tiba, "Lama" berarti gejala berkembang bertahap.
                        </div>
                    </div>

                    <div className={`form-group ${getFieldStateClass(adaptasiTubuh)}`}>
                        <label htmlFor="adaptasiTubuh">
                            <span className="label-icon">🛡️</span> Adaptasi Tubuh:
                        </label>
                        <select 
                            id="adaptasiTubuh"
                            value={adaptasiTubuh} 
                            onChange={(e) => setAdaptasiTubuh(e.target.value)}
                            disabled={isCalculating}
                            className={adaptasiTubuh ? "has-value" : ""}
                        >
                            <option value="" disabled>Pilih jenis adaptasi tubuh</option>
                            <option value="imun">Respons Imun</option>
                            <option value="inflamasi">Reaksi Inflamasi</option>
                        </select>
                        <div className="hint">
                            "Imun" berarti tubuh merespon dengan kekebalan, "Inflamasi" dengan peradangan.
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isDisabled || isCalculating}
                        className={isCalculating ? "processing" : ""}
                    >
                        {isCalculating ? 'Memproses...' : 'Lanjut ke Tahap Berikutnya'}
                    </button>
                </form>
            </div>

            {calculation && !isCalculating && (
    <div className="calculation-box">
        <h3>Perhitungan Backward Chaining & Certainty Factor:</h3>
        <div className="calculation-steps">
            {calculation.map((step, index) => (
                <p key={index} className={index === 0 ? "step-header" : ""}>
                    {step}
                </p>
            ))}
        </div>
    </div>
)}

        </div>
    );
};

export default Step1;