<template>
  <div class="tag-container">
    <div class="tag" v-for="tag in tags" v-bind:key="tag.id">
      <div class="tag-name">
        {{ tag.name }}
      </div>      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Endpoint } from '../enum'

export default {
  name: 'Tag',
  data() {
    return {
      tags: null,
    }
  },
  mounted() {
    this.getTags()
  },
  methods: {
    getTags() {
      axios.get(`${Endpoint.URL}/api/feeds/tags/`)
        .then((res) => {
          this.tags = res.data;
        })
        .catch((err) => {
          
        })
    }
  }
}
</script>

<style scoped>
.tag-container {
  display: flex;
  flex-wrap: wrap;
}
.tag {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto auto;
  background-color: white;
  border-radius: 10px;
  height: 30px;
  border: 1px solid lightgray;
  padding-left: 10px;
  padding-right: 10px;
  margin: 5px;
}
.tag:hover {
  border-color: #6196ff;
  color: #6196ff;
}
</style>