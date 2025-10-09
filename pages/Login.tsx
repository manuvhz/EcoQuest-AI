export default {
  emits: ['login'],
  template: `
    <div class="min-h-screen bg-eco-green-dark flex flex-col items-center justify-center p-4 animate-fade-in">
      <div class="w-full max-w-md">
        <div class="bg-white rounded-2xl shadow-2xl p-8 text-center animate-slide-in-up">
          <div class="mb-6">
             <span class="text-6xl">🌿</span>
             <h1 class="text-4xl font-bold text-eco-green-dark mt-2">EcoQuest</h1>
             <p class="text-gray-500 mt-2">Tu aventura ecológica comienza aquí.</p>
          </div>

          <form @submit.prevent="$emit('login')">
            <div class="space-y-4">
              <div>
                <input 
                  type="email" 
                  placeholder="Correo electrónico" 
                  value="demo@ecoquest.com"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-eco-green"
                  readonly
                />
              </div>
              <div>
                <input 
                  type="password" 
                  placeholder="Contraseña" 
                  value="password"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-eco-green"
                  readonly
                />
              </div>
            </div>
            <button
              type="submit"
              class="w-full bg-eco-green text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-eco-green-dark transition-transform transform hover:scale-105 duration-300"
            >
              Iniciar Sesión
            </button>
          </form>

          <p class="text-sm text-gray-400 mt-6">
            ¿No tienes cuenta? <a href="#" class="font-semibold text-eco-green hover:underline">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  `
};
