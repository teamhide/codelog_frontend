<template>
  <div>
    <FeedDetail :feeds="feeds"></FeedDetail>
    <div v-if="this.isRemain" class="load-feed">
      <a v-on:click="loadMore">Load more</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FeedDetail from './FeedDetail.vue'
import { Endpoint } from '../enum'

export default {
  name: 'Feed',
  components: {
    'FeedDetail': FeedDetail,
  },
  data() {
    return {
      feeds: null,
      prev: null,
      isRemain: false,
    }
  },
  async mounted() {
    this.feeds = await this.getFeeds();

    if (this.feeds.length > 12) {
      this.isRemain = true;
    }
  },
  methods: {
    async getFeeds() {
      var url = `${Endpoint.URL}/api/feeds/`
      let data;

      if (this.prev) {
        url += '?prev=' + this.prev;
      }
      await axios.get(url)
      .then((res) => {
        data = res.data;
      })
      .catch(() => {
      });

      return data;
    },
    async loadMore() {
      this.prev = this.feeds[this.feeds.length - 1].id
      var data = await this.getFeeds();

      if (data.length > 0) {
        data.forEach((value, index) => {
          this.feeds.push(value);
        })
        this.isRemain = data.length > 10 ? true : false;
      } else {
        this.isRemain = false;
      }
    }
  }
}
</script>

<style scoped>
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