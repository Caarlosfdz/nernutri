/* ============================================================
   NERNUTRI — Datos de marca
   Edita este archivo para cambiar textos, número y links.
   NO toques el resto de archivos .js si no tienes experiencia.
   ============================================================ */
(function () {
  "use strict";

  window.__NERNUTRI__ = {

    /* --- Datos de contacto --- */
    whatsapp: "34602592794",           /* número CON prefijo país, sin + */
    whatsappMsg: "Hola%2C%20me%20gustar%C3%ADa%20pedir%20una%20consulta%20inicial%20gratuita.",
    instagram: "nernutrii",
    email: "nernutrii@gmail.com",

    /* --- Identidad --- */
    name: "Nerea Fernández",
    shortName: "Nerea",
    title: "Dietista titulada",
    credential: "Grado Superior de Dietética",
    tagline: "Come bien. Vive mejor.",
    heroKicker: "Dietista titulada · Nutrición personalizada",
    heroSub: "Planes reales para personas reales.",
    heroCta: "Quiero mi consulta gratis →",
    heroCtaSecondary: "Ver servicios",

    /* --- Bio --- */
    bio: "Soy Nerea, dietista titulada con Grado Superior de Dietética. Creo que la nutrición no debería ser una fuente de estrés — todo lo contrario. Mi enfoque es práctico, individualizado y sin dogmas: trabajamos con lo que tienes, lo que te gusta y el ritmo de tu vida real. Sin planes imposibles, sin hambre innecesaria, sin restricciones absurdas.",
    bioPillars: [
      { label: "Titulación", value: "Grado Superior de Dietética" },
      { label: "Enfoque",    value: "Individualizado y sin dogmas" },
      { label: "Metodología", value: "Educación nutricional real" }
    ],

    /* --- Servicios (8) --- */
    services: [
      {
        id: "recomposicion",
        icon: "body",
        name: "Recomposición corporal",
        desc: "Pérdida de grasa, ganancia muscular o ambas. Plan adaptado a tu cuerpo, tu ritmo y tu vida real."
      },
      {
        id: "vegana",
        icon: "leaf",
        name: "Alimentación vegetariana y vegana",
        desc: "Sin carencias, sin complicaciones. Planes completos para dietas plant-based de cualquier nivel."
      },
      {
        id: "deficits",
        icon: "lab",
        name: "Déficits nutricionales",
        desc: "Anemia, vitamina D, B12, hierro… Identificamos qué falta y lo corregimos con alimentación."
      },
      {
        id: "alergias",
        icon: "shield",
        name: "Alergias e intolerancias",
        desc: "Celiaquía, lactosa, frutos secos, FODMAP. Comer bien sin renunciar al placer de comer."
      },
      {
        id: "patologias",
        icon: "heart",
        name: "Patologías",
        desc: "Diabetes, hipertensión, colesterol, tiroides… La alimentación como parte del tratamiento."
      },
      {
        id: "educacion",
        icon: "book",
        name: "Educación nutricional",
        desc: "No solo un plan — aprendes a comer. Para que cuando acabemos no me necesites."
      },
      {
        id: "rendimiento",
        icon: "bolt",
        name: "Mejora de rendimiento",
        desc: "Para deportistas amateur o de élite. Come para rendir, recuperar y mejorar."
      },
      {
        id: "fases",
        icon: "star",
        name: "Fases delicadas",
        desc: "Embarazo, lactancia, menopausia. Acompañamiento nutricional en los momentos que más importa."
      }
    ],

    /* --- Pasos (cómo funciona) --- */
    steps: [
      {
        num: "01",
        title: "Consulta inicial gratuita",
        desc: "Hablamos de tus objetivos, hábitos y punto de partida. Sin compromiso."
      },
      {
        num: "02",
        title: "Plan personalizado",
        desc: "En menos de 72h tienes tu plan adaptado a ti, no a una plantilla."
      },
      {
        num: "03",
        title: "Seguimiento real",
        desc: "Revisiones periódicas, ajustes cuando hacen falta y acceso directo por WhatsApp."
      }
    ],

    /* --- Testimonios --- */
    testimonials: [
      {
        name: "Carmen R.",
        service: "Recomposición corporal",
        photo: "assets/img/testimonial-1.jpg",
        quote: "Llevaba años intentándolo sola y sin resultados. Con Nerea entendí que no era fuerza de voluntad, era información. En 4 meses perdí 8 kilos sin pasar hambre y sin obsesionarme con la báscula."
      },
      {
        name: "Marcos D.",
        service: "Rendimiento deportivo",
        photo: "assets/img/testimonial-2.jpg",
        quote: "Corro medias maratones y siempre llegaba a la semana de carrera agotado. El plan nutricional cambió eso completamente. Ahora llego con energía y mis tiempos han bajado."
      },
      {
        name: "Lucía F.",
        service: "Embarazo y lactancia",
        photo: "assets/img/testimonial-3.jpg",
        quote: "Estaba asustada de comer mal durante el embarazo. Nerea me dio un plan claro, sin restricciones absurdas, y me acompañó hasta el final de la lactancia. Fue un apoyo enorme."
      },
      {
        name: "Adrián M.",
        service: "Alimentación vegana",
        photo: "assets/img/testimonial-4.jpg",
        quote: "Llevaba un año vegano con analíticas regulares y no entendía por qué siempre tenía B12 baja. En dos meses de seguimiento lo corregimos solo con alimentación. Ojalá hubiera ido antes."
      }
    ],

    /* --- Marquee --- */
    marqueeItems: [
      "Recomposición corporal",
      "Nutrición clínica",
      "Embarazo y lactancia",
      "Alimentación vegana",
      "Déficits nutricionales",
      "Rendimiento deportivo",
      "Educación nutricional",
      "Alergias e intolerancias",
      "Menopausia"
    ]

  };

  /* Alias for skill verifier compatibility */
  window.__BRAND__ = window.__NERNUTRI__;
})();
