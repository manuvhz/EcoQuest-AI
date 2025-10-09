import { leaderboardData } from '../constants.tsx';

export default {
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      leaderboardData,
    };
  },
  template: `
    <div class="animate-fade-in">
      <div class="text-center mb-8 animate-slide-in-up">
        <h1 class="text-4xl font-bold text-eco-green-dark">Ranking Global 🏆</h1>
        <p class="text-lg text-gray-600 mt-2">¡Mira quién lidera la carrera para salvar el planeta!</p>
      </div>
      
      <div class="bg-white rounded-xl shadow-lg overflow-hidden animate-slide-in-up" :style="{ animationDelay: '100ms' }">
        <ul class="divide-y divide-gray-200">
          <li v-for="(user, index) in leaderboardData" 
              :key="user.id"
              :class="[
                'flex items-center p-4 transition-colors duration-200',
                user.id === currentUser.id ? 'bg-eco-green-light' : 'hover:bg-gray-50'
              ]">
            <div :class="[
              'w-12 text-center text-2xl font-bold',
              index === 0 ? 'text-yellow-400' :
              index === 1 ? 'text-gray-400' :
              index === 2 ? 'text-yellow-600' : 'text-gray-500'
            ]">
              <span v-if="index === 0">🥇</span>
              <span v-else-if="index === 1">🥈</span>
              <span v-else-if="index === 2">🥉</span>
              <span v-else>{{ user.rank }}</span>
            </div>
            <img :src="user.avatarUrl" :alt="user.name" class="w-12 h-12 rounded-full mx-4" />
            <div class="flex-grow">
              <p :class="['font-semibold', user.id === currentUser.id ? 'text-eco-green-dark' : 'text-gray-800']">
                {{ user.name }}
              </p>
            </div>
            <div class="text-right">
              <p class="font-bold text-lg text-eco-secondary">{{ user.points.toLocaleString() }} 🌟</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `
};
