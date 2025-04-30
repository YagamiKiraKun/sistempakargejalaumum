import React, { useState } from "react";
import './Step3.css'; 

const Step3 = ({ responTubuh, etiologiUmum, onRestart }) => {
    const [medis, setMedis] = useState("");
    const [penyakit, setPenyakit] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let penyakitUmum = "Tidak diketahui";

        if (etiologiUmum === "pernapasan" && responTubuh === "Langsung") {
            penyakitUmum = "ISPA";
        } else if (etiologiUmum === "pernapasan" && responTubuh === "Bertahap" && medis === "self-heal") {
            penyakitUmum = "ISPA";
        } else if (etiologiUmum === "pernapasan" && responTubuh === "Bertahap" && medis === "intensif") {
            penyakitUmum = "TBC";
        } else if (etiologiUmum === "sistemik" && medis === "self-heal") {
            penyakitUmum = "Penyakit lain";
        } else if (etiologiUmum === "sistemik" && medis === "intensif") {
            penyakitUmum = "DBD";
        }

        setPenyakit(penyakitUmum);
    };

    return (
        <div className="step3-container">
            <h2>3️⃣ Input Keterlibatan Medis</h2>
            <p>Respon Tubuh: <b>{responTubuh}</b></p>
            <p>Etiologi Umum: <b>{etiologiUmum}</b></p>

            {!penyakit ? (
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
                <h3 className="highlight-title">🔍 Berdasarkan data Anda, kemungkinan Anda mengalami:</h3>
                <div className="diagnosis-box">{penyakit}</div>
                <button onClick={onRestart} className="restart-btn">🔄 Kembali ke Home</button>
</div>

            )}
        </div>
    );
};

export default Step3;
