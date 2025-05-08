import React, { useState } from "react";
import './Step3.css';
import SistemDiagnosa from './SistemDiagnosa';

const Step3 = ({ responTubuh, etiologiUmum, onRestart }) => {
    const [medis, setMedis] = useState("");
    const [hasil, setHasil] = useState(null);

    const hitungDiagnosa = (etiologi, respon, medis) => {

        const sistemDiagnosa = new SistemDiagnosa();
        

        sistemDiagnosa.addFacts({
            etiologi: etiologi,
            respon: respon,
            medis: medis
        });
        

        const hasilDiagnosa = sistemDiagnosa.getPenyakit();

        let hasilRules = [];
        
        if (hasilDiagnosa.result) {
            hasilRules.push({
                penyakit: hasilDiagnosa.result.value,
                cf: hasilDiagnosa.result.cf
            });
        }
        
        return {
            hasilRules,
            finalDiagnosis: hasilRules.length > 0 ? hasilRules[0] : { penyakit: "Tidak dapat ditentukan", cf: 0 },
            workingMemory: hasilDiagnosa.workingMemory || {}
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasilDiagnosa = hitungDiagnosa(etiologiUmum, responTubuh, medis);
        setHasil(hasilDiagnosa);
    };

    return (
        <div className="step3-container">
            <h2>3️⃣ Input Keterlibatan Medis</h2>
            <p>Respon Tubuh: <b>{responTubuh}</b></p>
            <p>Etiologi Umum: <b>{etiologiUmum}</b></p>

            {!hasil ? (
                <form onSubmit={handleSubmit} className="form-container">
                    <label>Keterlibatan Medis:</label>
                    <select 
                        onChange={(e) => setMedis(e.target.value)} 
                        required
                        className="select-input"
                    >
                        <option value="">Pilih</option>
                        <option value="self-heal">Self-Heal</option>
                        <option value="intensif">Intensif</option>
                    </select>

                    <button type="submit" className="submit-btn">Lihat Hasil</button>
                </form>
            ) : (
                <div className="highlight-diagnosis">
                    <h3 className="highlight-title">🔍 Hasil Diagnosa Berdasarkan Backward Chaining dan Certainty Factor:</h3>
                    <ul>
                        {hasil.hasilRules.map((h, i) => (
                            <li key={i}>
                                {h.penyakit} (CF: {h.cf.toFixed(2)})
                            </li>
                        ))}
                    </ul>
                    <h3 className="highlight-title">📌 Diagnosa Utama:</h3>
                    <div className="diagnosis-box">
                        {hasil.finalDiagnosis.penyakit} (CF: {hasil.finalDiagnosis.cf.toFixed(2)})
                    </div>
                    
                    <div className="controls">
                        <button onClick={onRestart} className="restart-btn">🔄 Kembali ke Home</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step3;