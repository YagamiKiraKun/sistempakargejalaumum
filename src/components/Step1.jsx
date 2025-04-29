// Step1.jsx
import React, { useState } from "react";

const Step1 = ({ onNext }) => {
    const [timbulGejala, setTimbulGejala] = useState("");
    const [adaptasiTubuh, setAdaptasiTubuh] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    // Handle perubahan input untuk memvalidasi
    const handleChange = () => {
        if (timbulGejala && adaptasiTubuh) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    };

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
        <div>
            <h2>1️⃣ Input Gejala Awal</h2>
            <form onSubmit={handleSubmit}>
                <label>Timbul Gejala:</label>
                <select onChange={(e) => { setTimbulGejala(e.target.value); handleChange(); }}>
                    <option value="">Pilih</option>
                    <option value="awal">Awal</option>
                    <option value="lama">Lama</option>
                </select>

                <label>Adaptasi Tubuh:</label>
                <select onChange={(e) => { setAdaptasiTubuh(e.target.value); handleChange(); }}>
                    <option value="">Pilih</option>
                    <option value="imun">Imun</option>
                    <option value="inflamasi">Inflamasi</option>
                </select>

                <button type="submit" disabled={isDisabled}>Lanjut</button>
            </form>
        </div>
    );
};

export default Step1;
