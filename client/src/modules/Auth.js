import router from '@/router';
import axios from 'axios';
//import router from '../router'
const state     = {
token: localStorage.getItem('token') || '',
user:{},
status:''
};
const getters   = {
// isLoggedIn: function (state){
//     if(state.token !== ''){
//         return true
//     } else {
//         return false
//     }
// }
isLoggedIn: state => !!state.token,
authState : state => state.status,
user: state => state.user
};
const actions   = {
    //LOGIN
    async login ({
        commit
    }, user){
        commit('auth_request');
        let res = await axios.post('http://localhost:3000/login', user)
        if (res.data.success){
            const token = res.data.token;
            const user =res.data.user;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] =token;
            commit('auth_success', token, user);
        }
        return res;
    },
    //REGISTER
    async register({ commit }, userData){
        commit('register_request');
        let res = await axios.post('http://localhost:3000/register', userData);
        if(res.data.success !== undefined){
            commit('register_success')
        }
        return res;
    },
    //GET PROFILE
    async getProfile ({ commit }) {
        commit('profile_request')
        let res = await axios.get('http://localhost:3000/profile')
        commit('user_profile', res.data.user )
        return res;
    },
    //LOGOUT
    async logout({ commit }) {
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return

    }

};
const mutations = {
    auth_request(state){
        state.status = 'loading'
    },
    auth_success(state, token, user){
        state.token = token,
        state.user = user,
        state.status = 'success'
    },
    register_request(state) {
        state.status = 'loading'
    },
    register_success(state) {
        state.status = 'success'
    },
    logout(state) {
        state.status = ''
        state.token= ''
        state.user = ''
    },
    profile_request(state){
        state.status='loading'
    },
    user_profile(state, user){
        state.user = user
    }
};
export default {
    state,
    actions,
    getters,
    mutations
}