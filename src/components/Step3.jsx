import React, { useState } from "react";
import './Step3.css';
import SistemDiagnosa from './SistemDiagnosa';

const Step3 = ({ responTubuh, etiologiUmum, onRestart }) => {
    const [medis, setMedis] = useState("");
    const [hasil, setHasil] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const hitungDiagnosa = (etiologi, respon, medis) => {
        // Create a new instance of SistemDiagnosa
        const sistemDiagnosa = new SistemDiagnosa();
        
        // Add facts to the system
        sistemDiagnosa.addFacts({
            etiologi: etiologi,
            respon: respon,
            medis: medis
        });
        
        // Get the diagnosis result
        const hasilDiagnosa = sistemDiagnosa.getPenyakit();
        
        // Format results
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
            workingMemory: hasilDiagnosa.workingMemory || [],
            steps: hasilDiagnosa.steps || []
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate processing time
        setTimeout(() => {
            const hasilDiagnosa = hitungDiagnosa(etiologiUmum, responTubuh, medis);
            setHasil(hasilDiagnosa);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="step3-container">
            <h2>3️⃣ Input Keterlibatan Medis</h2>
            <div className="input-summary">
                <p>Respon Tubuh: <b>{responTubuh}</b></p>
                <p>Etiologi Umum: <b>{etiologiUmum}</b></p>
            </div>

            {!hasil ? (
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label>Keterlibatan Medis:</label>
                        <select 
                            onChange={(e) => setMedis(e.target.value)} 
                            required
                            className="select-input"
                        >
                            <option value="">Pilih</option>
                            <option value="self-heal">Dapat sembuh sendiri</option>
                            <option value="intensif">Memerlukan perawatan intensif</option>
                        </select>
                        <div className="hint">
                            "Self-heal" berarti penyakit yang dapat sembuh dengan istirahat dan perawatan ringan,<br/> 
                            "Intensif" berarti memerlukan penanganan medis khusus.
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Menghitung..." : "Lihat Hasil"}
                    </button>
                </form>
            ) : (
                <div className="highlight-diagnosis">
                    <h3 className="highlight-title">🔍 Hasil Diagnosa:</h3>
                    <div className="diagnosis-box">
                        <h2 className="disease-name">{hasil.finalDiagnosis.penyakit}</h2>
                        <p className="certainty">Tingkat Kepastian: <b>{(hasil.finalDiagnosis.cf * 100).toFixed(2)}%</b></p>
                        
                        <div className="certainty-bar">
                            <div 
                                className="certainty-fill" 
                                style={{width: `${hasil.finalDiagnosis.cf * 100}%`}}
                            ></div>
                        </div>
                        
                        <p className="certainty-interpretation">
                            {hasil.finalDiagnosis.cf >= 0.8 ? "Sangat yakin" : 
                             hasil.finalDiagnosis.cf >= 0.6 ? "Cukup yakin" : 
                             hasil.finalDiagnosis.cf >= 0.4 ? "Mungkin benar" : "Kurang yakin"}
                        </p>
                    </div>
                    
                    <div className="calculation-details">
                        <button 
                            className="toggle-details-btn"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? "Sembunyikan Detail Perhitungan" : "Tampilkan Detail Perhitungan"}
                        </button>
                        
                        {showDetails && (
                            <div className="details-container">
                                <h4>Input yang digunakan:</h4>
                                <ul className="input-list">
                                    <li>Respon Tubuh: <b>{responTubuh}</b></li>
                                    <li>Etiologi: <b>{etiologiUmum}</b></li>
                                    <li>Keterlibatan Medis: <b>{medis}</b></li>
                                </ul>
                                
                                <h4>Langkah-langkah Inferensi:</h4>
                                <ol className="steps-list">
                                    {hasil.steps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                                
                                <h4>Working Memory:</h4>
                                <table className="memory-table">
                                    <thead>
                                        <tr>
                                            <th>Atribut</th>
                                            <th>Nilai</th>
                                            <th>CF</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hasil.workingMemory.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.attr}</td>
                                                <td>{item.value}</td>
                                                <td>{item.cf.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    
                    <div className="controls">
                        <button onClick={onRestart} className="restart-btn">🔄 Mulai Ulang Diagnosa</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step3;