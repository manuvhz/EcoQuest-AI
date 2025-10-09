// FIX: Replaced placeholder content with actual data structures and exports.
import type { Achievement, Challenge, LeaderboardUser, Friend, EcoTip } from './types.ts';

// Icon components for Challenges
export const QuizIcon = {
  template: `<span class="text-2xl">🧠</span>`
};
export const GameIcon = {
  template: `<span class="text-2xl">🎮</span>`
};
export const SimIcon = {
  template: `<span class="text-2xl">🌍</span>`
};

export const achievements: Achievement[] = [
  { id: 'a1', name: 'Primer Paso', description: 'Completa tu primer reto.', icon: '🌱' },
  { id: 'a2', name: 'Aprendiz Eco', description: 'Completa 5 retos de quiz.', icon: '📚' },
  { id: 'a3', name: 'Héroe del Reciclaje', description: 'Completa todos los retos sobre reciclaje.', icon: '♻️' },
  { id: 'a4', name: 'Mente Brillante', description: 'Consigue una puntuación perfecta en un quiz.', icon: '💡' },
  { id: 'a5', name: 'Socializador Verde', description: 'Añade a tu primer amigo.', icon: '🙋‍♂️' },
  { id: 'a6', name: 'Campeón de Retos', description: 'Completa 10 retos.', icon: '🏆', goal: 10 },
  { id: 'a7', name: 'Maratonista', description: 'Completa 25 retos.', icon: '🏃‍♂️', goal: 25 },
];

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


export const leaderboardData: LeaderboardUser[] = [
    { id: 'u2', rank: 1, name: 'Elena Verde', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', points: 12500 },
    { id: 'u3', rank: 2, name: 'Pedro Monte', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', points: 11800 },
    { id: 'u1', rank: 3, name: 'EcoGuerrero', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', points: 10500 },
    { id: 'u4', rank: 4, name: 'Ana Ríos', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', points: 9800 },
    { id: 'u5', rank: 5, name: 'Carlos Sol', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704b', points: 9200 },
];

export const friendsData: Friend[] = [
    { id: 'u2', name: 'Elena Verde', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', points: 12500, isOnline: true, lastActivity: 'En línea ahora' },
    { id: 'u3', name: 'Pedro Monte', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', points: 11800, isOnline: false, lastActivity: 'Activo hace 2 horas' },
    { id: 'u4', name: 'Ana Ríos', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', points: 9800, isOnline: true, lastActivity: 'En línea ahora' },
];

export const ecoTips: EcoTip[] = [
    { id: 't1', title: 'Desconecta Aparatos', category: 'Energy', content: 'Los aparatos en "standby" consumen energía. Desconéctalos cuando no los uses para ahorrar electricidad.', icon: '🔌' },
    { id: 't2', title: 'Duchas Cortas', category: 'Water', content: 'Reducir tu tiempo en la ducha en solo 2 minutos puede ahorrar hasta 40 litros de agua.', icon: '🚿' },
    { id: 't3', title: 'Separa Correctamente', category: 'Recycling', content: 'Asegúrate de limpiar los envases antes de reciclarlos para evitar contaminar el lote completo.', icon: '♻️' },
    { id: 't4', title: 'Bolsas Reutilizables', category: 'Lifestyle', content: 'Lleva siempre contigo bolsas de tela para tus compras y evita las bolsas de plástico de un solo uso.', icon: '🛍️' },
    { id: 't5', title: 'Bombillas LED', category: 'Energy', content: 'Cambia tus bombillas incandescentes por LED. Consumen hasta un 80% menos de energía y duran mucho más.', icon: '💡' },
    { id: 't6', title: 'Cierra el Grifo', category: 'Water', content: 'No dejes correr el agua mientras te cepillas los dientes. Puedes ahorrar más de 6 litros por minuto.', icon: '💧' },
];
