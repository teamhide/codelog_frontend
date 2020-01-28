<template>
  <div>
    <RSSDetail :rss="rss" />
  </div>
</template>

<script>
import RSSDetail from './RSSDetail.vue'

export default {
  name: 'RSS',
  components: {
    'RSSDetail': RSSDetail,
  },
  data() {
    return {
      rss: [1, 2, 3, 4, 5],
    }
  },
}
</script>
