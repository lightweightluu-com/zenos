export const BOOKING_URL = 'https://buchung.treatwell.ch/ort/433293/menue/';

export const NAV = [
  { to: '/philosophie', label: 'Philosophie' },
  { to: '/leistungen', label: 'Leistungen' },
  { to: '/#studio', label: 'Studio' }
];

// Quelle: Treatwell-Eintrag des Ateliers (Adresse, Zeiten) und Instagram-Profil (Telefon).
export const STUDIO = {
  name: "Zeno's Private Hair Atelier",
  street: 'Landstrasse 1',
  zip: '5415',
  city: 'Obersiggenthal',
  phone: '+41 78 268 64 36',
  phoneHref: 'tel:+41782686436',
  lat: 47.482405,
  lon: 8.309491,
  hours: [
    ['Montag', 'Geschlossen'],
    ['Dienstag', '09:00 – 19:00'],
    ['Mittwoch', '09:00 – 19:00'],
    ['Donnerstag', '09:00 – 19:00'],
    ['Freitag', '09:00 – 19:00'],
    ['Samstag', '09:00 – 15:00'],
    ['Sonntag', 'Geschlossen']
  ],
  instagram: 'https://www.instagram.com/zenos_hair_atelier/'
};

export const SERVICES = [
  {
    key: 'haarschnitt',
    long: 'Ein guter Schnitt beginnt mit dem Zuhören. Gemeinsam schauen wir auf Gesichtsform, Haarstruktur und Alltag – und entscheiden, welche Linie zu Ihnen passt: klassisch, modern oder avantgardistisch.',
    image: '/img/atelier-1800.webp',
    icon: 'Scissors',
    title: 'Haarschnitt',
    text: 'Präzise Schnitte, abgestimmt auf Gesichtsform, Haarstruktur und persönlichen Stil – ob klassisch, modern oder avantgardistisch.',
    points: ['Analyse von Gesichtsform & Haarstruktur', 'Klassisch · modern · avantgardistisch']
  },
  {
    key: 'coloration',
    long: 'Farbe ist Ausdruck. Ob natürliche Nuancen, fein gesetzte Balayage oder mutige Farbübergänge: Ich entwickle eine Farbwelt, die zu Ihrem Typ passt, und arbeite dabei mit hochwertigen Produkten.',
    image: '/img/portrait-1000.webp',
    icon: 'Palette',
    title: 'Coloration',
    text: 'Individuelle Farbwelten, natürliche Nuancen, Balayage und ausdrucksstarke Farbverläufe – mit hochwertigen Produkten umgesetzt.',
    points: ['Natürliche Nuancen', 'Balayage & Farbverläufe']
  },
  {
    key: 'bart',
    long: 'Saubere Konturen, präzises Trimmen und hochwertige Pflege – für einen scharfen, eleganten Look, der auch nach Tagen noch sitzt.',
    image: '/img/portrait-1000.webp',
    icon: 'Sparkles',
    title: 'Bart',
    text: 'Professionelles Trimmen, saubere Konturen und hochwertige Pflege für einen scharfen, eleganten Look.',
    points: ['Präzise Konturen', 'Hochwertige Pflegeprodukte']
  },
  {
    key: 'styling',
    long: 'Für den Business-Termin, den Event-Abend oder den Alltag: Ein Styling, das die Form hält und Charakter zeigt – von klar strukturierten Looks bis zu weichen Texturen.',
    image: '/img/salon-1000.webp',
    icon: 'Wand2',
    title: 'Styling',
    text: 'Business, Event oder Alltag: Styling, das hält, was es verspricht – von strukturierten Looks bis zu weichen Texturen.',
    points: ['Business · Event · Alltag', 'Hält die Form, zeigt Charakter']
  }
];
