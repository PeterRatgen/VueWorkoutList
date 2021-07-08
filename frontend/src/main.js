import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faEllipsisV, faCheck, faMinus, faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import mitt from 'mitt';

const emitter = mitt();

library.add(faPlus);
library.add(faEllipsisV);
library.add(faCheck);
library.add(faMinus)
library.add(faPencilAlt)
library.add(faTrashAlt)

const app = createApp(App)

app.config.globalProperties.emitter = emitter;

app.use(router)
.component("fa", FontAwesomeIcon)
.mount('#app')
