import React, { useState } from "react";

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
        <div className="container">
            <h2>3️⃣ Input Keterlibatan Medis</h2>
            <p>Respon Tubuh: <b>{responTubuh}</b></p>
            <p>Etiologi Umum: <b>{etiologiUmum}</b></p>

            {!penyakit ? (
                <form onSubmit={handleSubmit}>
                    <label>Keterlibatan Medis:</label>
                    <select onChange={(e) => setMedis(e.target.value)} required>
                        <option value="">Pilih</option>
                        <option value="self-heal">Self-Heal</option>
                        <option value="intensif">Intensif</option>
                    </select>

                    <button type="submit">Lihat Hasil</button>
                </form>
            ) : (
                <div>
                    <h3>✅ Diagnosa: {penyakit}</h3>
                    <button onClick={onRestart}>🔄 Kembali ke Home</button>
                </div>
            )}
        </div>
    );
};

export default Step3;
