import { api } from '../api.ts';
import { QuizIcon, GameIcon, SimIcon } from '../constants.tsx';
import Card from '../components/Card.tsx';
import ChallengeModal from '../components/ChallengeModal.tsx';

// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

export default {
  components: {
    Card,
    QuizIcon,
    GameIcon,
    SimIcon,
    ChallengeModal,
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['complete-challenge'],
  setup(props, { emit }) {
    const { ref, onMounted } = Vue;

    const challenges = ref([]);
    const isLoading = ref(true);
    const selectedChallenge = ref(null);
    const isModalVisible = ref(false);
    
    onMounted(async () => {
        challenges.value = await api.getChallenges();
        isLoading.value = false;
    });

    const openChallengeModal = (challenge) => {
      if (props.user.completedChallenges.includes(challenge.id)) return;
      selectedChallenge.value = challenge;
      isModalVisible.value = true;
    };

    const closeChallengeModal = () => {
      isModalVisible.value = false;
      selectedChallenge.value = null;
    };
    
    const onChallengeComplete = (result) => {
      emit('complete-challenge', result);
      closeChallengeModal();
    }

    return {
      challenges,
      isLoading,
      selectedChallenge,
      isModalVisible,
      openChallengeModal,
      closeChallengeModal,
      onChallengeComplete,
    };
  },
  template: `
    <div class="animate-fade-in">
      <div class="text-center mb-8 animate-slide-in-up">
        <h1 class="text-4xl font-bold text-eco-green-dark">Misiones y Retos</h1>
        <p class="text-lg text-gray-600 mt-2">¡Completa retos para ganar puntos y subir de nivel!</p>
      </div>

      <div v-if="isLoading" class="text-center text-gray-500 text-lg">Cargando retos... 🌍</div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(challenge, index) in challenges" :key="challenge.id" class="animate-slide-in-up" :style="{ animationDelay: (index * 100) + 'ms' }">
          <card class-name="flex flex-col h-full">
            <div class="flex items-center space-x-4 mb-4">
              <div class="bg-eco-green-light p-3 rounded-full">
                <component :is="challenge.icon" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-eco-green-dark">{{ challenge.title }}</h3>
                <p class="text-sm font-semibold text-eco-secondary">{{ challenge.points }} Puntos 🌟</p>
              </div>
            </div>
            <p class="text-gray-600 flex-grow">{{ challenge.description }}</p>
            <button 
              @click="openChallengeModal(challenge)"
              :disabled="user.completedChallenges.includes(challenge.id)"
              class="mt-6 w-full font-bold py-2 px-4 rounded-lg transition-all transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              :class="user.completedChallenges.includes(challenge.id) ? 'bg-gray-400 text-white' : 'bg-eco-green text-white hover:bg-eco-green-dark hover:scale-105'"
            >
              {{ user.completedChallenges.includes(challenge.id) ? 'Completado' : 'Empezar Reto' }}
            </button>
          </card>
        </div>
      </div>
      
      <challenge-modal 
        v-if="isModalVisible" 
        :challenge="selectedChallenge"
        @close="closeChallengeModal"
        @complete="onChallengeComplete"
      ></challenge-modal>
    </div>
  `
};