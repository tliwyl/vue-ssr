/**
 *  created on 2019-11-06.
 *  author litao
 */
import Vue from 'vue';
import App from '@src/App.vue';
import createServerRouter from '@route/serverRouter';
import createStore from '@store';
export default  function createServerApp() {
    const router = createServerRouter();
    const store = createStore();
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });

    return {
        app,
        router,
        store
    }
}
