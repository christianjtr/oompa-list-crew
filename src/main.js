import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import VueLocalStorage from 'vue-localstorage';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueLocalStorage);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
