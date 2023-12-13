import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router configuration
import store from './store'; // Import the Vuex store configuration
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS
const vuetify = createVuetify({
  components,
  directives,
})
createApp(App).use(router).use(store).use(vuetify).mount('#app');
