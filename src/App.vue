<template>
  <div id="app">
    <Header />
    <Section />
    <Footer />
    <div v-if="$store.state.token">
      <router-link to="/write" class="write-btn"></router-link>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Section from './components/Section.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    Section,
    Footer,
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  background-color: #ededed;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.write-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 35px;
  height: 35px;
  background: url(./assets/write-icon.svg) no-repeat;
  background-size: cover;
}
</style>