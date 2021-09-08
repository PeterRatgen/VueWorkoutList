import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faEllipsisV, faCheck, faMinus, faPencilAlt, faTrashAlt, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faPlus);
library.add(faEllipsisV);
library.add(faCheck);
library.add(faMinus);
library.add(faPencilAlt);
library.add(faTrashAlt);
library.add(faArrowLeft);

const app = createApp(App);

app.use(router)
.component("fa", FontAwesomeIcon)
.mount('#app');
