/**
 *  created on 2019-10-31.
 *  author litao
 */
import Vue from 'vue';
import Router, {Route} from 'vue-router';

const Home = () => import('@pages/home/index.vue');
const NewsList = () => import('@pages/newsList/index.vue');
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
