export type CivicCategory =
  | "Pengingkaran Kewajiban Warga Negara"
  | "Pelanggaran Hak Warga Negara"
  | "Pelanggaran Hak & Pengingkaran Kewajiban"

export interface CivicCase {
  id: string
  title: string
  shortTitle: string
  category: CivicCategory
  legalBasis: string
  pancasilaSila: string
  description: string
  impact: string
  solutifIdea: string
  tileCoord: { x: number; y: number }
  visualType:
    | "trash"
    | "graffiti"
    | "lamp"
    | "encroachment"
    | "fire"
    | "deforestation"
    | "toxic"
    | "poaching"
    | "cyberbullying"
    | "hoax"
    | "data_leak"
    | "piracy"
    | "bullying"
    | "discrimination"
    | "cheating"
    | "brawl"
    | "bribery"
    | "medical_denial"
    | "tax_evasion"
    | "traffic_violation"
  quizQuestion: string
  quizOptions: string[]
  correctOptionIndex: number
  quizExplanation: string
}

export interface CivicStage {
  id: string
  title: string
  subtitle: string
  environmentName: string
  roomPreset: "Park" | "Forest" | "School" | "Cyber" | "Civic"
  color: string
  badge: string
  narratorIntro: string
  narratorSuccess: string
  cases: CivicCase[]
}

