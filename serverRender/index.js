/**
 *  created on 2019-10-31.
 *  author litao
 */

import Vue from 'vue';
import createServerApp from './app';
import {createAxiosInstance} from "@lib/uitls";

Vue.prototype.$axios = createAxiosInstance(true);

export default (context) => {
    return new Promise((resolve, reject) => {
        const {app, router, store} = createServerApp();
        router.push(context.url);//导航跳转
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({code: 404, msg: "page not found!"})
            }
            const promises = [];
            matchedComponents.map(component => {
                if(component.fetchData){
                    const promise = new Promise((resolve, reject) => {
                        component.fetchData({store, router}).then(resolve);
                    }).catch(resolve);
                    promises.push(promise);
                }
            });
            Promise.all(promises).then(() => {
                context.state = store.state;
                resolve(app);
            })
            // Promise 应该 resolve 应用程序实例，以便它可以渲染
            //resolve(app)
        }, reject => (reject({code: 500, msg: "server internal error!"})))
    });
}
