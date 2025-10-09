// FIX: Created the Community page component with mock data.
import { friendsData } from '../constants.tsx';
import Card from '../components/Card.tsx';

export default {
    components: { Card },
    setup() {
        const activities = [
            { id: 1, user: 'Elena Verde', action: 'ha superado tu puntuación en el reto "Quiz: El Plástico"!', time: 'hace 5 min' },
            { id: 2, user: 'Pedro Monte', action: 'ha alcanzado el Nivel 13.', time: 'hace 1 hora' },
            { id: 3, user: 'Ana Ríos', action: 'te ha enviado una invitación de amistad.', time: 'hace 3 horas' },
            { id: 4, user: 'EcoGuerrero', action: 'ha desbloqueado el logro "Campeón de Retos" 🏆.', time: 'hace 1 día' },
        ];

        return {
            friendsData,
            activities
        };
    },
    template: `
    <div class="space-y-8 animate-fade-in">
      <div class="text-center animate-slide-in-up">
        <h1 class="text-4xl font-bold text-eco-green-dark">Comunidad Verde 🤝</h1>
        <p class="text-lg text-gray-600 mt-2">Conecta con otros héroes ecológicos, comparte tu progreso y motívense mutuamente.</p>
      </div>

      <!-- Friends List -->
      <card title="Mis Amigos" class-name="animate-slide-in-up" :style="{ animationDelay: '100ms' }">
        <div class="space-y-4">
          <div v-for="friend in friendsData" :key="friend.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-4">
              <div class="relative">
                <img :src="friend.avatarUrl" :alt="friend.name" class="w-12 h-12 rounded-full" />
                <span v-if="friend.isOnline" class="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              </div>
              <div>
                <p class="font-semibold text-gray-800">{{ friend.name }}</p>
                <p class="text-sm text-gray-500">{{ friend.lastActivity }}</p>
              </div>
            </div>
            <button class="px-3 py-1 text-sm font-semibold text-eco-green border border-eco-green rounded-full hover:bg-eco-green-light transition-colors">Ver Perfil</button>
          </div>
        </div>
      </card>

      <!-- Activity Feed -->
      <card title="Actividad Reciente" class-name="animate-slide-in-up" :style="{ animationDelay: '200ms' }">
        <ul class="space-y-4">
          <li v-for="activity in activities" :key="activity.id" class="flex items-start space-x-3">
            <div class="bg-eco-green-light p-2 rounded-full text-xl">🌎</div>
            <div>
              <p class="text-gray-800">
                <span class="font-bold">{{ activity.user }}</span>
                {{ activity.action }}
              </p>
              <p class="text-xs text-gray-400">{{ activity.time }}</p>
            </div>
          </li>
        </ul>
      </card>
    </div>
  `
};
