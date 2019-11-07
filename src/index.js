/**
 *  created on 2019-10-30.
 *  author litao
 */

import Vue from 'vue';
import createApp from './app';
import {createAxiosInstance} from "@lib/uitls";

Vue.prototype.$axios = createAxiosInstance();
const {app, router} = createApp();
app.$mount('#app');
console.log(app.$router);
/*router.onReady(()=>{

});*/

