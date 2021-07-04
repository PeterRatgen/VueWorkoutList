import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faPlus);
library.add(faEllipsisV);


createApp(App)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .mount('#app')
