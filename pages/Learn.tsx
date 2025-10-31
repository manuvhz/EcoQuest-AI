import { ecoTips, isLoadingEcoTips, fetchEcoTips } from '../store/ecoTips.ts';
import Card from '../components/Card.tsx';

// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

export default {
  components: { Card },
  setup() {
    const { ref, computed, onMounted } = Vue;
    const categories = ['All', 'Recycling', 'Energy', 'Water', 'Lifestyle'];
    const selectedCategory = ref('All');

    onMounted(() => {
        fetchEcoTips();
    });

    const filteredTips = computed(() => {
        if (selectedCategory.value === 'All') {
            return ecoTips.value;
        }
        return ecoTips.value.filter(tip => tip.category === selectedCategory.value);
    });

    return { 
        categories,
        selectedCategory,
        filteredTips,
        isLoading: isLoadingEcoTips
    };
  },
  template: `
    <div class="space-y-8 animate-fade-in">
        <div class="text-center animate-slide-in-up">
            <h1 class="text-4xl font-bold text-eco-green-dark">Biblioteca Verde 📚</h1>
            <p class="text-lg text-gray-600 mt-2">Pequeños cambios, gran impacto. ¡Aprende cómo puedes ayudar!</p>
        </div>

        <!-- Category Filters -->
        <div class="flex flex-wrap justify-center gap-2 animate-slide-in-up" :style="{ animationDelay: '100ms' }">
            <button v-for="category in categories" :key="category" @click="selectedCategory = category"
                :class="[
                    'px-4 py-2 rounded-full text-sm font-semibold transition-colors',
                    selectedCategory === category ? 'bg-eco-green text-white' : 'bg-white text-eco-green-dark hover:bg-eco-green-light'
                ]">
                {{ category }}
            </button>
        </div>
        
        <div v-if="isLoading" class="text-center text-gray-500 text-lg">Cargando consejos...</div>

        <!-- Tips Grid -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div v-for="(tip, index) in filteredTips" :key="tip.id" class="animate-slide-in-up" :style="{ animationDelay: (index * 50 + 200) + 'ms' }">
                <card class-name="flex flex-col h-full !p-0">
                    <div class="p-6">
                        <div class="flex items-start space-x-4">
                            <span class="text-4xl mt-1">{{ tip.icon }}</span>
                            <div>
                                <h3 class="text-xl font-bold text-eco-green-dark">{{ tip.title }}</h3>
                                <p class="text-gray-600 mt-2">{{ tip.content }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-auto p-4 bg-eco-green-light rounded-b-xl text-right">
                         <span class="text-sm font-semibold text-eco-green-dark">{{ tip.category }}</span>
                    </div>
                </card>
            </div>
        </div>
    </div>
  `
};