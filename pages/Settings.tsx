// FIX: Created the Settings page component with a basic form structure.
import Card from '../components/Card.tsx';
// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

export default {
    components: { Card },
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const { ref } = Vue;
        // Create local refs for form fields to avoid directly mutating props
        const form = ref({
            name: props.user.name,
            email: 'demo@ecoquest.com', // Assuming email is not part of user object from props
            avatarUrl: props.user.avatarUrl,
        });
        const notifications = ref({
            newChallenges: true,
            friendActivity: true,
            weeklySummary: false,
        });

        const saveChanges = () => {
            // In a real app, you would emit an event or call an API
            console.log('Saving changes:', form.value, notifications.value);
            // Here you could show a toast message
            alert('¡Cambios guardados! (Simulación)');
        };

        return {
            form,
            notifications,
            saveChanges,
        };
    },
    template: `
    <div class="space-y-8 max-w-4xl mx-auto animate-fade-in">
      <div class="text-center animate-slide-in-up">
        <h1 class="text-4xl font-bold text-eco-green-dark">Ajustes ⚙️</h1>
        <p class="text-lg text-gray-600 mt-2">Gestiona tu perfil, notificaciones y preferencias.</p>
      </div>

      <!-- Profile Settings -->
      <card title="Perfil" class-name="animate-slide-in-up" :style="{ animationDelay: '100ms' }">
        <form @submit.prevent="saveChanges" class="space-y-6">
          <div class="flex items-center space-x-6">
            <img :src="form.avatarUrl" class="w-20 h-20 rounded-full" alt="Avatar">
            <button type="button" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cambiar Foto</button>
          </div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
            <input type="text" id="name" v-model="form.name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-eco-green focus:border-eco-green">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input type="email" id="email" v-model="form.email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed" readonly>
          </div>
          <div class="text-right">
            <button type="submit" class="bg-eco-green text-white font-bold py-2 px-6 rounded-lg hover:bg-eco-green-dark transition-transform transform hover:scale-105 duration-300">Guardar Cambios</button>
          </div>
        </form>
      </card>

      <!-- Notification Settings -->
      <card title="Notificaciones" class-name="animate-slide-in-up" :style="{ animationDelay: '200ms' }">
        <div class="space-y-4">
          <div v-for="(value, key) in notifications" :key="key" class="flex items-center justify-between">
            <label :for="key" class="text-gray-700">{{ key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) }}</label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" :id="key" v-model="notifications[key]" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-eco-green-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-eco-green"></div>
            </label>
          </div>
        </div>
      </card>
    </div>
  `
};
