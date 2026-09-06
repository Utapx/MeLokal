// Data demo/prototype — dibuat untuk simulasi konsep, bukan hasil riset lapangan real-time.
import bandungImage from '../../Gambar/Gambar/Bandung.jpg'
import yogyakartaImage from '../../Gambar/Gambar/Yogyakarta.jpg'
import jakartaImage from '../../Gambar/Gambar/Jakarta - Monas.jpg'
import semarangImage from '../../Gambar/Gambar/Semarang - Lawang Sewu.jpg'
import surabayaImage from '../../Gambar/Gambar/Surabaya - Old Bank.jpg'

export const destinations = [
  {
    slug: 'bandung',
    name: 'Bandung',
    region: 'Jawa Barat',
    regionEn: 'West Java',
    badge: 'Kota Kembang',
    badgeEn: 'Flower City',
    tagline: 'Sejuk, kreatif, dan penuh warung tersembunyi di balik gang.',
    taglineEn: 'Cool, creative, and full of hidden eateries tucked behind narrow alleys.',
    description:
      'Bandung bukan cuma factory outlet dan Lembang. Di balik jalan-jalan ramai wisatawan, ada warung legendaris, angkot dengan bahasanya sendiri, dan bukit-bukit yang lebih tenang dari yang kamu kira.',
    descriptionEn:
      'Bandung is more than factory outlets and Lembang. Beyond busy tourist streets, you will find legendary food stalls, angkot with their own local language, and hills that are quieter than you might expect.',
    heroImage: bandungImage,
    localScore: 4.7,
    recommendationCount: 23,
    center: { lat: -6.9175, lng: 107.6191 },
  },
  {
    slug: 'yogyakarta',
    name: 'Yogyakarta',
    region: 'D.I. Yogyakarta',
    regionEn: 'Special Region of Yogyakarta',
    badge: 'Kota Pelajar',
    badgeEn: 'Student City',
    tagline: 'Pelan-pelan saja, Yogya paling terasa saat kamu berjalan kaki.',
    taglineEn: 'Take it slow; Yogyakarta is best experienced on foot.',
    description:
      'Yogyakarta menyimpan cerita di setiap gang kecil dekat Malioboro maupun di kampung-kampung sekitar keraton. Warganya ramah, tapi ada aturan tak tertulis yang baik untuk dipahami dulu.',
    descriptionEn:
      'Yogyakarta holds stories in every alley near Malioboro and in the neighborhoods around the palace. People are welcoming, but there are unwritten rules worth understanding first.',
    heroImage: yogyakartaImage,
    localScore: 4.8,
    recommendationCount: 27,
    center: { lat: -7.7956, lng: 110.3695 },
  },
  {
    slug: 'jakarta',
    name: 'Jakarta',
    region: 'DKI Jakarta',
    regionEn: 'Jakarta Special Capital Region',
    badge: 'Ibu Kota',
    badgeEn: 'Capital City',
    tagline: 'Cepat dan padat di permukaan, tapi kampung-kampungnya punya ritme sendiri.',
    taglineEn: 'Fast and crowded on the surface, with neighborhoods that move to their own rhythm.',
    description:
      'Jakarta sering dianggap cuma soal macet dan gedung tinggi. Padahal di sela-selanya ada kampung kota, pasar pagi, dan kedai kopi yang jadi tempat warga sungguhan menghabiskan waktu.',
    descriptionEn:
      'Jakarta is often reduced to traffic and skyscrapers. Between them are urban neighborhoods, morning markets, and coffee shops where residents actually spend their time.',
    heroImage: jakartaImage,
    localScore: 4.5,
    recommendationCount: 19,
    center: { lat: -6.2088, lng: 106.8456 },
  },
  {
    slug: 'semarang',
    name: 'Semarang',
    region: 'Jawa Tengah',
    regionEn: 'Central Java',
    badge: 'Kota Pelabuhan',
    badgeEn: 'Port City',
    tagline: 'Warisan sejarah, kampung kreatif, dan ruang hijau dalam satu kota.',
    taglineEn: 'Historic heritage, creative neighborhoods, and green spaces in one city.',
    description:
      'Dataset wisata mencatat Semarang melalui tempat bersejarah seperti Lawang Sewu dan Candi Gedong Songo, ruang publik seperti Kampung Pelangi, serta kawasan hijau yang cocok untuk perjalanan yang lebih santai.',
    descriptionEn:
      'This guide presents Semarang through historic places such as Lawang Sewu and Gedong Songo Temple, public spaces like Kampung Pelangi, and green areas suited to a slower trip.',
    heroImage: semarangImage,
    localScore: 4.5,
    recommendationCount: 57,
    center: { lat: -6.9932, lng: 110.4203 },
  },
  {
    slug: 'surabaya',
    name: 'Surabaya',
    region: 'Jawa Timur',
    regionEn: 'East Java',
    badge: 'Kota Pahlawan',
    badgeEn: 'City of Heroes',
    tagline: 'Kota besar dengan taman kota, jejak sejarah, dan ekowisata pesisir.',
    taglineEn: 'A big city with urban parks, historic traces, and coastal ecotourism.',
    description:
      'Surabaya dalam dataset ini tidak hanya berisi landmark sejarah, tetapi juga taman kota dan ekowisata Mangrove Wonorejo yang memperlihatkan sisi hijau Kota Pahlawan.',
    descriptionEn:
      'This guide to Surabaya goes beyond historic landmarks, with city parks and Wonorejo Mangrove ecotourism showing the greener side of the City of Heroes.',
    heroImage: surabayaImage,
    localScore: 4.4,
    recommendationCount: 46,
    center: { lat: -7.2575, lng: 112.7521 },
  },
]

export const getDestinationBySlug = (slug) =>
  destinations.find((d) => d.slug === slug)
