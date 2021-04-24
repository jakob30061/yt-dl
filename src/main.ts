import { createApp } from 'vue'
import App from './App.vue'

//Plugins
import router from './router';
import store from './store';
import i18n from './_locales'

import '@/assets/styles/theme.scss'; //own theme and stylex

// -----------------------------------------
const app = createApp(App)
  .use(store)
  .use(router)
  .use(i18n);

//costume directives
app.directive('focus', { 
    mounted(el) {
        el.focus();
    } 
});

router.isReady().then(() => {
    app.mount('#app'); // mount app
});