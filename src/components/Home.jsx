import React from 'react';
import './Home.css'; // Pastikan file CSS ini diimpor

const Home = ({ onStart }) => {
    return (
        <div className="home-container">
            <h1 className="home-title">Selamat Datang di Sistem Pakar Diagnosa Penyakit</h1>
            <p className="home-description">
                Aplikasi ini membantu mendiagnosa berdasarkan gejala awal dan respon tubuh.
            </p>

            <div className="disease-cards">
                <div className="card">
                    <h3>DBD (Demam Berdarah Dengue)</h3>
                    <ul>
                        <li>Demam tinggi mendadak (hingga 40°C)</li>
                        <li>Lemah dan lesu</li>
                        <li>Nyeri otot dan sendi (disebut juga “breakbone fever”)</li>
                        <li>Sakit kepala hebat (terutama di belakang mata)</li>
                        <li>Muncul bintik-bintik merah pada kulit (ruam atau perdarahan ringan)</li>
                        <li>Mual dan muntah</li>
                        <li>Penurunan jumlah trombosit (berpotensi menyebabkan perdarahan)</li>
                    </ul>
                </div>
                <div className="card">
                    <h3>ISPA (Infeksi Saluran Pernapasan Akut)</h3>
                    <ul>
                        <li>Batuk (kering atau berdahak)</li>
                        <li>Pilek atau hidung tersumbat</li>
                        <li>Demam ringan hingga tinggi</li>
                        <li>Tenggorokan sakit</li>
                        <li>Sesak napas atau napas cepat (terutama pada anak-anak)</li>
                        <li>Suara serak</li>
                        <li>Muntah</li>
                    </ul>
                </div>
                <div className="card">
                    <h3>TBC (Tuberkulosis)</h3>
                    <ul>
                    <li>Demam tinggi mendadak (hingga 40°C)</li>
                        <li>Batuk terus-menerus selama lebih dari 2 minggu</li>
                        <li>Batuk berdahak, bisa bercampur darah</li>
                        <li>Demam ringan yang sering muncul di sore/malam hari</li>
                        <li>Berkeringat di malam hari tanpa aktivitas</li>
                        <li>Berat badan turun drastis</li>
                        <li>Lemas dan nafsu makan berkurang</li>
                     
                    </ul>
                </div>
            </div>

            <button className="start-button" onClick={onStart}>Mulai Diagnosa</button>
        </div>
    );
};

export default Home;
