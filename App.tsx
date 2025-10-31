// FIX: Replaced placeholder content with the main application component.
// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

import type { User } from './types.ts';
import { api } from './api.ts';
import { fetchChallenges } from './store/challenges.ts';
import { fetchAchievements } from './store/achievements.ts';
import { fetchFriends } from './store/friends.ts';

// Import all components
import Navbar from './components/Navbar.tsx';
import Toast from './components/Toast.tsx';

// Import all pages
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';
import Challenges from './pages/Challenges.tsx';
import Leaderboard from './pages/Leaderboard.tsx';
import Achievements from './pages/Achievements.tsx';
import Learn from './pages/Learn.tsx';
import Community from './pages/Community.tsx';
import Settings from './pages/Settings.tsx';

export default {
  components: {
    Navbar,
    Toast,
    Login,
    Profile,
    Challenges,
    Leaderboard,
    Achievements,
    Learn,
    Community,
    Settings,
  },
  setup() {
    const { ref, computed, onMounted, onUnmounted, watch } = Vue;

    // State
    const isAuthenticated = ref(false);
    // FIX: Use type assertion on the value passed to `ref` to avoid providing a type argument to an untyped function.
    const user = ref(null as User | null);
    const currentPath = ref(window.location.hash.slice(1) || 'login');
    const toasts = ref([]);
    let toastId = 0;
    
    // Watch for login/logout to pre-fetch data
    watch(isAuthenticated, (isAuth) => {
        if (isAuth) {
            // Pre-fetch data that is used across multiple pages
            fetchChallenges();
            fetchAchievements();
        }
    });

    // Computed property to render the current page
    const currentPageComponent = computed(() => {
      if (!isAuthenticated.value) {
        return 'Login';
      }
      switch (currentPath.value) {
        case 'profile': return 'Profile';
        case 'challenges': return 'Challenges';
        case 'leaderboard': return 'Leaderboard';
        case 'achievements': return 'Achievements';
        case 'learn': return 'Learn';
        case 'community': return 'Community';
        case 'settings': return 'Settings';
        default: return 'Profile';
      }
    });

    const handleHashChange = () => {
      currentPath.value = window.location.hash.slice(1) || (isAuthenticated.value ? 'profile' : 'login');
    };

    const addToast = (message: string, type: 'success' | 'error' = 'success') => {
        const id = toastId++;
        toasts.value.push({ id, message, type });
        setTimeout(() => removeToast(id), 5000);
    };

    const removeToast = (id: number) => {
        toasts.value = toasts.value.filter(t => t.id !== id);
    };

    // Methods
    const handleLogin = async () => {
      try {
        const userData = await api.login('demo@ecoquest.com', 'password');
        user.value = userData;
        isAuthenticated.value = true;
        window.location.hash = '#profile';
        handleHashChange();
        addToast(`¡Bienvenido de nuevo, ${user.value.name}!`);
      } catch (error) {
        console.error("Login failed:", error);
        addToast("Hubo un error al iniciar sesión.", "error");
      }
    };

    const handleLogout = () => {
      user.value = null;
      isAuthenticated.value = false;
      window.location.hash = '#login';
      handleHashChange();
    };

    const handleCompleteChallenge = async ({ challengeId, points }) => {
        if (!user.value || user.value.completedChallenges.includes(challengeId)) return;
        
        try {
            const result = await api.completeChallenge({ challengeId, points });
            user.value = result.user; // Update user with state from server
            // The server sends back specific notifications based on the outcome
            result.notifications.forEach(notification => {
                // We show the first one as primary, and others might appear if logic allows
                // For now, let's show all of them.
                addToast(notification, 'success');
            });
            // Force a refresh of achievements data in the store
            fetchAchievements(true);
        } catch (error) {
            console.error("Failed to complete challenge:", error);
            addToast("Hubo un error al completar el reto.", "error");
        }
    };
    
    const handleSaveSettings = async (settingsData) => {
        try {
            const updatedUser = await api.saveSettings(settingsData);
            user.value = updatedUser;
            addToast('¡Ajustes guardados con éxito!');
        } catch (error) {
            console.error("Failed to save settings:", error);
            addToast('Hubo un error al guardar los ajustes.', 'error');
        }
    };
    
    const handleRemoveFriend = async (friendId: string) => {
        try {
            const updatedUser = await api.removeFriend(friendId);
            user.value = updatedUser;
            fetchFriends(true); // Force refresh friends list in the store
            addToast('Amigo eliminado con éxito.');
        } catch (error) {
            console.error("Failed to remove friend:", error);
            addToast('Hubo un error al eliminar al amigo.', 'error');
        }
    };


    // Lifecycle hooks
    onMounted(() => {
      window.addEventListener('hashchange', handleHashChange);
      handleHashChange();
    });

    onUnmounted(() => {
      window.removeEventListener('hashchange', handleHashChange);
    });
    
    return {
      isAuthenticated,
      user,
      currentPageComponent,
      currentPath,
      toasts,
      handleLogin,
      handleLogout,
      handleCompleteChallenge,
      handleSaveSettings,
      handleRemoveFriend,
      removeToast,
    };
  },
  template: `
    <div class="font-sans">
        <!-- Authenticated View -->
        <div v-if="isAuthenticated && user" class="bg-eco-bg min-h-screen text-eco-text">
            <navbar 
                :current-page="currentPath" 
                :user="user"
                @logout="handleLogout"
            />
            
            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <component 
                    :is="currentPageComponent" 
                    :user="user"
                    :current-user="user"
                    @complete-challenge="handleCompleteChallenge"
                    @save-settings="handleSaveSettings"
                    @remove-friend="handleRemoveFriend"
                />
            </main>
        </div>

        <!-- Unauthenticated View (Login Page) -->
        <component 
            v-else
            :is="currentPageComponent" 
            @login="handleLogin"
        />
        
        <!-- Toast Container (Global) -->
        <div class="fixed bottom-5 right-5 w-full max-w-xs space-y-3 z-[100]">
            <transition-group
                name="toast-fade"
                tag="div"
            >
                 <Toast 
                    v-for="toast in toasts" 
                    :key="toast.id" 
                    :message="toast.message"
                    :type="toast.type"
                    @remove="removeToast(toast.id)"
                />
            </transition-group>
        </div>
    </div>
    <style>
        .toast-fade-enter-active,
        .toast-fade-leave-active {
            transition: all 0.5s ease;
        }
        .toast-fade-enter-from,
        .toast-fade-leave-to {
            opacity: 0;
            transform: translateX(30px);
        }
    </style>
  `
};