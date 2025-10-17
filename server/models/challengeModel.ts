import type { Challenge } from '../../types';

export const challenges: Challenge[] = [
  {
    id: 'c1',
    title: 'Quiz: El Plástico',
    description: 'Pon a prueba tus conocimientos sobre el impacto del plástico y cómo reducir su uso.',
    points: 50,
    type: 'quiz',
    icon: 'QuizIcon',
    questions: [
      { text: '¿Cuánto tiempo tarda una botella de plástico en descomponerse?', options: ['10 años', '50 años', '100 años', 'Más de 400 años'], correctAnswer: 'Más de 400 años' },
      { text: '¿Cuál es el símbolo universal del reciclaje?', options: ['Un círculo', 'Un triángulo de flechas', 'Un cuadrado verde', 'Una hoja'], correctAnswer: 'Un triángulo de flechas' },
      { text: '¿Qué significa "reducir" en las 3R?', options: ['Comprar menos cosas', 'Usar menos recursos', 'Ambas son correctas', 'Ninguna es correcta'], correctAnswer: 'Ambas son correctas' },
    ]
  },
  {
    id: 'c2',
    title: 'Simulación: Ahorro de Agua',
    description: 'Toma decisiones diarias en una simulación para ver cuánta agua puedes ahorrar en una semana.',
    points: 75,
    type: 'simulation',
    icon: 'SimIcon',
  },
  {
    id: 'c3',
    title: 'Juego: Separador de Residuos',
    description: '¡Rápido! Clasifica los residuos en sus contenedores correctos antes de que se acabe el tiempo.',
    points: 60,
    type: 'game',
    icon: 'GameIcon',
  },
  {
    id: 'c4',
    title: 'Quiz: Energías Renovables',
    description: '¿Cuánto sabes sobre la energía solar, eólica e hidráulica? ¡Descúbrelo!',
    points: 50,
    type: 'quiz',
    icon: 'QuizIcon',
    questions: [
        { text: '¿Cuál de estas es una fuente de energía renovable?', options: ['Carbón', 'Gas Natural', 'Viento', 'Petróleo'], correctAnswer: 'Viento' },
        { text: '¿Qué dispositivo convierte la luz solar en electricidad?', options: ['Turbina eólica', 'Panel solar', 'Planta hidroeléctrica', 'Batería'], correctAnswer: 'Panel solar' },
    ]
  }
];
