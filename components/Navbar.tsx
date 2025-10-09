// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

const NavLink = {
  props: {
    href: String,
    isActive: Boolean,
  },
  setup(props) {
    const navigate = () => {
      window.location.hash = props.href;
    };
    return { navigate };
  },
  template: `
    <a
      :href="href"
      @click.prevent="navigate"
      :class="[
        'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer',
        isActive ? 'bg-eco-green text-white' : 'text-eco-green-dark hover:bg-eco-green-light'
      ]"
    >
      <slot></slot>
    </a>
  `
};

export default {
  components: { NavLink },
  props: {
    currentPage: {
      type: String,
      required: true,
    },
    user: {
        type: Object,
        required: true,
    }
  },
  emits: ['logout'],
  setup(props, { emit }) {
    const { ref } = Vue;
    const isProfileMenuOpen = ref(false);

    const navigateToProfile = () => {
      window.location.hash = '#profile';
    };

    const handleLogout = () => {
        isProfileMenuOpen.value = false;
        emit('logout');
    };
    
    const navigateToSettings = () => {
        isProfileMenuOpen.value = false;
        window.location.hash = '#settings';
    };

    return { 
        isProfileMenuOpen,
        navigateToProfile,
        handleLogout,
        navigateToSettings
    };
  },
  template: `
    <header class="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <a href="#profile" @click.prevent="navigateToProfile" class="flex items-center space-x-2 text-eco-green-dark cursor-pointer">
                <span class="text-2xl">🌿</span>
                <span class="font-bold text-xl">EcoQuest</span>
              </a>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <nav-link href="#profile" :is-active="currentPage === 'profile'">Perfil</nav-link>
                <nav-link href="#challenges" :is-active="currentPage === 'challenges'">Retos</nav-link>
                <nav-link href="#leaderboard" :is-active="currentPage === 'leaderboard'">Ranking</nav-link>
                <nav-link href="#achievements" :is-active="currentPage === 'achievements'">Logros</nav-link>
                <nav-link href="#learn" :is-active="currentPage === 'learn'">Aprender</nav-link>
                <nav-link href="#community" :is-active="currentPage === 'community'">Comunidad</nav-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
                <div class="ml-3 relative">
                    <div>
                        <button @click="isProfileMenuOpen = !isProfileMenuOpen" type="button" class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span class="sr-only">Open user menu</span>
                            <img class="h-8 w-8 rounded-full" :src="user.avatarUrl" alt="">
                        </button>
                    </div>
                    <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                    >
                        <div v-if="isProfileMenuOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                            <a href="#settings" @click.prevent="navigateToSettings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-1">Ajustes</a>
                            <a href="#" @click.prevent="handleLogout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="user-menu-item-2">Cerrar Sesión</a>
                        </div>
                    </transition>
                </div>
            </div>
          </div>
        </div>
      </nav>
      <!-- Mobile Nav -->
      <div class="md:hidden flex flex-wrap justify-around p-2 border-t border-gray-200">
         <nav-link href="#profile" :is-active="currentPage === 'profile'">Perfil</nav-link>
         <nav-link href="#challenges" :is-active="currentPage === 'challenges'">Retos</nav-link>
         <nav-link href="#leaderboard" :is-active="currentPage === 'leaderboard'">Ranking</nav-link>
         <nav-link href="#achievements" :is-active="currentPage === 'achievements'">Logros</nav-link>
         <nav-link href="#learn" :is-active="currentPage === 'learn'">Aprender</nav-link>
         <nav-link href="#community" :is-active="currentPage === 'community'">Comunidad</nav-link>
         <nav-link href="#settings" :is-active="currentPage === 'settings'">Ajustes</nav-link>
         <button
            @click="$emit('logout')"
            class="px-3 py-2 rounded-md text-sm font-medium text-red-500 bg-red-100"
          >
            Salir
          </button>
      </div>
    </header>
  `
};