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
  name: 'PrivateFeed',
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
  created() {
    if (!this.$store.getters.getToken) {
      alert('로그인이 필요한 기능입니다.');
      history.back();
    }

    var params = new URLSearchParams();
    params.append('token', this.$store.getters.getToken);
    axios.post(`${Endpoint.URL}/oauth/verify_token`, params)
    .catch((err) => {
      this.$store.commit('deleteToken');
      this.$store.commit('deleteRefreshToken');
      this.$store.commit('deleteNickname');
      window.location.replace('/');
    });
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
      await axios.get(url, this.$store.getters.getToken && {
        headers: { Authorization: 'Bearer '+ this.$store.getters.getToken }
      })
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