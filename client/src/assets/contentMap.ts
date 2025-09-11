import {
  IMG_0728, IMG_0765, IMG_0809, IMG_0851, IMG_0877, IMG_0907,
  IMG_1009, IMG_1016, IMG_1093, IMG_1536, IMG_1576, IMG_1857,
  IMG_1878, IMG_1895, IMG_1923, IMG_1962, IMG_2057, IMG_2082, IMG_2101,
  WhatsAppLogo
} from './images';

// Semantic mapping of XTREMCOL photos to content sections
export const contentMap = {
  // Hero section - Main background image
  heroImage: {
    src: IMG_1857,
    alt: 'XTREMCOL aventura extrema en cuatrimotos y buggies Can-Am en Guaduas, Cundinamarca'
  },

  // Cuatrimoto routes (routes-section.tsx)
  routeImages: {
    agua_clara: {
      src: IMG_0728,
      alt: 'XTREMCOL Ruta Agua Clara con vista al Río Magdalena en cuatrimoto Can-Am'
    },
    salto_versalles: {
      src: IMG_0765,
      alt: 'XTREMCOL Ruta Salto Versalles con cascada en cuatrimoto'
    },
    alto_totumal: {
      src: IMG_0809,
      alt: 'XTREMCOL Ruta Alto de Totumal con vista panorámica montañosa'
    },
    pozo_encantado: {
      src: IMG_0851,
      alt: 'XTREMCOL Ruta Pozo Encantado por senderos naturales'
    }
  },

  // Buggy routes (buggy-section.tsx)
  buggyImages: {
    agua_clara: {
      src: IMG_0877,
      alt: 'XTREMCOL Buggy Can-Am en mirador Agua Clara'
    },
    salto_versalles: {
      src: IMG_0907,
      alt: 'XTREMCOL Buggy Can-Am Salto Versalles con cascada'
    },
    alto_totumal: {
      src: IMG_1009,
      alt: 'XTREMCOL Buggy Can-Am Alto de Totumal en terreno montañoso'
    }
  },

  // Trocha VIP routes (trocha-vip-section.tsx)
  trochaImages: {
    hora_vip: {
      src: IMG_1016,
      alt: 'XTREMCOL Trocha VIP 1 hora terreno pedregoso Guaduas-Lajitas'
    },
    medio_dia: {
      src: IMG_1093,
      alt: 'XTREMCOL Trocha VIP medio día ruta extendida La Magdalena-Útica-Guaduero'
    },
    dia_completo: {
      src: IMG_1536,
      alt: 'XTREMCOL Trocha VIP día completo Campeona-La Cabaña-Carbonera-Alto de la Rana'
    }
  },

  // Extras section - Video poster
  extrasPoster: {
    src: IMG_1576,
    alt: 'XTREMCOL video aventura extrema POV cuatrimotos y buggies'
  },

  // WhatsApp Logo
  whatsappLogo: {
    src: WhatsAppLogo,
    alt: 'WhatsApp Logo'
  },

  // Gallery section - Diverse collection
  gallery: [
    {
      id: 'xtrem-1',
      category: 'cuatrimoto',
      route: 'agua-clara',
      type: 'foto',
      src: IMG_1878,
      alt: 'XTREMCOL cuatrimoto aventura Agua Clara vista río Magdalena'
    },
    {
      id: 'xtrem-2',
      category: 'buggy',
      route: 'agua-clara',
      type: 'foto',
      src: IMG_1895,
      alt: 'XTREMCOL Buggy Can-Am mirador Agua Clara'
    },
    {
      id: 'xtrem-3',
      category: 'cuatrimoto',
      route: 'salto',
      type: 'foto',
      src: IMG_1923,
      alt: 'XTREMCOL cuatrimoto Salto Versalles cascada natural'
    },
    {
      id: 'xtrem-4',
      category: 'buggy',
      route: 'salto',
      type: 'foto',
      src: IMG_1962,
      alt: 'XTREMCOL Buggy Can-Am ruta Salto Versalles'
    },
    {
      id: 'xtrem-5',
      category: 'cuatrimoto',
      route: 'totumal',
      type: 'foto',
      src: IMG_2057,
      alt: 'XTREMCOL vista panorámica Alto de Totumal cuatrimoto'
    },
    {
      id: 'xtrem-6',
      category: 'buggy',
      route: 'totumal',
      type: 'foto',
      src: IMG_2082,
      alt: 'XTREMCOL Buggy Can-Am filo montaña Totumal'
    },
    {
      id: 'xtrem-7',
      category: 'cuatrimoto',
      route: 'pozo',
      type: 'foto',
      src: IMG_2101,
      alt: 'XTREMCOL sendero Pozo Encantado aventura natural'
    },
    {
      id: 'xtrem-8',
      category: 'trocha',
      route: 'trocha',
      type: 'foto',
      src: IMG_0728,
      alt: 'XTREMCOL terreno pedregoso Trocha VIP'
    },
    {
      id: 'xtrem-9',
      category: 'trocha',
      route: 'trocha',
      type: 'foto',
      src: IMG_0765,
      alt: 'XTREMCOL grupo Trocha VIP día completo'
    },
    {
      id: 'xtrem-10',
      category: 'video',
      route: 'video',
      type: 'video',
      src: IMG_0809,
      alt: 'XTREMCOL video POV aventura extrema'
    },
    {
      id: 'xtrem-11',
      category: 'video',
      route: 'video',
      type: 'video',
      src: IMG_0851,
      alt: 'XTREMCOL video aéreo rutas Guaduas'
    },
    {
      id: 'xtrem-12',
      category: 'video',
      route: 'video',
      type: 'video',
      src: IMG_0877,
      alt: 'XTREMCOL video aventura grupal Can-Am'
    }
  ]
};