<template>
  <div class="loader">Loading...</div>
</template>

<script>
import axios from 'axios'
import { Endpoint } from '../enum'

export default {
    name: 'Login',
    data() {
      return {
        code: null,
      }
    },
    mounted() {
      this.code = this.$route.query.code;
      this.getToken();
    },
    methods: {
      getToken() {
        axios.get(`${Endpoint.URL}/oauth/github/login?code=${this.code}`)
          .then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('refreshToken', res.data.refresh_token);
            localStorage.setItem('nickname', res.data.nickname);
            window.location.replace('/private');
          })
          .catch((err) => {
            alert("로그인 실패");
            window.location.replace('/')
          });
      }
    }
}
</script>

<style scoped>
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(24,139,244, 0.2);
  border-right: 1.1em solid rgba(24,139,244, 0.2);
  border-bottom: 1.1em solid rgba(24,139,244, 0.2);
  border-left: 1.1em solid #188bf4;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>