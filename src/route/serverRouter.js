/**
 *  created on 2019-10-31.
 *  author litao
 */
import Vue from 'vue';
import Router, {Route} from 'vue-router';

import Home from '@pages/home/index.vue';
import NewsList from '@pages/newsList/index.vue';
// const Home = () => import('@pages/home/index.vue');
// const NewsList = () => import('@pages/newsList/index.vue');

Vue.use(Router);

const routes = [{
    path: '/',
    exact: true,
    component: Home
}, {
    path: '/newsList',
    component: NewsList
}];
export default function createRouter() {
    return new Router({
        mode: 'history',
        routes
    });
}
