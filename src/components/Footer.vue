<template>
  <footer>
    <div class="footer">
      <span>COPYRIGHT Hide, ALL RIGHT RESERVED</span>
      <router-link to="/about" class="about">About</router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid #d9d9d9;
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 100;
}
.about {
  display: grid;
  justify-items: center;
  font-weight: 600;
  text-decoration: none;
  color: #2971ff;
}
</style>