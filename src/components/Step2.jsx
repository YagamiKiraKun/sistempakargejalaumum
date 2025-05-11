import React, { useState } from "react";
import './Step2.css';

const Step2 = ({ responTubuh, onNext }) => {
    const [batuk, setBatuk] = useState("");
    const [lebihSakit, setLebihSakit] = useState("");
    const [tandaKhusus, setTandaKhusus] = useState("");
    const [calculation, setCalculation] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        let etiologiUmum = "Tidak diketahui";
        let calculationSteps = [];
        
        calculationSteps.push("** Perhitungan Backward Chaining untuk Etiologi **");
        calculationSteps.push("Goal: etiologi");
        
        // Calculation logic based on rules 6, 7, 8, 9
        if (lebihSakit === "otot") {
            calculationSteps.push("Rule 6: IF lebih_sakit = otot THEN etiologi = sistemik (CF = 0.65)");
            calculationSteps.push("Fakta cocok dengan Rule 6, maka Etiologi = sistemik dengan CF = 0.65");
            etiologiUmum = "sistemik";
        } 
        else if (batuk === "biasa" && lebihSakit === "pernapasan") {
            calculationSteps.push("Rule 7: IF batuk = biasa AND lebih_sakit = pernapasan THEN etiologi = pernapasan (CF = 0.75)");
            calculationSteps.push("Fakta cocok dengan Rule 7, maka Etiologi = pernapasan dengan CF = 0.75");
            etiologiUmum = "pernapasan";
        }
        else if (batuk === "parah" && lebihSakit === "otot" && tandaKhusus === "keringat malam") {
            calculationSteps.push("Rule 8: IF batuk = parah AND lebih_sakit = otot AND tanda = keringat malam THEN etiologi = pernapasan (CF = 0.90)");
            calculationSteps.push("Fakta cocok dengan Rule 8, maka Etiologi = pernapasan dengan CF = 0.90");
            etiologiUmum = "pernapasan";
        }
        else if (batuk === "parah" && lebihSakit === "pernapasan") {
            calculationSteps.push("Rule 9: IF batuk = parah AND lebih_sakit = pernapasan THEN etiologi = pernapasan (CF = 0.85)");
            calculationSteps.push("Fakta cocok dengan Rule 9, maka Etiologi = pernapasan dengan CF = 0.85");
            etiologiUmum = "pernapasan";
        }
        else {
            calculationSteps.push("Tidak ada rule yang cocok dengan fakta-fakta yang ada.");
            calculationSteps.push("Menggunakan default: Etiologi = Tidak diketahui");
        }

        // Add reasoning based on respon tubuh
        calculationSteps.push(`\nFakta terkumpul sampai langkah ini:`);
        calculationSteps.push(`- Respon Tubuh: ${responTubuh}`);
        calculationSteps.push(`- Etiologi: ${etiologiUmum}`);

        setCalculation(calculationSteps);
        
        // Wait 2 seconds to show calculation then proceed
        setTimeout(() => {
            onNext(etiologiUmum);
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <div className="step2-container">
            <h2>2️⃣ Input Batuk & Sakit</h2>
            <p className="step-info">Respon Tubuh: <b>{responTubuh}</b></p>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Batuk:</label>
                    <select onChange={(e) => setBatuk(e.target.value)} required>
                        <option value="">Pilih</option>
                        <option value="biasa">Biasa/Ringan</option>
                        <option value="parah">Parah/Berat</option>
                    </select>
                    <div className="hint">
                        "Biasa" berarti batuk ringan, "Parah" berarti batuk berat/mengganggu aktivitas.
                    </div>
                </div>

                <div className="form-group">
                    <label>Lebih Sakit:</label>
                    <select onChange={(e) => setLebihSakit(e.target.value)} required>
                        <option value="">Pilih</option>
                        <option value="otot">Otot/Tubuh</option>
                        <option value="pernapasan">Pernapasan</option>
                    </select>
                    <div className="hint">
                        "Otot" berarti nyeri di tubuh/otot, "Pernapasan" berarti nyeri saat bernapas.
                    </div>
                </div>

                <div className="form-group">
                    <label>Tanda Khusus:</label>
                    <select onChange={(e) => setTandaKhusus(e.target.value)}>
                        <option value="">Tidak Ada</option>
                        <option value="bintik">Bintik merah pada kulit</option>
                        <option value="keringat malam">Keringat berlebih di malam hari</option>
                    </select>
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Menghitung..." : "Lanjut"}
                </button>
            </form>

            {calculation && (
                <div className="calculation-box">
                    <h3>Perhitungan Backward Chaining & Certainty Factor:</h3>
                    <div className="calculation-steps">
                        {calculation.map((step, index) => (
                            <p key={index}>{step}</p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step2;