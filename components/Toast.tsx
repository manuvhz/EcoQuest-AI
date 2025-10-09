// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'success', // 'success', 'error'
    },
  },
  emits: ['remove'],
  setup(props, { emit }) {
    const { onMounted } = Vue;

    onMounted(() => {
      // It's better to let the parent handle the timeout
      // but for simplicity, we'll do it here.
    });
    
    const icon = {
        success: '🎉',
        error: '🔥',
    }

    return {
      icon,
    };
  },
  template: `
    <div
      :class="[
        'flex items-center w-full p-4 text-white rounded-lg shadow-lg',
        type === 'success' ? 'bg-eco-green' : 'bg-red-500'
      ]"
      role="alert"
    >
      <div class="text-xl mr-3">{{ icon[type] }}</div>
      <div class="text-sm font-medium">{{ message }}</div>
      <button @click="$emit('remove')" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white/20 text-white hover:bg-white/40 rounded-lg p-1.5 inline-flex h-8 w-8" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
  `
};