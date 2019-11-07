/**
 *  created on 2019-11-04.
 *  author litao
 */

import Vue from 'vue';
import App from '@src/App.vue';
import createRouter from '@route';
import createStore from '@store';
import {UPD_STATE} from '@store/constTypes';


export default function createApp() {
    const router = createRouter();
    const store = createStore();
    if (window.context) {
        store.commit(UPD_STATE, window.context.state);
    }
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

// createApp;
