import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import 'primeflex/primeflex.css';

import Carousel from 'primevue/carousel';
import AutoComplete from 'primevue/autocomplete';
import Panel from 'primevue/panel';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import Listbox from 'primevue/listbox';
import VueSocialSharing from 'vue-social-sharing';
import TabMenu from 'primevue/tabmenu';
import Galleria from 'primevue/galleria';
import Tooltip from 'primevue/tooltip';

Vue.directive('tooltip', Tooltip);

Vue.use(VueSocialSharing);

Vue.component('Carousel', Carousel);
Vue.component('AutoComplete', AutoComplete);
Vue.component('Panel', Panel);
Vue.component('ProgressSpinner', ProgressSpinner);
Vue.component('Button', Button);
Vue.component('Listbox', Listbox);
Vue.component('TabMenu', TabMenu);
Vue.component('Galleria', Galleria);

Vue.config.productionTip = true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')