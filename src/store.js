import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    nickname: localStorage.getItem('nickname'),
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getRefreshToken(state) {
      return state.refreshToken;
    },
    getNickname(state) {
      return state.nickname;
    },
  },
  mutations: {
    deleteToken(state) {
      localStorage.removeItem('token');
      state.token = null;
    },
    deleteRefreshToken(state) {
      localStorage.removeItem('refreshToken');
      state.refreshToken = null;
    },
    deleteNickname(state) {
      localStorage.removeItem('nickname');
      state.nickname = null;
    },
    setToken(state, token) {
      localStorage.setItem('token', token);
      state.token = token;
    },
    setRefreshToken(state, refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
      state.refreshToken = refreshToken;
    },
    setNickname(state, nickname) {
      localStorage.setItem('nickname', nickname);
      state.nickname = nickname;
    }
  },
})