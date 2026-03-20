// Static routes data - no backend needed
export type StaticRoute = {
  id: string;
  name: string;
  displayName: string;
  vehicleType: string;
  duration: string;
  couplePrice: string;
  individualPrice: string;
  description: string;
  includes: string[];
};

export const staticRoutes: StaticRoute[] = [
  {
    id: "agua-clara-route",
    name: "agua_clara",
    displayName: "Agua Clara",
    vehicleType: "cuatrimoto",
    duration: "1 hora",
    couplePrice: "250000",
    individualPrice: "200000",
    description: "Ruta perfecta para principiantes. Paisajes hermosos y cascadas naturales.",
    includes: [
      "Guía profesional",
      "Equipo de seguridad completo",
      "Fotos durante el recorrido",
      "Hidratación"
    ]
  },
  {
    id: "salto-versalles-route",
    name: "salto_versalles",
    displayName: "Salto Versalles",
    vehicleType: "cuatrimoto",
    duration: "1.5 horas",
    couplePrice: "300000",
    individualPrice: "250000",
    description: "Ruta intermedia con vistas espectaculares de cascadas y naturaleza.",
    includes: [
      "Guía profesional",
      "Equipo de seguridad completo",
      "Fotos durante el recorrido",
      "Hidratación",
      "Visita a cascada"
    ]
  },
  {
    id: "alto-totumal-route",
    name: "alto_totumal",
    displayName: "Alto del Totumal",
    vehicleType: "cuatrimoto",
    duration: "2 horas",
    couplePrice: "350000",
    individualPrice: "290000",
    description: "Aventura extrema en el punto más alto. Para aventureros experimentados.",
    includes: [
      "Guía profesional",
      "Equipo de seguridad completo",
      "Fotos durante el recorrido",
      "Hidratación",
      "Snack energético"
    ]
  },
  {
    id: "pozo-encantado-route",
    name: "pozo_encantado",
    displayName: "Pozo Encantado",
    vehicleType: "cuatrimoto",
    duration: "2.5 horas",
    couplePrice: "360000",
    individualPrice: "290000",
    description: "La ruta más completa. Explora pozos naturales y paisajes únicos.",
    includes: [
      "Guía profesional",
      "Equipo de seguridad completo",
      "Fotos durante el recorrido",
      "Hidratación",
      "Snack energético",
      "Tiempo para nadar en pozos"
    ]
  }
];

export const buggyRoutes: StaticRoute[] = [
  {
    id: "buggy-xds-route",
    name: "trocha_vip",
    displayName: "Buggy Can-Am XDS 1 Hora",
    vehicleType: "buggy_xds",
    duration: "1 hora",
    couplePrice: "300000",
    individualPrice: "300000",
    description: "Experiencia extrema en buggy Can-Am XDS. Adrenalina pura.",
    includes: [
      "Guía profesional",
      "Equipo de seguridad completo",
      "Fotos y videos durante el recorrido",
      "Hidratación"
    ]
  },
  {
    id: "buggy-x3-route",
    name: "trocha_vip",
    displayName: "Buggy Can-Am X3 Medio Día",
    vehicleType: "buggy_x3",
    duration: "Medio día (4 horas)",
    couplePrice: "800000",
    individualPrice: "800000",
    description: "Aventura completa en Can-Am X3. La experiencia definitiva.",
    includes: [
      "Guía profesional",
      "Equipo de seguridad completo",
      "Fotos y videos durante el recorrido",
      "Almuerzo típico",
      "Hidratación"
    ]
  }
];

// Función helper para obtener rutas por tipo
export function getRoutesByVehicle(vehicleType: string): StaticRoute[] {
  if (vehicleType === 'cuatrimoto') {
    return staticRoutes;
  }
  if (vehicleType.startsWith('buggy')) {
    return buggyRoutes;
  }
  return [];
}

// Función helper para obtener una ruta por ID
export function getRouteById(id: string): StaticRoute | undefined {
  return [...staticRoutes, ...buggyRoutes].find(route => route.id === id);
}
