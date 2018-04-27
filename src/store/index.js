/**
 * @file store
 * @author wangxingzhuo<wangxingzhuo@baidu.com>
 */

import Vue from 'vue';
import Vuex from 'vuex';
import * as data from '../data';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        msg: ''
    },
    actions: {
        helloWorld({state, dispatch, commit}, params) {
            data.helloWorld(params)
                .then(res => {
                    commit('msg', res.msg);
                })
                .catch(err => {
                    commit('msg', err.message);
                });
        }
    },
    mutations: {
        msg(state, payload) {
            state.msg = payload;
        }
    },
    modules: {}
});
