export default {
  props: {
    title: String,
    className: {
      type: String,
      default: ''
    },
    style: Object,
  },
  template: `
    <div
      :class="['bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl', className]"
      :style="style"
    >
      <div v-if="title" class="p-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-eco-green-dark">{{ title }}</h3>
      </div>
      <div class="p-6">
        <slot></slot>
      </div>
    </div>
  `
};
