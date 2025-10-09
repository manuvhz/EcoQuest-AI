import { achievements } from '../constants.tsx';
import Card from '../components/Card.tsx';
import ProgressBar from '../components/ProgressBar.tsx';

// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

export default {
  components: { Card, ProgressBar },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { computed } = Vue;
    const userAchievements = computed(() => 
      achievements.filter(ach => props.user.unlockedAchievements.includes(ach.id))
    );
    const lockedAchievements = computed(() => 
      achievements.filter(ach => !props.user.unlockedAchievements.includes(ach.id))
    );
    return { userAchievements, lockedAchievements };
  },
  template: `
    <div class="space-y-8 animate-fade-in">
      <!-- User Header -->
      <card class-name="!bg-eco-green-dark text-white animate-slide-in-up">
        <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            :src="user.avatarUrl"
            :alt="user.name"
            class="w-24 h-24 rounded-full border-4 border-eco-secondary"
          />
          <div class="text-center md:text-left">
            <h1 class="text-3xl font-bold">¡Hola, {{ user.name }}!</h1>
            <p class="text-eco-green-light">Listo para salvar el planeta hoy?</p>
          </div>
        </div>
      </card>

      <!-- Stats and Level -->
      <div class="grid md:grid-cols-3 gap-6">
        <card class-name="flex flex-col items-center justify-center text-center animate-slide-in-up" :style="{ animationDelay: '100ms' }">
          <span class="text-4xl">🌟</span>
          <p class="text-xl font-semibold text-gray-600 mt-2">Puntos</p>
          <p class="text-4xl font-bold text-eco-secondary">{{ user.points.toLocaleString() }}</p>
        </card>
        <card class-name="flex flex-col items-center justify-center text-center animate-slide-in-up" :style="{ animationDelay: '200ms' }">
          <span class="text-4xl">🎮</span>
          <p class="text-xl font-semibold text-gray-600 mt-2">Nivel Actual</p>
          <p class="text-4xl font-bold text-eco-green-dark">{{ user.level }}</p>
        </card>
        <card class-name="animate-slide-in-up" :style="{ animationDelay: '300ms' }">
           <h3 class="text-xl font-semibold text-gray-600 mb-2 text-center">Progreso al Nivel {{ user.level + 1 }}</h3>
           <progress-bar :value="user.points" :max="user.pointsToNextLevel" />
           <p class="text-center text-sm text-gray-500 mt-2">{{ user.points }} / {{ user.pointsToNextLevel }} puntos</p>
        </card>
      </div>
      
      <!-- Achievements -->
      <card title="Logros Desbloqueados 🏅" class-name="animate-slide-in-up" :style="{ animationDelay: '400ms' }">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="ach in userAchievements" :key="ach.id" class="flex flex-col items-center text-center p-2 rounded-lg bg-eco-green-light" :title="ach.description">
            <div class="text-4xl" v-html="ach.icon"></div>
            <p class="text-sm font-semibold text-eco-green-dark mt-1">{{ ach.name }}</p>
          </div>
          <div v-for="ach in lockedAchievements" :key="ach.id" class="flex flex-col items-center text-center p-2 rounded-lg bg-gray-200 filter grayscale opacity-60" :title="ach.description">
            <div class="text-4xl" v-html="ach.icon"></div>
            <p class="text-sm font-semibold text-gray-500 mt-1">{{ ach.name }}</p>
          </div>
        </div>
      </card>
    </div>
  `
};