export const CIVIC_STAGES: CivicStage[] = [
  {
    id: "stage-1",
    title: "Stage 1: Fasilitas Umum & Lingkungan Kota",
    subtitle: "Taman Kota & Jalur Pedestrian",
    environmentName: "Taman Kota Pancasila",
    roomPreset: "Park",
    color: "#22c55e",
    badge: "🌳",
    narratorIntro:
      "Selamat bertugas, Agen! Di area Taman Kota ini terdapat 4 pelanggaran hak dan pengingkaran kewajiban warga negara terhadap fasilitas publik. Cari dan selidiki setiap objek mencurigakan!",
    narratorSuccess:
      "Luar biasa! Kamu telah mengidentifikasi semua masalah lingkungan & fasilitas umum di Taman Kota. Ingat: menjaga fasilitas publik adalah wujud cinta tanah air dan pengamalan Sila ke-2 & ke-5!",
    cases: [
      {
        id: "case-1-1",
        title: "Kasus: Membuang Sampah Sembarangan",
        shortTitle: "Tumpukan Sampah Liar",
        category: "Pengingkaran Kewajiban Warga Negara",
        legalBasis: "Pasal 28H ayat (1) UUD 1945 & UU No. 32 Tahun 2009 (Perlindungan dan Pengelolaan Lingkungan Hidup)",
        pancasilaSila: "Sila ke-2 (Kemanusiaan yang Adil dan Beradab) & Sila ke-5 (Keadilan Sosial)",
        description:
          "Tindakan membuang sampah sembarangan di taman dan ruang publik mencemari lingkungan, memicu sarang penyakit, dan melanggar hak orang lain untuk menikmati lingkungan yang bersih, sehat, dan nyaman.",
        impact:
          "Menyumbat saluran drainase kota, memicu banjir bandang, menurunkan kualitas hidup warga, dan membebani petugas kebersihan.",
        solutifIdea:
          "Membuat kampanye digital 'Bijak Kelola Sampah', menyediakan tempat sampah terpilah (organik, anorganik, residu), serta menerapkan sistem pelaporan warga berbasis aplikasi dengan sanksi denda kebersihan.",
        tileCoord: { x: 5, y: 7 },
        visualType: "trash",
        quizQuestion: "Mengapa membuang sampah sembarangan dikategorikan sebagai Pengingkaran Kewajiban Warga Negara?",
        quizOptions: [
          "Karena melanggar kewajiban hukum menjaga kelestarian lingkungan dan merampas hak orang lain atas lingkungan bersih (Pasal 28H UUD 1945)",
          "Karena sampah hanya merupakan masalah estetika kota tanpa kaitan dengan hak asasi warga negara",
          "Karena hanya pemerintah daerah yang berkewajiban membersihkan seluruh sampah warga negara",
          "Karena undang-undang membebaskan warga membuang sampah jika belum ada petugas kebersihan",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Tepat sekali! Berdasarkan Pasal 28H ayat (1) UUD 1945, setiap orang berhak hidup sejahtera dan menikmati lingkungan hidup yang baik dan sehat. Membuang sampah sembarangan adalah pengingkaran kewajiban memelihara kelestarian lingkungan yang diatur dalam UU No. 32 Tahun 2009.",
      },
      {
        id: "case-1-2",
        title: "Kasus: Vandalisme Fasilitas & Dinding Publik",
        shortTitle: "Coretan Liar Dinding",
        category: "Pengingkaran Kewajiban Warga Negara",
        legalBasis: "Pasal 27 ayat (1) UUD 1945 & Pasal 406 Kitab Undang-Undang Hukum Pidana (KUHP)",
        pancasilaSila: "Sila ke-2 & Sila ke-3 (Persatuan Indonesia)",
        description:
          "Mencoret-coret tembok taman, halte, atau bangku umum tanpa izin merusak estetika kota dan menghancurkan aset negara yang dibangun menggunakan uang pajak seluruh rakyat.",
        impact:
          "Menciptakan kesan kumuh, menimbulkan rasa tidak aman bagi pengunjung, serta membuang anggaran daerah untuk biaya renovasi ulang.",
        solutifIdea:
          "Menyediakan 'Mural Corner' resmi sebagai wadah ekspresi seni generasi muda, memperketat patroli pengawasan, serta memberikan sanksi restoratif kerja sosial membersihkan fasilitas publik.",
        tileCoord: { x: 14, y: 3 },
        visualType: "graffiti",
        quizQuestion: "Bagaimana solusi solutif terbaik agar ekspresi seni generasi muda tidak menjadi tindak vandalisme liar?",
        quizOptions: [
          "Melarang seluruh penjualan cat semprot di toko bangunan",
          "Menyediakan ruang mural dan graffiti legal oleh Pemda serta menerapkan sanksi edukatif kerja sosial",
          "Membiarkan coretan liar karena merupakan hak kebebasan berpendapat tanpa batas",
          "Menghapus fasilitas halte dan dinding publik agar tidak ada media yang dicoret",
        ],
        correctOptionIndex: 1,
        quizExplanation:
          "Benar! Solusi solutif yang beradab adalah mengakomodasi bakat seni pemuda melalui 'Mural Corner' resmi dari dinas pariwisata, sekaligus menegakkan hukum restoratif bagi pelaku vandalisme liar.",
      },
      {
        id: "case-1-3",
        title: "Kasus: Perusakan Lampu Penerangan Jalan",
        shortTitle: "Lampu Jalan Dirusak",
        category: "Pelanggaran Hak Warga Negara",
        legalBasis: "Pasal 28G ayat (1) UUD 1945 (Hak atas Rasa Aman dan Perlindungan dari Ancaman Ketakutan)",
        pancasilaSila: "Sila ke-2 & Sila ke-5",
        description:
          "Merusak sengaja atau mencuri komponen lampu penerangan jalan umum merampas hak masyarakat untuk memperoleh rasa aman dan penerangan yang layak saat beraktivitas di malam hari.",
        impact:
          "Meningkatkan kerawanan aksi begal, penjambretan, dan kecelakaan lalu lintas di kawasan yang gelap gulita.",
        solutifIdea:
          "Pemasangan lampu jalan cerdas tahan benturan berbasis sensor gerak & CCTV bertenaga surya, ditambah pos kamling warga aktif berkoordinasi dengan aparat kepolisian.",
        tileCoord: { x: 12, y: 11 },
        visualType: "lamp",
        quizQuestion: "Hak konstitusional warga negara manakah yang dilanggar akibat perusakan fasilitas lampu penerangan jalan umum?",
        quizOptions: [
          "Hak untuk memilih dalam pemilihan umum (Pasal 22E UUD 1945)",
          "Hak atas rasa aman, perlindungan diri, dan bebas dari ancaman ketakutan (Pasal 28G ayat 1 UUD 1945)",
          "Hak mendirikan serikat buruh (Pasal 28 UUD 1945)",
          "Hak memiliki kewarganegaraan ganda",
        ],
        correctOptionIndex: 1,
        quizExplanation:
          "Luar biasa! Ketika fasilitas penerangan publik dirusak, warga kehilangan hak atas rasa aman (Pasal 28G ayat 1 UUD 1945) saat melintas di malam hari karena kegelapan memicu peluang tindak kejahatan jalanan.",
      },
      {
        id: "case-1-4",
        title: "Kasus: Penyerobotan Trotoar Pedestrian",
        shortTitle: "Penyerobotan Trotoar",
        category: "Pelanggaran Hak & Pengingkaran Kewajiban",
        legalBasis: "UU No. 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan (Pasal 131 & 132)",
        pancasilaSila: "Sila ke-5 (Keadilan Sosial bagi Seluruh Rakyat Indonesia)",
        description:
          "Pengendara motor yang melintas di atas trotoar dan parkir liar merampas hak pejalan kaki, lansia, anak-anak, dan penyandang disabilitas tunanetra atas akses jalan yang aman.",
        impact:
          "Pejalan kaki terpaksa berjalan di badan jalan sehingga terancam tertabrak kendaraan, merusak ubin pemandu (guiding block) disabilitas.",
        solutifIdea:
          "Pemasangan tiang bollard anti-sepeda motor yang tetap ramah kursi roda, penindakan tilang elektronik mobile oleh kepolisian, serta relokasi pedagang ke sentra pujasera binaan.",
        tileCoord: { x: 4, y: 12 },
        visualType: "encroachment",
        quizQuestion: "Mengapa penyerobotan trotoar oleh sepeda motor melanggar prinsip keadilan sosial (Sila ke-5)?",
        quizOptions: [
          "Karena trotoar dirancang eksklusif khusus pejalan kaki, lansia, dan kaum difabel demi akses publik yang adil dan aman",
          "Karena sepeda motor membutuhkan bensin lebih banyak jika melintas di trotoar",
          "Karena pejalan kaki memiliki kecepatan gerak yang lebih cepat dari motor",
          "Karena pengendara motor tidak membayar pajak jalan raya",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Tepat! Keadilan sosial menuntut perlindungan bagi kelompok rentan pejalan kaki dan kaum difabel. Menyerobot trotoar adalah tindakan egois yang meniadakan hak kelompok lain demi keuntungan pribadi sesaat.",
      },
    ],
  },
  {
    id: "stage-2",
    title: "Stage 2: Kelestarian Alam & Hutan Hujan Tropis",
    subtitle: "Kawasan Hutan Lindung Nusantara",
    environmentName: "Kawasan Konservasi Hutan",
    roomPreset: "Forest",
    color: "#eab308",
    badge: "🔥",
    narratorIntro:
      "Laporan darurat, Agen! Terjadi ancaman besar terhadap paru-paru dunia kita. Selidiki titik-titik kerusakan ekosistem dan pengingkaran kewajiban menjaga alam di kawasan hutan ini!",
    narratorSuccess:
      "Hebat sekali! Kasus lingkungan hutan berhasil kamu tuntaskan. Menjaga kekayaan alam adalah amanat Pasal 33 ayat (3) UUD 1945 demi masa depan generasi penerus bangsa!",
    cases: [
      {
        id: "case-2-1",
        title: "Kasus: Pembakaran Hutan & Lahan (Karhutla)",
        shortTitle: "Titik Api Karhutla",
        category: "Pengingkaran Kewajiban Warga Negara",
        legalBasis: "Pasal 28H ayat (1) UUD 1945 & UU No. 32 Tahun 2009 Pasal 69 ayat (1) huruf h",
        pancasilaSila: "Sila ke-2 & Sila ke-3 (Persatuan Indonesia)",
        description:
          "Membakar hutan demi membuka lahan perkebunan murah melanggar kewajiban menjaga kelestarian lingkungan dan melanggar hak hidup sehat jutaan penduduk yang tercekik kabut asap.",
        impact:
          "Menyebabkan bencana kabut asap lintas negara, penyakit ISPA massal bagi balita dan lansia, memusnahkan habitat satwa, dan menyumbang emisi karbon global.",
        solutifIdea:
          "Pencabutan izin usaha dan pidana berat bagi korporasi pelanggar, pemantauan citra satelit hotspot real-time, serta edukasi Pembukaan Lahan Tanpa Bakar (PLTB) dengan biokomposter.",
        tileCoord: { x: 10, y: 5 },
        visualType: "fire",
        quizQuestion: "Ditinjau dari hukum konstitusi, pembakaran hutan secara sengaja melanggar hak asasi warga negara yaitu...",
        quizOptions: [
          "Hak untuk hidup sejahtera lahir dan batin serta memperoleh lingkungan hidup yang sehat (Pasal 28H ayat 1)",
          "Hak untuk memeluk agama dan beribadat menurut agamanya (Pasal 29 ayat 2)",
          "Hak untuk memajukan diri dalam memperjuangkan haknya secara kolektif",
          "Hak memperoleh kewarganegaraan negara lain",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Tepat sekali! Asap pekat kebakaran hutan merenggut hak hidup sehat jutaan anak dan warga di berbagai provinsi, menjadikannya kejahatan lingkungan luar biasa yang melanggar Pasal 28H ayat (1) UUD 1945.",
      },
      {
        id: "case-2-2",
        title: "Kasus: Penebangan Liar (Illegal Logging)",
        shortTitle: "Penebangan Liar",
        category: "Pengingkaran Kewajiban Warga Negara",
        legalBasis: "Pasal 33 ayat (3) UUD 1945 & UU No. 18 Tahun 2013 (Pencegahan dan Pemberantasan Perusakan Hutan)",
        pancasilaSila: "Sila ke-5 (Keadilan Sosial)",
        description:
          "Menebang pohon secara membabi-buta di kawasan hutan lindung tanpa izin demi keuntungan segelintir orang merusak ekosistem dan resapan air alami tanah air.",
        impact:
          "Memicu erosi, banjir bandang maut, tanah longsor yang menimbun pemukiman warga desa sekitar, serta kekeringan saat musim kemarau.",
        solutifIdea:
          "Sertifikasi kayu digital terverifikasi (SVLK), patroli drone thermal polisi kehutanan, serta gerakan reboisasi satu pohon per siswa sekolah.",
        tileCoord: { x: 4, y: 6 },
        visualType: "deforestation",
        quizQuestion: "Prinsip pemanfaatan sumber daya alam yang ditegaskan dalam Pasal 33 ayat (3) UUD 1945 adalah...",
        quizOptions: [
          "Bumi, air, dan kekayaan alam dikuasai negara dan dipergunakan untuk sebesar-besar kemakmuran rakyat secara berkelanjutan",
          "Hutan bebas dieksploitasi oleh siapa saja yang menemukan kayunya lebih dulu",
          "Hutan hanya diperuntukkan bagi pengusaha yang menyetor keuntungan terbesar",
          "Pohon di hutan lindung boleh ditebang habis tanpa kewajiban menanam kembali",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Benar! Pasal 33 ayat (3) menegaskan bahwa kekayaan alam bumi pertiwi harus dikelola untuk kemakmuran seluruh rakyat secara adil dan berkelanjutan, bukan dieksploitasi liar demi keserakahan pribadi.",
      },
      {
        id: "case-2-3",
        title: "Kasus: Pembuangan Limbah Kimia ke Sungai",
        shortTitle: "Pipa Limbah Beracun",
        category: "Pelanggaran Hak Warga Negara",
        legalBasis: "Pasal 28A & 28H ayat (1) UUD 1945 (Hak untuk Hidup dan Memperoleh Lingkungan Bersih)",
        pancasilaSila: "Sila ke-2 (Kemanusiaan yang Adil dan Beradab)",
        description:
          "Pabrik atau oknum yang membuang air limbah B3 tanpa disaring ke sungai merampas hak masyarakat sekitar atas pasokan air bersih dan sanitasi layak.",
        impact:
          "Ikan dan biota sungai mati massal, air tanah warga terkontaminasi logam berat berbahaya yang memicu penyakit kanker dan stunting.",
        solutifIdea:
          "Kewajiban instalasi IPAL (Instalasi Pengolahan Air Limbah) bersertifikat dengan sensor digital pemantau pH online yang terhubung ke Dinas Lingkungan Hidup.",
        tileCoord: { x: 14, y: 9 },
        visualType: "toxic",
        quizQuestion: "Tindakan preventif berbasis teknologi yang wajib dipasang oleh setiap industri agar sungai tidak tercemar adalah...",
        quizOptions: [
          "Instalasi Pengolahan Air Limbah (IPAL) berstandar SNI dengan sensor digital terintegrasi ke dinas lingkungan",
          "Membuat pipa pembuangan tersembunyi di malam hari",
          "Menambahkan pewarna air agar sungai terlihat jernih",
          "Memindahkan pabrik ke dekat pemukiman padat",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Hebat! Instalasi IPAL wajib hukumnya sebelum air sisa produksi dialirkan ke badan air publik, agar kandungan racun dan logam berat telah dinetralisir sepenuhnya.",
      },
      {
        id: "case-2-4",
        title: "Kasus: Perburuan & Perdagangan Satwa Dilindungi",
        shortTitle: "Perburuan Satwa Langka",
        category: "Pengingkaran Kewajiban Warga Negara",
        legalBasis: "UU No. 5 Tahun 1990 tentang Konservasi Sumber Daya Alam Hayati dan Ekosistemnya",
        pancasilaSila: "Sila ke-2 & Sila ke-1 (Ketuhanan Yang Maha Esa - menjaga ciptaan Tuhan)",
        description:
          "Memasang perangkap liar dan menyelundupkan satwa langka seperti Harimau Sumatera, Orangutan, dan Burung Cenderawasih merusak rantai makanan hayati Indonesia.",
        impact:
          "Kepunahan spesies endemik kebanggaan bangsa, terganggunya keseimbangan ekologi, dan mencoreng martabat Indonesia di mata internasional.",
        solutifIdea:
          "Patroli cyber crime terhadap jual-beli satwa langka di medsos, pemberdayaan masyarakat adat sebagai penjaga hutan (forest ranger), dan rehabilitasi suaka satwa.",
        tileCoord: { x: 6, y: 13 },
        visualType: "poaching",
        quizQuestion: "Bagaimana kaitan perlindungan satwa endemik dengan pengamalan Sila ke-1 Pancasila?",
        quizOptions: [
          "Sebagai wujud rasa syukur dan tanggung jawab memelihara kelestarian makhluk ciptaan Tuhan Yang Maha Esa",
          "Sebagai komoditas perdagangan ekspor yang bebas diperjualbelikan",
          "Satwa liar tidak memiliki kaitan dengan nilai-nilai Ketuhanan",
          "Hanya berlaku untuk hewan peliharaan domestik di rumah",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Tepat! Sila ke-1 mengajarkan manusia untuk menghargai dan merawat seluruh ciptaan Tuhan di alam semesta, bukan membantai satwa langka demi kebanggaan atau keuntungan materi.",
      },
    ],
  },
  {
    id: "stage-3",
    title: "Stage 3: Ruang Digital & Era Siber",
    subtitle: "Cyber Lounge & Laboratorium Informasi",
    environmentName: "Cyber Cafe & Internet Hub",
    roomPreset: "Cyber",
    color: "#06b6d4",
    badge: "💻",
    narratorIntro:
      "Di era revolusi digital, ruang siber juga membutuhkan etika dan penegakan hukum! Telusuri laboratorium siber ini untuk menemukan pelanggaran hak privasi dan pengingkaran etika berinternet.",
    narratorSuccess:
      "Misi siber selesai dengan gemilang! Sebagai warganet Pancasila, selalu junjung nilai kesopanan, toleransi, dan perlindungan privasi sesama anak bangsa di dunia maya!",
    cases: [
      {
        id: "case-3-1",
        title: "Kasus: Cyberbullying & Pelecehan Daring",
        shortTitle: "Serangan Cyberbullying",
        category: "Pelanggaran Hak Warga Negara",
        legalBasis: "Pasal 28G ayat (1) UUD 1945 & UU ITE (Informasi dan Transaksi Elektronik)",
        pancasilaSila: "Sila ke-2 (Kemanusiaan yang Adil dan Beradab)",
        description:
          "Menyerang fisik, latar belakang sosial, atau menyebarkan pesan kebencian untuk mempermalukan seseorang di media sosial melanggar hak atas kehormatan dan martabat pribadi.",
        impact:
          "Menyebabkan trauma mental berat, kecemasan akut, depresi, penurunan prestasi belajar, hingga risiko melukai diri sendiri pada korban.",
        solutifIdea:
          "Sosialisasi etika 'Stop Cyberbullying' di sekolah, tombol bantuan krisis mental daring yang ramah remaja, dan pendampingan psikologis bagi korban.",
        tileCoord: { x: 4, y: 5 },
        visualType: "cyberbullying",
        quizQuestion: "Berdasarkan Pasal 28G ayat (1) UUD 1945, korban cyberbullying dilanggar hak asasinya dalam hal...",
        quizOptions: [
          "Hak atas perlindungan diri pribadi, kehormatan, martabat, dan rasa aman",
          "Hak untuk mengakses internet berkecepatan tinggi tanpa kuota",
          "Hak membalas hujatan dengan ujaran kebencian yang sama",
          "Hak untuk tidak bersekolah selamanya",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Benar sekali! Konstitusi menjamin kehormatan dan martabat setiap warga negara (Pasal 28G ayat 1). Menyerang mental dan mempermalukan orang lain di media sosial adalah pelanggaran hak asasi yang dapat dipidana melalui UU ITE.",
      },
      {
        id: "case-3-2",
        title: "Kasus: Penyebaran Berita Hoaks & Ujaran Kebencian",
        shortTitle: "Sebar Hoaks & Provokasi",
        category: "Pengingkaran Kewajiban Warga Negara",
        legalBasis: "Pasal 28J ayat (1) UUD 1945 (Kewajiban Menghormati Hak Asasi Orang Lain) & UU ITE",
        pancasilaSila: "Sila ke-3 (Persatuan Indonesia)",
        description:
          "Memproduksi atau meneruskan informasi bohong (hoaks) bernuansa adu domba SARA demi kepentingan tertentu adalah pengingkaran kewajiban menjaga persatuan dan kerukunan bangsa.",
        impact:
          "Menyulut konflik horizontal antar kelompok masyarakat, memecah-belah kebhinekaan, dan menimbulkan kepanikan sosial yang berbahaya.",
        solutifIdea:
          "Edukasi gerakan 'Saring Sebelum Sharing', cek fakta mandiri melalui portal cekfakta terakreditasi, serta literasi algoritma media sosial.",
        tileCoord: { x: 12, y: 4 },
        visualType: "hoax",
        quizQuestion: "Langkah literasi digital paling efektif sebelum menyebarkan suatu berita kontroversial di grup media sosial adalah...",
        quizOptions: [
          "Melakukan cek fakta (fact-check) di sumber kredibel dan memverifikasi keaslian bukti (Saring Sebelum Sharing)",
          "Langsung membagikan ke semua grup agar menjadi yang pertama memberi kabar",
          "Menambahkan kata-kata provokatif agar memancing perdebatan sengit",
          "Menghapus nama penulis asli agar tidak ketahuan sumbernya",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Tepat! Gerakan 'Saring Sebelum Sharing' adalah benteng utama persatuan bangsa (Sila ke-3) agar masyarakat tidak termakan fitnah dan adu domba digital.",
      },
      {
        id: "case-3-3",
        title: "Kasus: Kebocoran Data Pribadi & Doxing Ilegal",
        shortTitle: "Doxing & Peretasan Data",
        category: "Pelanggaran Hak Warga Negara",
        legalBasis: "Pasal 28G ayat (1) UUD 1945 & UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)",
        pancasilaSila: "Sila ke-2 & Sila ke-5",
        description:
          "Menyebarluaskan data sensitif seseorang (NIK, nomor rekening, rekam medis, alamat rumah) tanpa izin demi tujuan intimidasi merampas hak privasi warga negara.",
        impact:
          "Korban menjadi target penipuan finansial, pemerasan, teror panggilan telepon, dan ancaman fisik ke kediaman pribadi.",
        solutifIdea:
          "Implementasi standar keamanan enkripsi data ketat bagi instansi pengelola data, audit forensik siber berkala, dan penegakan denda maksimal bagi pelaku kejahatan data pribadi.",
        tileCoord: { x: 14, y: 10 },
        visualType: "data_leak",
        quizQuestion: "Undang-Undang Republik Indonesia terbaru yang secara khusus melindungi data pribadi setiap warga negara adalah...",
        quizOptions: [
          "UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)",
          "UU No. 1 Tahun 1974 tentang Perkawinan",
          "UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik",
          "UU Kepemilikan Tanah Pertanian",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Tepat! UU No. 27 Tahun 2022 (UU PDP) mengamanatkan perlindungan ketat atas hak privasi data pribadi setiap warga negara Indonesia dari aksi kebocoran dan doxing.",
      },
      {
        id: "case-3-4",
        title: "Kasus: Pembajakan Karya Cipta & Plagiarisme",
        shortTitle: "Pembajakan Hak Cipta",
        category: "Pelanggaran Hak & Pengingkaran Kewajiban",
        legalBasis: "Pasal 28C ayat (1) UUD 1945 & UU No. 28 Tahun 2014 tentang Hak Cipta",
        pancasilaSila: "Sila ke-5 (Keadilan Sosial bagi Seluruh Rakyat Indonesia)",
        description:
          "Mendistribusikan, menjual, atau mengunduh karya seni, buku, musik, film, dan software secara ilegal merampas hak royalti dan hasil jerih payah para kreator anak negeri.",
        impact:
          "Mematikan industri kreatif nasional, menurunkan motivasi inovator lokal, serta membudayakan mentalitas serba gratis tanpa menghargai kerja keras orang lain.",
        solutifIdea:
          "Membiasakan konsumsi konten lewat platform legal berlisensi resmi, kampanye apresiasi hak cipta lokal, dan edukasi sitasi akademik yang benar.",
        tileCoord: { x: 6, y: 11 },
        visualType: "piracy",
        quizQuestion: "Mengapa pembajakan karya intelektual bertentangan dengan Sila ke-5 Pancasila (Keadilan Sosial)?",
        quizOptions: [
          "Karena merampas hak royalti dan jerih payah pencipta yang telah berkorban waktu, pikiran, dan tenaga",
          "Karena software bajakan ukurannya selalu lebih besar daripada software asli",
          "Karena kreator seni tidak membutuhkan penghasilan ekonomi",
          "Karena karya digital tidak memiliki hak kepemilikan hukum",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Tepat! Menghargai hak kekayaan intelektual (HAKI) adalah pengamalan keadilan sosial. Membajak adalah merampas hak ekonomi orang lain atas hasil karya intelektualnya.",
      },
    ],
  },
  {
    id: "stage-4",
    title: "Stage 4: Sekolah & Lingkungan Pendidikan",
    subtitle: "Halaman & Ruang Belajar Sekolah Pancasila",
    environmentName: "SMA Bhinneka Tunggal Ika",
    roomPreset: "School",
    color: "#3b82f6",
    badge: "🎓",
    narratorIntro:
      "Sekolah adalah kawah candradimuka karakter penerus bangsa! Mari selidiki pelanggaran hak belajar dan pengingkaran kedisiplinan yang kerap mencederai nilai luhur pendidikan kita.",
    narratorSuccess:
      "Penyelidikan sekolah selesai! Ingatlah selalu bahwa pendidikan adalah hak asasi setiap anak bangsa (Pasal 31 UUD 1945) dan kejujuran adalah mata uang yang tidak pernah kedaluwarsa!",
    cases: [
      {
        id: "case-4-1",
        title: "Kasus: Perundungan (Bullying) Fisik & Senioritas",
        shortTitle: "Perundungan Pelajar",
        category: "Pelanggaran Hak Warga Negara",
        legalBasis: "Pasal 28B ayat (2) UUD 1945 & Permendikbudristek No. 46 Tahun 2023 (PPKSP)",
        pancasilaSila: "Sila ke-2 (Kemanusiaan yang Adil dan Beradab)",
        description:
          "Setiap anak berhak atas kelangsungan hidup, tumbuh, dan berkembang serta berhak atas perlindungan dari kekerasan dan diskriminasi di lingkungan satuan pendidikan.",
        impact:
          "Korban mengalami ketakutan pergi ke sekolah, hilangnya motivasi berprestasi, isolasi sosial, hingga luka fisik yang membahayakan jiwa.",
        solutifIdea:
          "Optimalisasi Tim Pencegahan dan Penanganan Kekerasan (TPPK) sekolah, kanal pelaporan rahasia (whistleblowing), dan pembinaan konseling restoratif sebaya.",
        tileCoord: { x: 5, y: 6 },
        visualType: "bullying",
        quizQuestion: "Langkah konkret yang wajib ada di setiap sekolah untuk memutus rantai perundungan siswa adalah...",
        quizOptions: [
          "Membentuk Tim Pencegahan dan Penanganan Kekerasan (TPPK) serta menyediakan kanal pelaporan aman dan anonim",
          "Meminta korban memaafkan pelaku tanpa proses bimbingan dan sanksi edukatif",
          "Menyembunyikan kasus agar nama baik sekolah tidak tercoreng",
          "Mengeluarkan korban perundungan dari sekolah",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Tepat! Berdasarkan Permendikbudristek PPKSP, sekolah wajib membentuk TPPK yang aktif melindungi korban, memberikan konseling psikologis, dan mendidik pelaku agar tidak mengulangi kekerasan.",
      },
      {
        id: "case-4-2",
        title: "Kasus: Diskriminasi Akses Belajar Disabilitas",
        shortTitle: "Diskriminasi Pendidikan",
        category: "Pelanggaran Hak Warga Negara",
        legalBasis: "Pasal 31 ayat (1) & (2) UUD 1945 & UU No. 8 Tahun 2016 tentang Penyandang Disabilitas",
        pancasilaSila: "Sila ke-5 (Keadilan Sosial bagi Seluruh Rakyat Indonesia)",
        description:
          "Menolak siswa berkebutuhan khusus atau tidak menyediakan sarana ramah disabilitas (seperti ramp kursi roda dan buku braille) melanggar hak konstitusional warga negara atas pendidikan yang setara.",
        impact:
          "Terputusnya akses masa depan bagi penyandang disabilitas, melanggengkan jurang ketimpangan sosial, dan bertentangan dengan prinsip inklusivitas Pancasila.",
        solutifIdea:
          "Mewajibkan standardisasi sekolah ramah anak dan inklusi, pelatihan khusus guru pendamping, dan pemberian beasiswa afirmatif bagi kelompok rentan.",
        tileCoord: { x: 13, y: 5 },
        visualType: "discrimination",
        quizQuestion: "Pasal 31 ayat (1) UUD 1945 dengan tegas menyatakan bahwa...",
        quizOptions: [
          "Setiap warga negara berhak mendapat pendidikan",
          "Hanya siswa yang berprestasi akademik tinggi yang berhak sekolah",
          "Pendidikan hanya wajib bagi masyarakat perkotaan",
          "Pemerintah tidak berkewajiban membiayai pendidikan dasar",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Sangat tepat! 'Setiap warga negara berhak mendapat pendidikan' adalah bunyi Pasal 31 ayat (1). Hak ini bersifat universal tanpa memandang kondisi fisik, suku, ras, maupun latar belakang ekonomi.",
      },
      {
        id: "case-4-3",
        title: "Kasus: Kecurangan Akademik & Joki Tugas Massal",
        shortTitle: "Kecurangan Ujian & Joki",
        category: "Pengingkaran Kewajiban Warga Negara",
        legalBasis: "Pasal 31 ayat (3) UUD 1945 (Mengembangkan Karakter Beriman, Bertaqwa & Berakhlak Mulia)",
        pancasilaSila: "Sila ke-1 & Sila ke-2",
        description:
          "Mencontek, menggunakan joki skripsi/tugas, atau membocorkan kunci jawaban adalah pengingkaran kewajiban moral untuk bersikap jujur dan menghormati proses menuntut ilmu.",
        impact:
          "Melahirkan lulusan bermental culas dan rentan korupsi di masa depan, serta merugikan siswa lain yang belajar dengan tulus dan gigih.",
        solutifIdea:
          "Mengganti asesmen hafalan dengan proyek kontekstual pemecahan masalah, penegakan kode etik akademik tanpa toleransi kompromi, dan pembiasaan budaya malu berbuat curang.",
        tileCoord: { x: 10, y: 11 },
        visualType: "cheating",
        quizQuestion: "Mengapa kejujuran akademik di sekolah menjadi pondasi penting dalam pencegahan korupsi di masa depan?",
        quizOptions: [
          "Karena kejujuran membentuk integritas moral calon pemimpin bangsa agar tidak terbiasa menghalalkan segala cara demi hasil instan",
          "Karena mencontek hanya dilarang jika tertangkap oleh kamera pengawas",
          "Karena nilai ujian yang diperoleh lewat kecurangan dapat dicairkan menjadi uang",
          "Karena joki tugas dilarang hanya untuk tugas kelompok",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Benar! Sikap permisif terhadap kecurangan di bangku sekolah adalah bibit dari mental korupsi. Pasal 31 ayat (3) mengamanatkan sistem pendidikan nasional untuk memupuk akhlak mulia dan integritas.",
      },
      {
        id: "case-4-4",
        title: "Kasus: Tawuran Antar-Pelajar & Perusakan Gedung",
        shortTitle: "Tawuran Pelajar",
        category: "Pengingkaran Kewajiban Warga Negara",
        legalBasis: "Pasal 27 ayat (3) UUD 1945 (Kewajiban Bela Negara) & KUHP Pidana Kekerasan",
        pancasilaSila: "Sila ke-3 (Persatuan Indonesia)",
        description:
          "Aksi kekerasan massal antarpelajar mencoreng nama baik pendidikan, membahayakan keselamatan warga sekitar, dan merusak fasilitas publik yang ada di rute tawuran.",
        impact:
          "Menimbulkan korban jiwa sia-sia, trauma warga, dan mengalihkan fokus generasi muda dari kompetisi global positif ke lingkaran permusuhan primordial.",
        solutifIdea:
          "Penyaluran energi muda melalui kompetisi kolaboratif seni-olahraga antarsekolah, pelibatan alumni inspiratif, dan pembinaan kedisiplinan bela negara.",
        tileCoord: { x: 4, y: 12 },
        visualType: "brawl",
        quizQuestion: "Bentuk nyata partisipasi pelajar dalam menunaikan kewajiban Bela Negara (Pasal 27 ayat 3) adalah...",
        quizOptions: [
          "Belajar sungguh-sungguh, menjaga kerukunan, dan berprestasi positif demi kemajuan bangsa",
          "Membawa senjata tajam untuk mempertahankan reputasi geng sekolah",
          "Menyerang sekolah tetangga yang dianggap saingan",
          "Menolak berteman dengan siswa dari daerah lain",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Tepat! Bela negara bagi pelajar bukan dengan mengangkat senjata tawuran liar, melainkan menuntut ilmu secara tekun, memupuk persatuan antarpelajar, dan mengharumkan nama bangsa.",
      },
    ],
  },
  {
    id: "stage-5",
    title: "Stage 5: Pelayanan Publik & Ketaatan Hukum",
    subtitle: "Balai Layanan Masyarakat & Pusat Administrasi",
    environmentName: "Balai Layanan Terpadu",
    roomPreset: "Civic",
    color: "#a855f7",
    badge: "⚖️",
    narratorIntro:
      "Puncak misi seorang Agen Kewarganegaraan! Di pusat layanan publik ini, selidiki praktik maladministrasi, pungli, dan penolakan hak warga negara yang mencederai keadilan sosial.",
    narratorSuccess:
      "SELAMAT, AGEN TELADAN PANCASILA! Seluruh 5 misi telah tuntas dengan sempurna. Kamu membuktikan bahwa pemahaman mendalam tentang Hak dan Kewajiban adalah kunci kemajuan bangsa Indonesia!",
    cases: [
      {
        id: "case-5-1",
        title: "Kasus: Pungutan Liar (Pungli) Layanan Administrasi",
        shortTitle: "Pungli Meja Layanan",
        category: "Pelanggaran Hak Warga Negara",
        legalBasis: "UU No. 25 Tahun 2009 tentang Pelayanan Publik & UU Tindak Pidana Korupsi",
        pancasilaSila: "Sila ke-5 (Keadilan Sosial bagi Seluruh Rakyat Indonesia)",
        description:
          "Meminta uang pelicin atau uang pelancar untuk pengurusan KTP, sertifikat, atau perizinan yang seharusnya gratis membebani rakyat kecil dan melanggar hak atas pelayanan yang adil dan transparan.",
        impact:
          "Memicu ekonomi biaya tinggi, menyuburkan budaya korupsi birokrasi, dan menurunkan kepercayaan rakyat kepada pemerintah.",
        solutifIdea:
          "Digitalisasi total pelayanan terpadu satu pintu (*one-stop cashless service*), pengawasan misteri belanja (mystery shopping), serta sanksi pemecatan bagi oknum aparat.",
        tileCoord: { x: 5, y: 6 },
        visualType: "bribery",
        quizQuestion: "Sistem pencegahan paling ampuh untuk memberantas pungli di loket pelayanan publik adalah...",
        quizOptions: [
          "Digitalisasi layanan publik secara online tanpa tatap muka tunai (cashless e-government)",
          "Menambah jumlah kotak amplop di bawah meja petugas",
          "Menaikkan tarif tidak resmi agar petugas puas",
          "Menutup kantor pelayanan publik secara permanen",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Benar! Transaksi digital tanpa kontak uang tunai (cashless e-government) menutup celah transaksi gelap dan suap, mewujudkan pelayanan publik yang adil, cepat, dan transparan.",
      },
      {
        id: "case-5-2",
        title: "Kasus: Penolakan Pasien Darurat BPJS / KIS",
        shortTitle: "Penolakan Pasien IGD",
        category: "Pelanggaran Hak Warga Negara",
        legalBasis: "Pasal 28H ayat (1) UUD 1945 & UU No. 17 Tahun 2023 tentang Kesehatan (Pasal 174)",
        pancasilaSila: "Sila ke-2 (Kemanusiaan yang Adil dan Beradab)",
        description:
          "Menolak menangani pasien gawat darurat dengan alasan administrasi belum lengkap atau meminta uang muka adalah pelanggaran berat terhadap hak asasi untuk hidup dan diselamatkan.",
        impact:
          "Kematian pasien yang seharusnya bisa dicegah, kepedihan mendalam keluarga korban, dan pengabaian sumpah profesi medis.",
        solutifIdea:
          "Kebijakan 'Tangani Dulu, Urus Administrasi Kemudian' dengan sanksi pencabutan izin operasional bagi faskes yang menelantarkan pasien darurat.",
        tileCoord: { x: 13, y: 6 },
        visualType: "medical_denial",
        quizQuestion: "Berdasarkan UU Kesehatan No. 17 Tahun 2023, kewajiban mutlak rumah sakit pada pasien gawat darurat adalah...",
        quizOptions: [
          "Wajib memberikan pertolongan medis darurat segera untuk menyelamatkan nyawa tanpa meminta uang muka terlebih dahulu",
          "Wajib memeriksa saldo rekening bank keluarga pasien sebelum tindakan",
          "Boleh menolak jika kartu jaminan kesehatan tertinggal di rumah",
          "Mengarahkan pasien darurat ke apotek terdekat secara mandiri",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Tepat sekali! Keselamatan nyawa manusia adalah hukum tertinggi (Salus Populi Suprema Lex Esto). Rumah sakit dilarang keras menolak pasien darurat atau menuntut uang muka sebelum pertolongan medis diberikan.",
      },
      {
        id: "case-5-3",
        title: "Kasus: Pengemplangan & Penunggakan Pajak Wajib",
        shortTitle: "Pengemplangan Pajak",
        category: "Pengingkaran Kewajiban Warga Negara",
        legalBasis: "Pasal 23A UUD 1945 (Pajak dan Pungutan Bersifat Memaksa untuk Keperluan Negara)",
        pancasilaSila: "Sila ke-5 (Keadilan Sosial)",
        description:
          "Warga negara dan pengusaha yang mampu tetapi dengan sengaja menyembunyikan kekayaan dan tidak membayar pajak telah mengingkari kewajiban gotong royong membiayai pembangunan negara.",
        impact:
          "Pendapatan negara berkurang drastis, menghambat subsidi kesehatan, bantuan pangan rakyat miskin, dan pembangunan infrastruktur desa terpencil.",
        solutifIdea:
          "Sistem perpajakan transparan terintegrasi NIK-NPWP (Coretax System), penghargaan bagi wajib pajak teladan, dan penyitaan aset obligor nakal.",
        tileCoord: { x: 8, y: 10 },
        visualType: "tax_evasion",
        quizQuestion: "Landasan konstitusional yang mewajibkan warga negara membayar pajak untuk keperluan negara tercantum dalam...",
        quizOptions: [
          "Pasal 23A UUD 1945",
          "Pasal 29 ayat (1) UUD 1945",
          "Pasal 36A UUD 1945",
          "Pasal 1 ayat (3) UUD 1945",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Sangat tepat! Pasal 23A UUD 1945 berbunyi: 'Pajak dan pungutan lain yang bersifat memaksa untuk keperluan negara diatur dengan undang-undang.' Menolak bayar pajak adalah pengingkaran kewajiban warga negara yang menghambat subsidi rakyat kecil.",
      },
      {
        id: "case-5-4",
        title: "Kasus: Menerobos Jalur Khusus & Lampu Merah",
        shortTitle: "Terobos Jalur Publik",
        category: "Pengingkaran Kewajiban Warga Negara",
        legalBasis: "Pasal 27 ayat (1) UUD 1945 (Segala Warga Negara Bersamaan Kedudukannya di Dalam Hukum) & UU LLAJ",
        pancasilaSila: "Sila ke-2 & Sila ke-5",
        description:
          "Pengendara yang menerobos jalur khusus transportasi umum (seperti Busway) atau melanggar lampu merah demi kepentingan egois telah mengabaikan keselamatan publik dan tata tertib hukum.",
        impact:
          "Menghambat laju ratusan penumpang angkutan umum massal, memicu kecelakaan beruntun yang merenggut nyawa orang tak bersalah.",
        solutifIdea:
          "Penerapan tilang kamera elektronik (ETLE) 24 jam dengan sanksi denda kumulatif otomatis pada saat pembayaran pajak kendaraan tahunan.",
        tileCoord: { x: 12, y: 12 },
        visualType: "traffic_violation",
        quizQuestion: "Prinsip kesetaraan di hadapan hukum yang tertuang dalam Pasal 27 ayat (1) UUD 1945 bermakna bahwa...",
        quizOptions: [
          "Setiap warga negara tanpa terkecuali wajib menjunjung tinggi hukum dan pemerintahan dengan tidak ada kecualinya",
          "Hanya pengendara angkutan umum yang wajib mematuhi lampu lalu lintas",
          "Aturan lalu lintas hanya berlaku untuk pengendara pemula",
          "Pejabat boleh melanggar lampu merah sesuka hati tanpa pengawalan resmi",
        ],
        correctOptionIndex: 0,
        quizExplanation:
          "Tepat! Pasal 27 ayat (1) menegaskan asas equality before the law: setiap warga negara bersamaan kedudukannya di dalam hukum dan wajib menjunjung hukum tersebut dengan tidak ada kecualinya.",
      },
    ],
  },
]
