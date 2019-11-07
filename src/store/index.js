/**
 *  created on 2019-10-31.
 *  author litao
 */
import Vue from 'vue';
import Vuex from 'vuex';
import {UPD_STATE} from '@store/constTypes'
import homeStore from '@pages/home/store';
import newsStore from '@pages/newsList/store';

Vue.use(Vuex);
const createStore = () => {
    return new Vuex.Store({
        mutations: {
            [UPD_STATE](state, payload) {
                console.log(state);
                for (var i in payload) {
                    state[i] = payload[i];
                }
            }
        },
        modules: {
            home: homeStore(),
            news: newsStore()
        }
    });
}
export default createStore;
