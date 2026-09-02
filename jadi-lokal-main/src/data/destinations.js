// Data demo/prototype — dibuat untuk simulasi konsep, bukan hasil riset lapangan real-time.
export const destinations = [
  {
    slug: 'bandung',
    name: 'Bandung',
    region: 'Jawa Barat',
    badge: 'Kota Kembang',
    tagline: 'Sejuk, kreatif, dan penuh warung tersembunyi di balik gang.',
    description:
      'Bandung bukan cuma factory outlet dan Lembang. Di balik jalan-jalan ramai wisatawan, ada warung legendaris, angkot dengan bahasanya sendiri, dan bukit-bukit yang lebih tenang dari yang kamu kira.',
    heroImage: 'https://loremflickr.com/1200/800/bandung,indonesia/all?lock=1',
    localScore: 4.7,
    recommendationCount: 23,
    center: { lat: -6.9175, lng: 107.6191 },
  },
  {
    slug: 'yogyakarta',
    name: 'Yogyakarta',
    region: 'D.I. Yogyakarta',
    badge: 'Kota Pelajar',
    tagline: 'Pelan-pelan saja, Yogya paling terasa saat kamu berjalan kaki.',
    description:
      'Yogyakarta menyimpan cerita di setiap gang kecil dekat Malioboro maupun di kampung-kampung sekitar keraton. Warganya ramah, tapi ada aturan tak tertulis yang baik untuk dipahami dulu.',
    heroImage: 'https://loremflickr.com/1200/800/yogyakarta,indonesia/all?lock=2',
    localScore: 4.8,
    recommendationCount: 27,
    center: { lat: -7.7956, lng: 110.3695 },
  },
  {
    slug: 'jakarta',
    name: 'Jakarta',
    region: 'DKI Jakarta',
    badge: 'Ibu Kota',
    tagline: 'Cepat dan padat di permukaan, tapi kampung-kampungnya punya ritme sendiri.',
    description:
      'Jakarta sering dianggap cuma soal macet dan gedung tinggi. Padahal di sela-selanya ada kampung kota, pasar pagi, dan kedai kopi yang jadi tempat warga sungguhan menghabiskan waktu.',
    heroImage: 'https://loremflickr.com/1200/800/jakarta,indonesia/all?lock=4',
    localScore: 4.5,
    recommendationCount: 19,
    center: { lat: -6.2088, lng: 106.8456 },
  },
  {
    slug: 'semarang',
    name: 'Semarang',
    region: 'Jawa Tengah',
    badge: 'Kota Pelabuhan',
    tagline: 'Warisan sejarah, kampung kreatif, dan ruang hijau dalam satu kota.',
    description:
      'Dataset wisata mencatat Semarang melalui tempat bersejarah seperti Lawang Sewu dan Candi Gedong Songo, ruang publik seperti Kampung Pelangi, serta kawasan hijau yang cocok untuk perjalanan yang lebih santai.',
    heroImage: 'https://loremflickr.com/1200/800/semarang,indonesia/all?lock=5',
    localScore: 4.5,
    recommendationCount: 57,
    center: { lat: -6.9932, lng: 110.4203 },
  },
  {
    slug: 'surabaya',
    name: 'Surabaya',
    region: 'Jawa Timur',
    badge: 'Kota Pahlawan',
    tagline: 'Kota besar dengan taman kota, jejak sejarah, dan ekowisata pesisir.',
    description:
      'Surabaya dalam dataset ini tidak hanya berisi landmark sejarah, tetapi juga taman kota dan ekowisata Mangrove Wonorejo yang memperlihatkan sisi hijau Kota Pahlawan.',
    heroImage: 'https://loremflickr.com/1200/800/surabaya,indonesia/all?lock=6',
    localScore: 4.4,
    recommendationCount: 46,
    center: { lat: -7.2575, lng: 112.7521 },
  },
]

export const getDestinationBySlug = (slug) =>
  destinations.find((d) => d.slug === slug)
