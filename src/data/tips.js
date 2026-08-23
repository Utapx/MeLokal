// Data demo/prototype untuk simulasi konsep Local Guide & fitur "Live Like a Local".
export const tips = {
  bandung: {
    language: [
      { term: 'Punten', meaning: 'Permisi / maaf, diucapkan saat lewat di depan orang' },
      { term: 'Sok atuh', meaning: 'Silakan, ungkapan mempersilakan yang ramah' },
      { term: 'Euweuh', meaning: 'Tidak ada / habis' },
      { term: 'Kumaha damang?', meaning: 'Apa kabar? (sapaan akrab)' },
      { term: 'Mangga', meaning: 'Silakan, dipakai saat menawarkan atau mempersilakan' },
    ],
    food: [
      { name: 'Batagor gerobak pinggir jalan', desc: 'Cari yang antriannya warga sekitar, bukan yang ada baliho besar.' },
      { name: 'Nasi Ampera warung keluarga', desc: 'Porsi lauk pilih sendiri, harga jauh lebih wajar dari restoran turis.' },
      { name: 'Colenak & bandrek malam hari', desc: 'Jajanan hangat khas yang dijual menjelang malam di pinggir jalan.' },
    ],
    transport: [
      { title: 'Angkot', desc: 'Sebutkan tujuan ke sopir, ongkos dibayar saat turun, bukan naik.' },
      { title: 'Ojek pangkalan vs online', desc: 'Untuk gang sempit, ojek pangkalan sering lebih cepat & tawar-menawar wajar.' },
      { title: 'Jalan kaki di Braga', desc: 'Area pusat kota nyaman dijelajah jalan kaki di pagi/sore hari.' },
    ],
    budgetRange: 'Rp150.000 – Rp300.000 per hari (di luar penginapan)',
    etiquette: [
      'Sapa dengan "punten" saat lewat di depan orang yang sedang duduk.',
      'Tawar-menawar wajar di pasar tradisional, jangan berlebihan.',
      'Lepas alas kaki bila diminta saat masuk rumah/warung tertentu.',
    ],
    dontDo: [
      'Jangan langsung percaya "harga pas" pertama di kawasan wisata utama.',
      'Jangan memotret orang/rumah warga tanpa izin.',
      'Jangan naik angkot tanpa tahu kisaran ongkos wajar.',
    ],
    localTips: [
      'Datang ke warung makan saat jam makan warga (11.00 atau 18.00), bukan jam wisatawan.',
      'Naik ke Bukit Moko pagi-pagi sebelum jam 6 untuk suasana paling tenang.',
      'Simpan uang receh untuk ongkos angkot, sopir jarang punya banyak kembalian besar.',
      'Cuaca Bandung cepat berubah — selalu bawa jaket tipis meski siang terik.',
      'Ikuti akun media sosial komunitas lokal untuk info event kampung kreatif.',
    ],
    liveLikeLocal: {
      icon: '❌',
      headline: 'Jangan cuma makan di tempat viral.',
      body: 'Coba eksplor warung yang biasa digunakan warga sekitar.',
    },
  },

  yogyakarta: {
    language: [
      { term: 'Monggo', meaning: 'Silakan, sapaan sopan khas Yogya' },
      { term: 'Pripun kabare?', meaning: 'Apa kabar?' },
      { term: 'Mboten', meaning: 'Tidak (bentuk halus)' },
      { term: 'Alon-alon waton kelakon', meaning: 'Pelan-pelan asal sampai — filosofi hidup orang Yogya' },
      { term: 'Suwun', meaning: 'Terima kasih (bentuk singkat)' },
    ],
    food: [
      { name: 'Angkringan malam hari', desc: 'Nasi kucing & sate-satean, tempat warga ngobrol santai sampai larut.' },
      { name: 'Gudeg rumahan non-turis', desc: 'Cari gudeg di kampung, bukan yang ada di jalur bus wisata.' },
      { name: 'Kopi joss pasar tradisional', desc: 'Kopi arang khas yang biasa diminum warga sambil ngobrol lama.' },
    ],
    transport: [
      { title: 'Jalan kaki di sekitar Malioboro', desc: 'Banyak gang kecil justru lebih menarik dijelajahi tanpa kendaraan.' },
      { title: 'Sepeda / motor sewa harian', desc: 'Cara paling fleksibel menjangkau kampung-kampung sekitar kota.' },
      { title: 'Becak kayuh', desc: 'Tawar harga di awal, cocok untuk jarak dekat sambil menikmati suasana.' },
    ],
    budgetRange: 'Rp120.000 – Rp250.000 per hari (di luar penginapan)',
    etiquette: [
      'Bicara dengan nada tenang, tidak terburu-buru atau terlalu keras.',
      'Merunduk sedikit saat lewat di depan orang yang lebih tua atau sedang duduk.',
      'Bertanya arah dengan sopan, warga Yogya senang membantu bila didekati baik-baik.',
    ],
    dontDo: [
      'Jangan terburu-buru naik kendaraan — banyak area lebih menarik ditelusuri jalan kaki.',
      'Jangan berisik berlebihan di area kampung/keraton.',
      'Jangan mengabaikan antrean di angkringan yang ramai warga lokal.',
    ],
    localTips: [
      'Kunjungi kampung Kauman sore hari saat warga mulai beraktivitas santai.',
      'Coba naik andong sesekali untuk rute pendek, bukan sekadar foto.',
      'Tanyakan rekomendasi warung ke penjaga losmen kecil, biasanya lebih akurat dari internet.',
      'Malioboro paling nyaman dijelajahi pagi hari sebelum terlalu ramai.',
      'Bawa uang tunai pecahan kecil untuk jajan di angkringan.',
    ],
    liveLikeLocal: {
      icon: '💡',
      headline: 'Jangan buru-buru naik kendaraan.',
      body: 'Beberapa area lebih menarik jika dijelajahi dengan berjalan kaki.',
    },
  },

  bali: {
    language: [
      { term: 'Om Swastiastu', meaning: 'Salam pembuka penuh hormat khas Bali' },
      { term: 'Suksma', meaning: 'Terima kasih' },
      { term: 'Nggih', meaning: 'Iya (bentuk halus)' },
      { term: 'Tiang', meaning: 'Saya (bentuk halus)' },
      { term: 'Canang sari', meaning: 'Sesajen kecil harian, jangan diinjak atau dipindah' },
    ],
    food: [
      { name: 'Nasi jinggo warung pagi', desc: 'Porsi kecil ekonomis yang jadi sarapan sehari-hari warga.' },
      { name: 'Warung babi guling non-turis', desc: 'Cari yang ramai warga lokal saat makan siang, bukan bus wisata.' },
      { name: 'Jajanan pasar pagi tradisional', desc: 'Datang subuh untuk merasakan ritme pasar sebelum ramai turis.' },
    ],
    transport: [
      { title: 'Motor sewa harian', desc: 'Moda paling fleksibel, tapi pastikan paham aturan lalu lintas setempat.' },
      { title: 'Hindari taksi tanpa argo di area wisata', desc: 'Sepakati harga di awal atau gunakan aplikasi transportasi resmi.' },
      { title: 'Jalan kaki di desa wisata', desc: 'Banyak desa lebih nyaman dijelajahi perlahan sambil menyapa warga.' },
    ],
    budgetRange: 'Rp200.000 – Rp400.000 per hari (di luar penginapan)',
    etiquette: [
      'Kenakan pakaian sopan saat memasuki area pura.',
      'Jangan melangkahi sesajen (canang sari) yang diletakkan di jalan.',
      'Hormati waktu upacara/Nyepi — kurangi aktivitas mencolok saat prosesi berlangsung.',
    ],
    dontDo: [
      'Jangan menyentuh kepala orang lain, dianggap bagian tubuh yang disucikan.',
      'Jangan duduk atau memanjat struktur pura demi foto.',
      'Jangan berfoto dalam prosesi keagamaan tanpa izin.',
    ],
    localTips: [
      'Datang ke pura lokal di luar jam kunjungan turis untuk suasana lebih khidmat.',
      'Sapa dengan "Om Swastiastu" akan disambut hangat oleh warga.',
      'Ikuti aturan berpakaian (kain & selendang) meski hanya sekadar lewat area pura.',
      'Desa-desa di luar jalur utama biasanya harga makanannya jauh lebih wajar.',
      'Perhatikan hari raya lokal — beberapa jalan bisa ditutup untuk upacara adat.',
    ],
    liveLikeLocal: {
      icon: '🙏',
      headline: 'Pahami etika saat memasuki area tertentu.',
      body: 'Hormati tempat dan aktivitas keagamaan masyarakat setempat.',
    },
  },

  jakarta: {
    language: [
      { term: 'Gan / Sis', meaning: 'Sapaan akrab sehari-hari ke sesama, netral gender informal' },
      { term: 'Macet parah', meaning: 'Ungkapan umum soal kondisi lalu lintas, dipakai untuk basa-basi' },
      { term: 'Cabut', meaning: 'Pergi / berangkat (bahasa gaul)' },
      { term: 'Bang / Bu', meaning: 'Sapaan sopan untuk pedagang atau sopir angkutan' },
      { term: 'Otw', meaning: 'Dalam perjalanan (dipakai luas, termasuk warga lokal)' },
    ],
    food: [
      { name: 'Soto Betawi warung keluarga', desc: 'Cari yang di kampung, biasanya porsi lebih besar & harga wajar.' },
      { name: 'Kopi susu kedai kecil', desc: 'Banyak kedai kecil di gang jadi tempat nongkrong warga sekitar.' },
      { name: 'Gado-gado pasar pagi', desc: 'Sarapan khas yang biasa dinikmati warga sebelum beraktivitas.' },
    ],
    transport: [
      { title: 'KRL Commuter Line', desc: 'Moda paling efisien menghindari macet, gunakan kartu elektronik.' },
      { title: 'TransJakarta', desc: 'Jaringan bus yang menjangkau banyak titik kota dengan harga terjangkau.' },
      { title: 'Ojek online untuk gang sempit', desc: 'Paling praktis untuk menembus kampung-kampung padat.' },
    ],
    budgetRange: 'Rp150.000 – Rp350.000 per hari (di luar penginapan)',
    etiquette: [
      'Antre dengan tertib di stasiun/halte, terutama saat jam sibuk.',
      'Beri jalan pada penumpang turun dulu sebelum naik kendaraan umum.',
      'Sapa sopan ke pedagang kaki lima sebelum menawar.',
    ],
    dontDo: [
      'Jangan naik ojek online dari titik yang bukan pick-up point resmi di mal — bisa kena biaya tambahan.',
      'Jangan berhenti mendadak di jalur pejalan kaki yang padat.',
      'Jangan kaget dengan macet — sisakan waktu ekstra di setiap perjalanan.',
    ],
    localTips: [
      'Naik KRL di luar jam sibuk (10.00–15.00) jauh lebih nyaman untuk turis.',
      'Kampung kota di sekitar Tanah Tinggi punya mural warga yang jarang difoto turis.',
      'Cek titik jemput ojek online resmi saat berada di dalam mal besar.',
      'Pasar pagi paling ramai & otentik sebelum jam 8 pagi.',
      'Bawa payung kecil — hujan Jakarta bisa datang tiba-tiba di musim tertentu.',
    ],
    liveLikeLocal: {
      icon: '🚇',
      headline: 'Jangan andalkan mobil pribadi untuk semua perjalanan.',
      body: 'Coba naik KRL atau TransJakarta seperti jutaan warga setiap hari.',
    },
  },
}

export const getTipsByDestination = (slug) => tips[slug]
