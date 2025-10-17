import type { Achievement } from '../../types';

export const achievements: Achievement[] = [
  { id: 'a1', name: 'Primer Paso', description: 'Completa tu primer reto.', icon: '🌱' },
  { id: 'a2', name: 'Aprendiz Eco', description: 'Completa 5 retos de quiz.', icon: '📚' },
  { id: 'a3', name: 'Héroe del Reciclaje', description: 'Completa todos los retos sobre reciclaje.', icon: '♻️' },
  { id: 'a4', name: 'Mente Brillante', description: 'Consigue una puntuación perfecta en un quiz.', icon: '💡' },
  { id: 'a5', name: 'Socializador Verde', description: 'Añade a tu primer amigo.', icon: '🙋‍♂️' },
  { id: 'a6', name: 'Campeón de Retos', description: 'Completa 10 retos.', icon: '🏆', goal: 10 },
  { id: 'a7', name: 'Maratonista', description: 'Completa 25 retos.', icon: '🏃‍♂️', goal: 25 },
];
