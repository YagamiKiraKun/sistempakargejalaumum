import React, { useState } from "react";
import './Step3.css';

const rules = [
    { kondisi: (e, r, m) => e === "pernapasan" && r === "Langsung", penyakit: "ISPA", cf: 0.80 },
    { kondisi: (e, r, m) => e === "pernapasan" && r === "Bertahap" && m === "self-heal", penyakit: "ISPA", cf: 0.85 },
    { kondisi: (e, r, m) => e === "pernapasan" && r === "Bertahap" && m === "intensif", penyakit: "TBC", cf: 0.90 },
    { kondisi: (e, r, m) => e === "sistemik" && m === "self-heal", penyakit: "Penyakit lain", cf: 0.75 },
    { kondisi: (e, r, m) => e === "sistemik" && m === "intensif", penyakit: "DBD", cf: 0.85 },
];

const Step3 = ({ responTubuh, etiologiUmum, onRestart }) => {
    const [medis, setMedis] = useState("");
    const [hasil, setHasil] = useState(null);

    const hitungDiagnosa = (etiologi, respon, medis) => {
        const hasilRules = rules
            .filter(rule => rule.kondisi(etiologi, respon, medis))
            .map(rule => ({ penyakit: rule.penyakit, cf: rule.cf }));

        const hasilTerbaik = hasilRules.reduce((prev, curr) => (curr.cf > prev.cf ? curr : prev), { cf: 0 });

        return {
            hasilRules,
            finalDiagnosis: hasilTerbaik,
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
                    <h3 className="highlight-title">🔍 Hasil Diagnosa Berdasarkan Certainty Factor:</h3>
                    <ul>
                        {hasil.hasilRules.map((h, i) => (
                            <li key={i}>
                                {h.penyakit} (CF: {h.cf})
                            </li>
                        ))}
                    </ul>
                    <h3 className="highlight-title">📌 Diagnosa Utama:</h3>
                    <div className="diagnosis-box">
                        {hasil.finalDiagnosis.penyakit} (CF: {hasil.finalDiagnosis.cf})
                    </div>
                    <button onClick={onRestart} className="restart-btn">🔄 Kembali ke Home</button>
                </div>
            )}
        </div>
    );
};

export default Step3;
