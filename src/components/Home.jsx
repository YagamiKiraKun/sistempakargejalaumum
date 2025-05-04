import React from 'react';
import './Home.css';
import dokterIcon from '../Assets/dokter.webp';

const Home = ({ onStart }) => {
    return (
        <div className="home-container">
            <img src={dokterIcon} alt="Icon Orang" className="icon" />
            <h1 className="home-title">Selamat Datang di Sistem Pakar Diagnosa Penyakit Umum</h1>
            
            <p className="home-description">
                Sistem pakar ini membantu Anda mengenali kemungkinan penyakit berdasarkan gejala awal. 
                Dengan menjawab beberapa pertanyaan, sistem akan menganalisis dan memberikan hasil diagnosa awal 
                yang bisa menjadi rujukan medis lebih lanjut.
            </p>

                        <div className="disease-cards">
                <div className="card">
                    <h3>🦟 DBD (Demam Berdarah Dengue)</h3>
                    <ul>
                        <li>Demam tinggi & bintik merah</li>
                        <li>Demam tinggi mendadak (hingga 40°C)</li>
                        <li>Lemah dan lesu</li>
                        <li>Nyeri otot dan sendi (disebut juga “breakbone fever”)</li>
                        <li>Sakit kepala hebat (terutama di belakang mata)</li>
                        <li>Muncul bintik-bintik merah pada kulit (ruam atau perdarahan ringan)</li>
                        <li>Mual dan muntah</li>
                        <li>Penurunan jumlah trombosit</li>
                    </ul>
                </div>
                <div className="card">
                    <h3>🤧 ISPA (Infeksi Saluran Pernapasan Akut)</h3>
                    <ul>
                        <li> Batuk & pilek berhari-hari</li>
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
                    <h3>😷 TBC (Tuberkulosis)</h3>
                    <ul>
                        <li>Batuk lebih dari 2 minggu</li>
                        <li>Demam tinggi mendadak (hingga 40°C)</li>
                        <li>Batuk terus-menerus lebih dari 2 minggu</li>
                        <li>Batuk berdahak, bisa bercampur darah</li>
                        <li>Demam ringan di sore/malam hari</li>
                        <li>Berkeringat di malam hari tanpa aktivitas</li>
                        <li>Berat badan turun drastis</li>
                        <li>Lemas dan nafsu makan berkurang</li>
                    </ul>
                </div>
               
            </div>
            <p className="home-instruction">
                Klik tombol <strong>“Mulai Diagnosa”</strong> dan jawab pertanyaan sesuai gejala yang Anda alami.
            </p>
            <button className="start-button" onClick={onStart}>Mulai Diagnosa</button>
        </div>
    );
};

export default Home;
