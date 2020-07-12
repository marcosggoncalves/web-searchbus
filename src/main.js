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
import MegaMenu from 'primevue/megamenu';
import Galleria from 'primevue/galleria';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Toolbar from 'primevue/toolbar';


Vue.use(ToastService);
Vue.use(VueSocialSharing);

Vue.directive('tooltip', Tooltip);

Vue.component('Toast', Toast);
Vue.component('Textarea', Textarea);
Vue.component('InputText', InputText);
Vue.component('Carousel', Carousel);
Vue.component('AutoComplete', AutoComplete);
Vue.component('Panel', Panel);
Vue.component('ProgressSpinner', ProgressSpinner);
Vue.component('Button', Button);
Vue.component('Listbox', Listbox);
Vue.component('Galleria', Galleria);
Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('ColumnGroup', ColumnGroup);
Vue.component('Dialog', Dialog);
Vue.component('Toolbar', Toolbar);
Vue.component('MegaMenu', MegaMenu);

Vue.config.productionTip = true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')