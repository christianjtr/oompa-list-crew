import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/views/View.Oompa.Main';
import Detail from '@/components/views/View.Oompa.Detail';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/oompas',
      name: 'main',
      component: Main
    },
    {
      path: '/oompas/:id',
      name: 'detail',
      component: Detail
    },
    { path: '*', redirect: '/oompas' }
  ]
});
