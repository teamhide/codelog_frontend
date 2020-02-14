<template>
  <div class="rss-container">
    <div v-for="each in rss" v-bind:key="each" class="rss" v-on:click='this.getRss()'>
      <div class="rss-header">
        우아한형제들 기술블로그
      </div>
      <div class="rss-body">
        <div class="rss-body-header">
          <a href="#">NAVER Tech Talk: UIT 개발 밋업(2019년 11월)</a>
        </div>
        <div class="rss-body-content">
          <span>NAVER에서는 다양한 기술에 대한 테크톡을 주기적으로 진행하고 있는데요. 2019년 11월에 진행한 사내 UIT 개발 밋업 중 발표자의 공개 동의를 얻은 발표 …</span>
        </div>
        <div class="rss-body-date">
          2020-01-01 12:12:12
        </div>
        <div class="divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RSSDetail',
  props: {
      rss: Array,
      getRss: {
        type: Function,
      }
  },
}
</script>

<style scoped>
.rss-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);
  justify-content: center;
  grid-gap: 10px;
}
.rss {
  background-color: white;
  border-radius: 5px;
}
.rss-header {
  background-color: #f5f5f5;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
}
.rss-body {
  font-size: 13px;
  height: 150px;
  overflow: auto;
}
.rss-body-header {
  padding-left: 10px;
  padding-top: 5px;
  padding-right: 10px;
}
.rss-body-header a {
  text-decoration: none;
  color: #497B77;
  font-weight: 700;
}
.rss-body-header a:hover {
  color: #355956;
}
.rss-body-content {
  padding: 10px;
  padding-bottom: 5px;
}
.rss-body-date {
  padding-left: 10px;
  font-size: 12px;
  color: #878787;
  padding-bottom: 5px;
}
.divider {
  border-bottom: 1px solid lightgray;
}
</style>