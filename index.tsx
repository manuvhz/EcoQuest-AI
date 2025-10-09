import App from './App.tsx';

// FIX: Declare global Vue object provided by a script tag.
declare var Vue: any;

const { createApp } = Vue;

const app = createApp(App);
app.mount('#root');