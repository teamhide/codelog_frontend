<template>
  <div class="search-container">
    <input v-model="keyword" v-on:keyup.enter="searchFeeds" type="text" class="search-bar" placeholder="검색어를 입력하세요."/>
    <FeedDetail :feeds="feeds"></FeedDetail>
    <div v-if="this.feeds.length == 0 && this.isRemain == false" class="search-result">검색 결과가 없습니다.</div>
    <div v-if="this.isRemain == true && this.prev" class="load-feed">
      <a v-on:click="loadMore">Load more</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FeedDetail from './FeedDetail.vue'
import { Endpoint } from '../enum'

export default {
  name: 'Search',
  components: {
    'FeedDetail': FeedDetail,
  },
  data() {
    return {
      feeds: [],
      keyword: '',
      prev: null,
      isRemain: false,
    }
  },
  methods: {
    async getFeeds() {
      var url = `${Endpoint.URL}/api/feeds/search?keyword=${this.keyword}`
      let data;

      if (this.prev) {
        url += '&prev=' + this.prev
      }

      await axios.get(url, this.$store.getters.getToken && {
          headers: { Authorization: 'Bearer '+ this.$store.getters.getToken }
        })
        .then((res) => {
          data = res.data;
        })

      return data;
    },
    async searchFeeds() {
      this.prev = null;
      this.isRemain = false;

      if (this.keyword.length <= 1) {
        alert("검색어는 2글자 이상이어야 합니다.");
        return
      }

      this.feeds = await this.getFeeds();
      if (this.feeds.length == 0) {
        this.isRemain = false;
        return
      }

      this.prev = this.feeds[this.feeds.length - 1].id;
      if (this.feeds && this.feeds.length > 10) {
        this.isRemain = true;
      }
    },
    async loadMore() {
      var feeds = await this.getFeeds();

      if (feeds.length > 0) {
        feeds.forEach((value, index) => {
          this.feeds.push(value);
        })
        this.isRemain = feeds.length > 12 ? true : false;
      } else {
        this.isRemain = false;
        this.prev = null;
      }
    }
  }
}
</script>

<style scoped>
.search-container {
  display: grid;
  justify-items: center;
}
.search-bar {
  height: 50px;
  border: none;
  padding: 10px;
  font-size: 20px;
  border-radius: 20px;
  width: 90%;
  max-width: 960px;
}
.search-result {
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 100;
}
.load-feed {
  margin-top: 15px;
  text-align: center;
}
.load-feed a {
  text-decoration: none;
  color: black;
  border: 1px solid lightgray;
  padding: 10px;
  border-radius: 15px;
}
.load-feed a:hover {
  background-color: #6196ff;
  color: white;
}
</style>