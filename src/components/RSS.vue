<template>
  <div>
    <RSSDetail :rss="recentRss" :getRss="getRss" />
  </div>
</template>

<script>
import axios from 'axios'
import RSSDetail from './RSSDetail.vue'

export default {
  name: 'RSS',
  components: {
    'RSSDetail': RSSDetail,
  },
  data() {
    return {
      rssList: {
        'woowaBros': 'http://woowabros.github.io/feed.xml',
        'amazon': 'https://aws.amazon.com/ko/blogs/korea/feed/'
      },
      recentRss: [1, 2],
      woowaBrosRss: [],
      amazonRss: [],
    }
  },
  methods: {
    getRss(url) {
      axios.get(url)
      .then((res) => {
        console.log(res.data);
      })
    }
  }
}
</script>
