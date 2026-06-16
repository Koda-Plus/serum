export interface Mural {
  src: string
  title: string
  credit: string
  year: string
  tag: string
}

// Real Serum Global murals scraped from serumsklep.pl, presented as a street-art gallery.
export const murals: Mural[] = [
  { src: '/images/serum/mural-3.jpg', title: 'Szczur', credit: 'Tembe4 × Hersk', year: '2024', tag: 'character' },
  { src: '/images/serum/mural-2.jpg', title: '„SERUM” Wildstyle', credit: 'Serum crew', year: '2024', tag: 'piece' },
  { src: '/images/serum/mural-eagle.jpg', title: 'Ptak / SAM', credit: 'Serum crew', year: '2024', tag: 'character' },
  { src: '/images/serum/mural-eros-chrome.jpg', title: '„EROS” Chrome', credit: 'Eros', year: '2026', tag: 'piece' },
  { src: '/images/serum/mural-wide-1.jpg', title: 'Dark Area 51', credit: 'Serum crew', year: '2026', tag: 'piece' },
  { src: '/images/serum/mural-char-2.jpg', title: 'Throw-up', credit: 'Serum crew', year: '2026', tag: 'character' },
  { src: '/images/serum/mural-char-3.jpg', title: 'Bombing', credit: 'Serum crew', year: '2026', tag: 'piece' },
  { src: '/images/serum/mural-wide-2.jpg', title: 'Wall #2', credit: 'Serum crew', year: '2026', tag: 'piece' },
  { src: '/images/serum/mural-wide-3.jpg', title: 'Chrome Roller', credit: 'Serum crew', year: '2026', tag: 'piece' },
]
