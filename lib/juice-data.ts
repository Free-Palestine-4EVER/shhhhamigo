export interface Juice {
  id: string
  name: string
  emoji: string
  imageUrl: string
  price: number
  description: string
  longDescription: string
  color1: string
  color2: string
  volume: string
  featured?: boolean
}

export const juices: Juice[] = [
  {
    id: "jagoda",
    name: "Jagoda Sok",
    emoji: "🍓",
    imageUrl: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=600",
    price: 4.99,
    description: "Svježe cijeđeni sok od domaćih jagoda",
    longDescription: "Naš sok od jagoda priprema se od ručno branih jagoda s obiteljskih polja. Bogat vitaminima C i antioksidansima, savršen za osvježenje u toplim danima.",
    color1: "#dc2626",
    color2: "#f87171",
    volume: "500ml",
    featured: true,
  },
  {
    id: "visnja",
    name: "Višnja Sok",
    emoji: "🍒",
    imageUrl: "https://images.unsplash.com/photo-1587049016823-69ef9d68bd44?w=600",
    price: 5.49,
    description: "Tart i osvježavajući sok od višnje",
    longDescription: "Višnja je kraljica voća! Naš sok od višnje ima savršen balans slatkog i kiselog okusa. Prirodno bogat melatoninom za bolji san.",
    color1: "#991b1b",
    color2: "#dc2626",
    volume: "500ml",
    featured: true,
  },
  {
    id: "jabuka",
    name: "Jabuka Sok",
    emoji: "🍎",
    imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600",
    price: 3.99,
    description: "Klasični sok od svježih jabuka",
    longDescription: "Sok od jabuka iz našeg voćnjaka - bez dodanog šećera, bez konzervansa. Čist okus prirode u svakom gutljaju. Savršen za cijelu obitelj.",
    color1: "#15803d",
    color2: "#4ade80",
    volume: "500ml",
  },
  {
    id: "naranca",
    name: "Naranča Sok",
    emoji: "🍊",
    imageUrl: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600",
    price: 4.49,
    description: "Sunčani sok od mediteranskih naranči",
    longDescription: "Naranče s mediteranskog sunca, cijeđene ujutro za maksimalnu svježinu. Bogat vitaminom C, idealan za početak dana.",
    color1: "#ea580c",
    color2: "#fb923c",
    volume: "500ml",
    featured: true,
  },
  {
    id: "borovnica",
    name: "Borovnica Sok",
    emoji: "🫐",
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600",
    price: 6.49,
    description: "Premium sok od divljih borovnica",
    longDescription: "Divlje borovnice brane se na obroncima planina. Supernamirnica bogata antioksidansima. Naš najtraženiji premium sok.",
    color1: "#4338ca",
    color2: "#818cf8",
    volume: "500ml",
  },
  {
    id: "mango",
    name: "Mango Sok",
    emoji: "🥭",
    imageUrl: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600",
    price: 5.99,
    description: "Egzotični sok od zrelog manga",
    longDescription: "Tropski okus manga donosi egzotiku u vaš dom. Kremaste teksture i intenzivnog okusa, savršen sam ili u smoothiju.",
    color1: "#d97706",
    color2: "#fbbf24",
    volume: "500ml",
    featured: true,
  },
  {
    id: "limun-dumbir",
    name: "Limun i Đumbir",
    emoji: "🍋",
    imageUrl: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600",
    price: 4.99,
    description: "Osvježavajuća kombinacija limuna i đumbira",
    longDescription: "Moćna kombinacija svježeg limuna i đumbira. Podiže imunitet, potiče probavu i daje energiju za cijeli dan. Naš wellness favorit.",
    color1: "#a16207",
    color2: "#facc15",
    volume: "500ml",
  },
  {
    id: "sumsko-voce",
    name: "Šumsko Voće",
    emoji: "🫐",
    imageUrl: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=600",
    price: 5.49,
    description: "Mješavina šumskih bobica",
    longDescription: "Kupine, maline, borovnice i brusnice - sve u jednom soku. Bogat okus šume u boci. Prirodni izvor energije i vitalnosti.",
    color1: "#7e22ce",
    color2: "#c084fc",
    volume: "500ml",
  },
]
