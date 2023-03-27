import Vue from 'vue';
import App from './App.vue';
import router from './router';
import * as vueResource from 'vue-resource';
import * as VeeValidate from 'vee-validate';
import VueFilterDateFormat from 'vue-filter-date-format';
import * as moment from 'vue-moment'
import ToggleButton from 'vue-js-toggle-button'
import * as axios from 'axios'
import * as VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(VeeValidate)
Vue.use(VueFilterDateFormat);
Vue.use(ToggleButton);
Vue.use(VueAxios, axios);
Vue.use(moment)

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')