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
    heroImage: 'https://picsum.photos/seed/bandung-hero/1200/800',
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
    heroImage: 'https://picsum.photos/seed/yogyakarta-hero/1200/800',
    localScore: 4.8,
    recommendationCount: 27,
    center: { lat: -7.7956, lng: 110.3695 },
  },
  {
    slug: 'bali',
    name: 'Bali',
    region: 'Bali',
    badge: 'Pulau Dewata',
    tagline: 'Lebih dari pantai — ada ritme kehidupan spiritual yang layak dihormati.',
    description:
      'Di luar Kuta dan Seminyak yang ramai turis, Bali punya desa-desa dengan tradisi harian yang masih dijalankan warganya. Memahami sedikit etika lokal akan sangat mengubah pengalamanmu.',
    heroImage: 'https://picsum.photos/seed/bali-hero/1200/800',
    localScore: 4.9,
    recommendationCount: 31,
    center: { lat: -8.4095, lng: 115.1889 },
  },
  {
    slug: 'jakarta',
    name: 'Jakarta',
    region: 'DKI Jakarta',
    badge: 'Ibu Kota',
    tagline: 'Cepat dan padat di permukaan, tapi kampung-kampungnya punya ritme sendiri.',
    description:
      'Jakarta sering dianggap cuma soal macet dan gedung tinggi. Padahal di sela-selanya ada kampung kota, pasar pagi, dan kedai kopi yang jadi tempat warga sungguhan menghabiskan waktu.',
    heroImage: 'https://picsum.photos/seed/jakarta-hero/1200/800',
    localScore: 4.5,
    recommendationCount: 19,
    center: { lat: -6.2088, lng: 106.8456 },
  },
]

export const getDestinationBySlug = (slug) =>
  destinations.find((d) => d.slug === slug)
