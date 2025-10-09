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

    const processedAchievements = computed(() => 
      achievements.map(ach => {
        const isUnlocked = props.user.unlockedAchievements.includes(ach.id);
        let progress = null;
        if (ach.goal) {
            let current = 0;
            // This is a simple example; a real app might need more complex logic
            if (ach.id === 'a6') { // Challenge Champion
                current = props.user.completedChallenges.length;
            }
            progress = {
                current: Math.min(current, ach.goal),
                max: ach.goal
            };
        }
        return { ...ach, isUnlocked, progress };
      })
    );

    const unlocked = computed(() => processedAchievements.value.filter(a => a.isUnlocked));
    const locked = computed(() => processedAchievements.value.filter(a => !a.isUnlocked));

    return { unlocked, locked };
  },
  template: `
    <div class="space-y-8 animate-fade-in">
        <div class="text-center animate-slide-in-up">
            <h1 class="text-4xl font-bold text-eco-green-dark">Sala de Trofeos 🏆</h1>
            <p class="text-lg text-gray-600 mt-2">¡Colecciónalos todos y demuestra que eres un Héroe Ecológico!</p>
        </div>

        <card title="Logros Desbloqueados" class-name="animate-slide-in-up" :style="{ animationDelay: '100ms' }">
            <div v-if="unlocked.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div v-for="ach in unlocked" :key="ach.id" class="flex flex-col items-center text-center p-3 rounded-xl bg-eco-green-light transform transition hover:scale-110" :title="ach.description">
                    <div class="text-5xl" v-html="ach.icon"></div>
                    <p class="text-md font-semibold text-eco-green-dark mt-2">{{ ach.name }}</p>
                </div>
            </div>
            <p v-else class="text-gray-500 text-center">¡Aún no has desbloqueado ningún logro! ¡Completa un reto para empezar!</p>
        </card>

        <card title="Logros Pendientes" class-name="animate-slide-in-up" :style="{ animationDelay: '200ms' }">
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="ach in locked" :key="ach.id" class="flex flex-col items-center text-center p-4 rounded-xl bg-gray-100 border-2 border-dashed">
                    <div class="text-5xl filter grayscale" v-html="ach.icon"></div>
                    <div class="w-full mt-3 text-left">
                        <p class="font-bold text-gray-700">{{ ach.name }}</p>
                        <p class="text-sm text-gray-500 mb-2">{{ ach.description }}</p>
                        <progress-bar v-if="ach.progress" :value="ach.progress.current" :max="ach.progress.max" />
                        <p v-if="ach.progress" class="text-xs text-center mt-1">{{ach.progress.current}} / {{ach.progress.max}}</p>
                    </div>
                </div>
            </div>
        </card>
    </div>
  `
};