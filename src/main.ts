import { createApp } from 'vue'
import App from './App.vue'

//Plugins
import router from './router';
import i18n from './_locales';

import '@/assets/styles/theme.scss'; //own theme and styles

// -----------------------------------------
const app = createApp(App)
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