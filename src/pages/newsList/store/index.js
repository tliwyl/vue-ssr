/**
 *  created on 2019-10-31.
 *  author litao
 */
import Vue from 'vue';
import {NEWS_UPD_LIST, NEWS_FETCH_DATA} from './constTypes';

export default () => {
    return {
        state: {
            list: [],
            loaded: false
        },
        mutations: {
            [NEWS_UPD_LIST](state, payload) {
                state.list = payload;
                state.loaded = true;
            },
        },
        actions: {
            [NEWS_FETCH_DATA](context, payload) {
                const axiosInstance = Vue.prototype.$axios;
                return axiosInstance.get('/api/news').then((res) => {
                    let data = res.data;
                    if (data.success) {
                        context.commit(NEWS_UPD_LIST, data.data)
                    }
                }).catch(reason => console.log(reason));
            }
        }
    };
};
