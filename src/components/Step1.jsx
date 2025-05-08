import React, { useState, useEffect } from "react";
import './Step1.css'; 

const Step1 = ({ onNext }) => {
    const [timbulGejala, setTimbulGejala] = useState("");
    const [adaptasiTubuh, setAdaptasiTubuh] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setIsDisabled(!(timbulGejala && adaptasiTubuh));
    }, [timbulGejala, adaptasiTubuh]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let responTubuh = "Tidak diketahui";

        if (timbulGejala === "awal" && adaptasiTubuh === "imun") {
            responTubuh = "Langsung";
        } else if (timbulGejala === "awal" && adaptasiTubuh === "inflamasi") {
            responTubuh = "Bertahap";
        } else if (timbulGejala === "lama") {
            responTubuh = "Bertahap";
        }

        onNext(responTubuh);
    };

    return (
        <div className="step1-container">
            <div className="step1-header">
                <span className="step-number">1</span>
                <span className="step-title">Input Gejala Awal</span>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Timbul Gejala:</label>
                        <select 
                            value={timbulGejala} 
                            onChange={(e) => setTimbulGejala(e.target.value)}
                        >
                            <option value="" disabled>Pilih</option>
                            <option value="awal">Awal</option>
                            <option value="lama">Lama</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Adaptasi Tubuh:</label>
                        <select 
                            value={adaptasiTubuh} 
                            onChange={(e) => setAdaptasiTubuh(e.target.value)}
                        >
                            <option value="" disabled>Pilih</option>
                            <option value="imun">Imun</option>
                            <option value="inflamasi">Inflamasi</option>
                        </select>
                    </div>

                    <button type="submit" disabled={isDisabled}>Lanjut</button>
                </form>
            </div>
        </div>
    );
};

export default Step1;