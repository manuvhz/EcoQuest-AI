// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

export default {
  props: {
    challenge: {
      type: Object,
      required: true,
    },
  },
  emits: ['close', 'complete'],
  setup(props, { emit }) {
    const { ref, computed } = Vue;

    const currentQuestionIndex = ref(0);
    const selectedAnswer = ref(null);
    const quizFinished = ref(false);
    const correctAnswers = ref(0);

    const currentQuestion = computed(() => {
        return props.challenge.questions[currentQuestionIndex.value];
    });

    const handleAnswer = (option) => {
        selectedAnswer.value = option;
        if(option === currentQuestion.value.correctAnswer) {
            correctAnswers.value++;
        }

        setTimeout(() => {
             if(currentQuestionIndex.value < props.challenge.questions.length - 1) {
                currentQuestionIndex.value++;
                selectedAnswer.value = null;
            } else {
                quizFinished.value = true;
            }
        }, 500); // Wait a bit to show feedback
    };

    const finishChallenge = () => {
        // For simplicity, we consider it complete even if answers are wrong,
        // but only award points if all are correct.
        const allCorrect = correctAnswers.value === props.challenge.questions.length;
        if(allCorrect) {
             emit('complete', { challengeId: props.challenge.id, points: props.challenge.points });
        } else {
             // Or maybe emit a failure event
             emit('close');
        }
    };
    
    // Fallback for non-quiz challenges
    const completeGenericChallenge = () => {
        emit('complete', { challengeId: props.challenge.id, points: props.challenge.points });
    };

    return {
        currentQuestionIndex,
        selectedAnswer,
        quizFinished,
        correctAnswers,
        currentQuestion,
        handleAnswer,
        finishChallenge,
        completeGenericChallenge,
    };
  },
  template: `
    <transition name="modal-fade">
      <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[90] p-4" @click.self="$emit('close')">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-slide-in-up">
          <!-- Header -->
          <div class="p-5 border-b border-gray-200">
            <h2 class="text-2xl font-bold text-eco-green-dark">{{ challenge.title }}</h2>
            <p class="text-gray-500">{{ challenge.description }}</p>
          </div>
          
          <!-- Body: Quiz -->
          <div v-if="challenge.type === 'quiz' && challenge.questions" class="p-6">
            <div v-if="!quizFinished">
              <p class="text-lg font-semibold mb-4">{{ currentQuestion.text }}</p>
              <div class="space-y-3">
                <button
                  v-for="option in currentQuestion.options"
                  :key="option"
                  @click="handleAnswer(option)"
                  :disabled="selectedAnswer !== null"
                  class="w-full text-left p-3 rounded-lg border-2 transition-colors duration-200"
                  :class="{
                    'border-eco-green hover:bg-eco-green-light': selectedAnswer === null,
                    'bg-green-200 border-green-500': selectedAnswer === option && option === currentQuestion.correctAnswer,
                    'bg-red-200 border-red-500': selectedAnswer === option && option !== currentQuestion.correctAnswer,
                    'border-gray-300': selectedAnswer !== null && selectedAnswer !== option,
                  }"
                >
                  {{ option }}
                </button>
              </div>
               <p class="text-center text-sm text-gray-400 mt-4">Pregunta {{ currentQuestionIndex + 1 }} de {{ challenge.questions.length }}</p>
            </div>
            <div v-else class="text-center">
                <h3 class="text-2xl font-bold">¡Quiz Completado!</h3>
                <p class="text-lg mt-2">Has respondido correctamente a <span class="font-bold text-eco-secondary">{{ correctAnswers }}</span> de {{ challenge.questions.length }} preguntas.</p>
                <button @click="finishChallenge" class="mt-6 w-full bg-eco-green text-white font-bold py-3 px-4 rounded-lg hover:bg-eco-green-dark transition-transform transform hover:scale-105 duration-300">
                    {{ correctAnswers === challenge.questions.length ? 'Reclamar Puntos' : 'Cerrar' }}
                </button>
            </div>
          </div>

          <!-- Body: Generic for other types -->
          <div v-else class="p-6 text-center">
            <p class="text-gray-600 mb-6">Este es un reto de tipo '{{ challenge.type }}'. ¡Haz clic abajo para completarlo!</p>
             <button @click="completeGenericChallenge" class="w-full bg-eco-green text-white font-bold py-3 px-4 rounded-lg hover:bg-eco-green-dark transition-transform transform hover:scale-105 duration-300">
                Completar y ganar {{ challenge.points }} puntos
            </button>
          </div>

          <!-- Footer -->
           <div class="p-4 bg-gray-50 rounded-b-2xl text-right">
             <button @click="$emit('close')" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Cancelar</button>
           </div>
        </div>
      </div>
    </transition>
    <style>
      .modal-fade-enter-active, .modal-fade-leave-active {
        transition: opacity 0.3s ease;
      }
      .modal-fade-enter-from, .modal-fade-leave-to {
        opacity: 0;
      }
    </style>
  `
};