<template>
  <header>
    <div class="header-top">
      <div class="header-top-left">
        <router-link to="/search" class="search-icon"></router-link>
      </div>
      <div class="header-top-center">
        <router-link to="/">Codelog</router-link>
      </div>
      <div v-if="!$store.state.token" class="header-top-right">
        <img v-on:click="getCode" src="../assets/login-icon.png" width="32" height="32" />
      </div>
      <div v-else class="header-top-right">
        <img v-on:click="logOut" src="../assets/logout-icon.svg" width="28" height="25" />
      </div>
    </div>
    <div class="header-bottom">
      <div class="header-bottom-left">
        <router-link to="/private">Private</router-link>
      </div>
      <div class="header-bottom-right">
        <router-link to="/">All</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { Endpoint } from '../enum'

export default {
  name: 'Header',
  methods: {
    getCode() {
      window.location.replace(`https://github.com/login/oauth/authorize?client_id=86eb568f5e9a72afbe01&redirect_uri=http://codelog.kr/login&scope=read:user`)
    },
    logOut() {
      this.$store.commit('deleteToken');
      this.$store.commit('deleteRefreshToken');
      this.$store.commit('deleteNickname');
      window.location.replace('/');
    }
  }
}
</script>

<style scoped>
header {
  height: 100px;
  background-color: #6196ff;
  display: grid;
  grid-template-rows: auto auto;
}
.header-top {
  display: grid;
  grid-template-columns: auto auto auto;
  border-bottom: 0.5px solid #94b8ff;
}
.header-bottom {
  display: grid;
  grid-template-columns: auto auto;
}
.header-top-left {
  display: grid;
  justify-content: flex-start;
  align-content: center;
  padding-left: 20px;
}
.header-top-left a {
  color: white;
  text-decoration: none;
}
.header-top-center {
  display: grid;
  justify-content: center;
  align-items: center;
}
.header-top-center a {
  color: white;
  text-decoration: none;
  font-size: 25px;
}
.header-top-right {
  display: grid;
  justify-content: flex-end;
  align-content: center;
  padding-right: 20px;
}
.header-top-right img {
  cursor: pointer;
}
.header-top-right a {
  color: white;
  text-decoration: none;
}
.header-bottom-left, .header-bottom-right {
  display: grid;
  justify-content: center;
  align-items: center;
}
.header-bottom a {
  color: white;
  text-decoration: none;
}
.search-icon {
  width: 20px;
  height: 20px;
  background: url(../assets/search-icon.svg) no-repeat;
  background-size: cover;
  display: inline-block;
}
</style>