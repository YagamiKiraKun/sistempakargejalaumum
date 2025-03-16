import React, { useState } from "react";

const Step2 = ({ responTubuh, onNext }) => {
    if (!onNext) {
        console.error("❌ ERROR: onNext tidak diterima di Step2!");
    }

    const [batuk, setBatuk] = useState("");
    const [lebihSakit, setLebihSakit] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let etiologiUmum = "Tidak diketahui";
        if (batuk === "biasa" && lebihSakit === "otot") {
            etiologiUmum = "sistemik";
        } else if (batuk === "parah" && lebihSakit === "otot") {
            etiologiUmum = "sistemik";
        } else if (batuk === "biasa" && lebihSakit === "pernapasan") {
            etiologiUmum = "pernapasan";
        } else if (batuk === "parah" && lebihSakit === "pernapasan") {
            etiologiUmum = "pernapasan";
        }

        console.log("✅ Mengirim ke onNext:", etiologiUmum);
        onNext(etiologiUmum);  // ⬅️ Pastikan ini dijalankan!
    };

    return (
        <div>
            <h2>2️⃣ Input Batuk & Sakit</h2>
            <p>Respon Tubuh: <b>{responTubuh}</b></p>

            <form onSubmit={handleSubmit}>
                <label>Batuk:</label>
                <select onChange={(e) => setBatuk(e.target.value)} required>
                    <option value="">Pilih</option>
                    <option value="biasa">Biasa</option>
                    <option value="parah">Parah</option>
                </select>

                <label>Lebih Sakit:</label>
                <select onChange={(e) => setLebihSakit(e.target.value)} required>
                    <option value="">Pilih</option>
                    <option value="otot">Otot</option>
                    <option value="pernapasan">Pernapasan</option>
                </select>

                <button type="submit">Lanjut</button>
            </form>
        </div>
    );
};

export default Step2;
