// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
  },
  setup(props) {
    const { computed } = Vue;
    const percentage = computed(() => {
      if (props.max === 0) return 0;
      return Math.round((props.value / props.max) * 100);
    });
    return { percentage };
  },
  template: `
    <div class="w-full bg-eco-green-light rounded-full h-4">
      <div
        class="bg-eco-secondary h-4 rounded-full flex items-center justify-center text-xs font-bold text-yellow-800 transition-all duration-500 ease-out"
        :style="{ width: percentage + '%' }"
      >
        {{ percentage }}%
      </div>
    </div>
  `
};