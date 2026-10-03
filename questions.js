const physicsQuestions = [
    // Hukum Newton (13 Soal)
    { question: "Hukum I Newton dikenal juga sebagai hukum...", options: ["Aksi-reaksi", "Kekekalan energi", "Kelembaman", "Gravitasi"], correct: 2 },
    { question: "Jika resultan gaya pada suatu benda adalah nol, maka benda yang diam akan...", options: ["Bergerak dipercepat", "Tetap diam", "Bergerak dengan kecepatan tetap", "Bergerak lurus"], correct: 1 },
    { question: "Satuan Gaya dalam Sistem Internasional (SI) adalah...", options: ["Joule", "Pascal", "Watt", "Newton"], correct: 3 },
    { question: "Menurut Hukum II Newton, percepatan berbanding terbalik dengan...", options: ["Massa", "Gaya", "Kecepatan", "Waktu"], correct: 0 },
    { question: "Ketika mendayung perahu ke belakang, perahu bergerak ke depan. Ini adalah contoh Hukum...", options: ["Newton I", "Newton II", "Newton III", "Pascal"], correct: 2 },
    { question: "Sebuah balok bermassa 5 kg ditarik dengan gaya 20 N. Percepatannya adalah...", options: ["100 m/s²", "15 m/s²", "4 m/s²", "0.25 m/s²"], correct: 2 },
    { question: "Gaya yang menahan benda agar tidak tergelincir saat ditarik disebut gaya...", options: ["Normal", "Gravitasi", "Sentripetal", "Gesek"], correct: 3 },
    { question: "Besarnya gaya normal pada benda mendatar yang diam di lantai adalah...", options: ["Lebih besar dari berat", "Lebih kecil dari berat", "Sama dengan berat benda", "Nol"], correct: 2 },
    { question: "Jika gaya aksi sebesar 50 N ke kanan, maka gaya reaksi adalah...", options: ["50 N ke kanan", "100 N ke kiri", "Nol", "50 N ke kiri"], correct: 3 },
    { question: "Seseorang bermassa 60 kg di lift yang bergerak ke atas dengan percepatan 2 m/s² (g=10). Gaya desakan kakinya adalah...", options: ["600 N", "720 N", "480 N", "120 N"], correct: 1 },
    { question: "Mobil yang direm mendadak membuat penumpang terdorong ke depan. Ini aplikasi Hukum...", options: ["Newton I", "Newton II", "Newton III", "Gravitasi"], correct: 0 },
    { question: "Gaya tarik menarik antar dua benda yang memiliki massa disebut gaya...", options: ["Gesek", "Normal", "Magnet", "Gravitasi"], correct: 3 },
    { question: "Faktor utama yang membedakan massa dan berat benda adalah...", options: ["Volume", "Percepatan gravitasi", "Kepadatan", "Bentuk benda"], correct: 1 },
    
    // Fluida Statis (13 Soal)
    { question: "Tekanan di dalam zat cair yang disebabkan oleh berat zat cair itu sendiri disebut...", options: ["Tekanan atmosfer", "Tekanan absolut", "Tekanan hidrostatis", "Gaya apung"], correct: 2 },
    { question: "Satuan tekanan dalam Sistem Internasional adalah...", options: ["Newton", "Joule", "Pascal", "Watt"], correct: 2 },
    { question: "'Tekanan yang diberikan pada zat cair tertutup diteruskan ke segala arah sama besar' adalah hukum...", options: ["Archimedes", "Boyle", "Newton", "Pascal"], correct: 3 },
    { question: "Benda akan mengapung di air jika...", options: ["Massa jenis benda = air", "Massa jenis benda > air", "Massa jenis benda < air", "Volume benda besar"], correct: 2 },
    { question: "Alat pengangkat mobil hidrolik bekerja berdasarkan hukum...", options: ["Pascal", "Archimedes", "Newton", "Bernoulli"], correct: 0 },
    { question: "Gaya yang mendorong benda ke atas saat benda berada dalam fluida disebut...", options: ["Gaya normal", "Gaya berat", "Gaya gravitasi", "Gaya Archimedes"], correct: 3 },
    { question: "Besar tekanan hidrostatis bergantung pada...", options: ["Volume fluida", "Massa wadah", "Kedalaman fluida", "Luas permukaan wadah"], correct: 2 },
    { question: "Kapal selam menyelam dengan cara...", options: ["Memperkecil massa jenis rata-rata", "Memperbesar massa jenis rata-rata", "Meniupkan udara keluar", "Memperluas permukaan"], correct: 1 },
    { question: "Besi tenggelam, namun kapal besi bisa mengapung karena...", options: ["Kapal sangat ringan", "Gaya gravitasi di laut kecil", "Volume kapal besar sehingga gaya apung membesar", "Massa jenis air laut lebih kecil"], correct: 2 },
    { question: "Permukaan air dalam tabung berbentuk meniskus cekung karena...", options: ["Adhesi > Kohesi", "Kohesi > Adhesi", "Massa air besar", "Tekanan air tinggi"], correct: 0 },
    { question: "Benda melayang di air jika massa jenisnya...", options: ["Lebih besar dari air", "Sama dengan air", "Lebih kecil dari air", "Tidak menentu"], correct: 1 },
    { question: "Gaya apung pada benda volume 2 m³ tercelup seluruhnya di air (ρ=1000 kg/m³, g=10 m/s²) adalah...", options: ["200 N", "2.000 N", "20.000 N", "200.000 N"], correct: 2 },
    { question: "Alat yang biasa digunakan untuk mengukur massa jenis cairan adalah...", options: ["Kalorimeter", "Amperemeter", "Hidrometer", "Termometer"], correct: 2 },

    // Bunyi (12 Soal)
    { question: "Gelombang bunyi berdasarkan medium perambatannya termasuk gelombang...", options: ["Elektromagnetik", "Mekanik", "Transversal", "Cahaya"], correct: 1 },
    { question: "Gelombang bunyi tidak dapat merambat melalui...", options: ["Zat cair", "Zat padat", "Gas", "Ruang hampa"], correct: 3 },
    { question: "Frekuensi bunyi yang dapat didengar manusia (audiosonik) berada pada rentang...", options: ["Di bawah 20 Hz", "20 Hz - 20.000 Hz", "Di atas 20.000 Hz", "20 Hz - 200 Hz"], correct: 1 },
    { question: "Bunyi merambat paling cepat pada medium...", options: ["Zat padat", "Zat cair", "Gas", "Udara"], correct: 0 },
    { question: "Pemantulan bunyi yang terdengar jelas setelah bunyi asli selesai disebut...", options: ["Gaung", "Gema", "Resonansi", "Desah"], correct: 1 },
    { question: "Alat yang menggunakan pantulan bunyi ultrasonik di kapal untuk mengukur kedalaman laut disebut...", options: ["Radar", "Laser", "Sonar", "Lidar"], correct: 2 },
    { question: "Peristiwa ikut bergetarnya suatu benda karena pengaruh benda lain yang bergetar disebut...", options: ["Interferensi", "Pemantulan", "Resonansi", "Difraksi"], correct: 2 },
    { question: "Tinggi rendahnya nada sebuah bunyi bergantung pada...", options: ["Amplitudo", "Frekuensi", "Panjang gelombang", "Cepat rambat"], correct: 1 },
    { question: "Kuat lemahnya bunyi yang terdengar bergantung pada...", options: ["Frekuensi", "Amplitudo", "Kecepatan", "Periode"], correct: 1 },
    { question: "Kelelawar dan lumba-lumba mencari mangsa menggunakan sistem...", options: ["Resonansi", "Ekolokasi", "Elektromagnetik", "Efek Doppler"], correct: 1 },
    { question: "Menurut Efek Doppler, frekuensi sirine yang didengar pengamat akan lebih tinggi jika...", options: ["Sumber menjauhi pengamat", "Sumber diam", "Sumber mendekati pengamat", "Pengamat menjauhi sumber"], correct: 2 },
    { question: "Anjing dapat mendengar bunyi infrasonik, yaitu bunyi dengan frekuensi...", options: ["Lebih dari 20.000 Hz", "Tepat 20.000 Hz", "Kurang dari 20 Hz", "Antara 20 - 20.000 Hz"], correct: 2 },

    // Persamaan Gelombang (12 Soal)
    { question: "Jarak antara dua bukit gelombang yang berdekatan pada gelombang transversal disebut...", options: ["Amplitudo", "1 Panjang gelombang (λ)", "Setengah gelombang", "Periode"], correct: 1 },
    { question: "Banyaknya gelombang yang terjadi dalam waktu satu detik disebut...", options: ["Periode", "Frekuensi", "Amplitudo", "Cepat rambat"], correct: 1 },
    { question: "Jika frekuensi gelombang 50 Hz dan panjang gelombang 2 m, maka cepat rambatnya adalah...", options: ["100 m/s", "25 m/s", "10 m/s", "0.04 m/s"], correct: 0 },
    { question: "Waktu yang dibutuhkan untuk menempuh satu panjang gelombang penuh disebut...", options: ["Frekuensi", "Amplitudo", "Simpangan", "Periode"], correct: 3 },
    { question: "Gelombang yang arah getarnya tegak lurus dengan arah rambatnya disebut gelombang...", options: ["Transversal", "Longitudinal", "Elektromagnetik", "Mekanik"], correct: 0 },
    { question: "Pada persamaan simpangan Y = A sin(ωt - kx), besaran 'A' melambangkan...", options: ["Frekuensi", "Kecepatan", "Amplitudo", "Panjang gelombang"], correct: 2 },
    { question: "Besaran 'k' pada persamaan Y = A sin(ωt - kx) disebut...", options: ["Kecepatan sudut", "Bilangan gelombang", "Fase gelombang", "Cepat rambat"], correct: 1 },
    { question: "Rumus untuk mencari bilangan gelombang (k) adalah...", options: ["2π/T", "2π/f", "2π/λ", "λ/T"], correct: 2 },
    { question: "Jarak simpangan terjauh dari titik kesetimbangan gelombang disebut...", options: ["Panjang gelombang", "Fase", "Amplitudo", "Periode"], correct: 2 },
    { question: "Rumus untuk mencari frekuensi sudut (ω) adalah...", options: ["2πf", "2π/λ", "v/λ", "T/2π"], correct: 0 },
    { question: "Diberikan gelombang Y = 5 sin(10πt - 2πx). Frekuensi gelombang tersebut adalah...", options: ["10 Hz", "5 Hz", "2 Hz", "1 Hz"], correct: 1 },
    { question: "Dari persamaan Y = 5 sin(10πt - 2πx), besar panjang gelombang (λ) adalah...", options: ["1 meter", "2 meter", "5 meter", "10 meter"], correct: 0 }
];

const learningModules = {
    newton: {
        title: "Hukum Newton",
        content: '<iframe src="https://www.fisikaon.com/2022/05/hukum-newton.html" width="100%" height="450px" style="border:none; border-radius: 8px; background: white;"></iframe>'
    },
    fluida: {
        title: "Fluida Statis",
        content: '<iframe src="https://www.fisikaon.com/2026/06/menyelami-misteri-fluida-statis-massa.html" width="100%" height="450px" style="border:none; border-radius: 8px; background: white;"></iframe>'
    },
    bunyi: {
        title: "Bunyi dan Gelombang",
        tabs: [
            {
                label: "Gelombang Bunyi",
                content: '<iframe src="https://www.fisikaon.com/2022/06/gelombang-bunyi.html" width="100%" height="450px" style="border:none; border-radius: 8px; background: white;"></iframe>'
            },
            {
                label: "Persamaan Gelombang",
                content: '<iframe src="https://www.fisikaon.com/2026/07/menguak-rahasia-persamaan-gelombang.html" width="100%" height="450px" style="border:none; border-radius: 8px; background: white;"></iframe>'
            }
        ]
    }
};
