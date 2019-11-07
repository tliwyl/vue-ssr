/**
 *  created on 2019-10-31.
 *  author litao
 */
import Vue from 'vue';
import {HOME_FETCH_DATA, HOME_UPD_INFO} from './constTypes';

export default () => {
    return {
        state: {
            title: '',
            section: "",
            loaded: false
        },
        mutations: {
            [HOME_UPD_INFO](state, payload) {
                state.title = payload.title;
                state.section = payload.section;
                state.loaded = true
            },
        },
        actions: {
            [HOME_FETCH_DATA](context, payload) {
                const axiosInstance = Vue.prototype.$axios;
                return axiosInstance.get('/api/home').then((res) => {
                    let data = res.data;
                    if (data.success) {
                        context.commit(HOME_UPD_INFO, data.data);
                    }
                }).catch(reason => console.log(reason));
            }
        }
    };
};
