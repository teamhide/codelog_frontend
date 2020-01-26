<template>
  <div class="feed-container">
    <div class="feed" v-for="feed in feeds" v-bind:key="feed.id">
      <div class="feed-top">
        <div class="feed-top-left">
          <div class="feed-writer">
            <a :href="'https://github.com/'+feed.nickname+''" target="_blank">{{ feed.nickname }}</a>
          </div>
          <div class="feed-date">
            {{ feed.created_at }}
          </div>
        </div>
        <div v-if="feed.nickname !== null && $store.state.nickname == feed.nickname" class="feed-top-right">
          <div class="feed-top-btn" v-on:click="deleteFeed(feed.id)"></div>
        </div>
      </div>
      <div class="feed-image">
        <template v-if="feed.image !== null">
          <a :href="''+feed.url+''" target="_blank"><img :src="''+feed.image+''" width="100%" height="100%" style="background-size: cover; background-position: center;" /></a>
        </template>
        <template v-else>
          <a :href="''+feed.url+''" target="_blank"><img src="../assets/no-image.jpg" width="100%" height="100%" style="background-size: cover; background-position: center;" /></a>
        </template>
      </div>
      <div class="feed-body">
        <a :href="''+feed.url+''" target="_blank">
          <div class="feed-title">
            {{ feed.title }}
          </div>
          <div class="feed-description">
            {{
              feed.description !== null ?
              getBufferSize(feed.description) < 21 ? feed.description : feed.description.substr(0, 21) + "..." :
              "No description"
            }}
          </div>
          <div class="feed-url">
            <a :href="''+feed.url+''" target="_blank">{{ getBufferSize(feed.url) < 32 ? feed.url : feed.url.substr(0, 32) + "..." }}</a>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { Endpoint } from '../enum'
import axios from 'axios'

export default {
    name: 'FeedDetail',
    props: {
        feeds: Array
    },
    methods: {
      getBufferSize(str) {
        var b = str.match("/[^\x00-\xff]/g");
        return (str.length + (!b ? 0: b.length)); 
      },
      deleteFeed(feedId) {
        axios.delete(`${Endpoint.URL}/api/feeds/${feedId}`, {
          headers: { Authorization: 'Bearer '+ this.$store.getters.getToken }
        })
        .then(() => {
          for (var i = 0; i < this.feeds.length - 1; i++) {
            if (this.feeds[i].id == feedId) {
              this.feeds.splice(i, 1);
            }
          }
        })
        .catch(() => {
          alert('피드 삭제 실패');
        });
      }
    }
}
</script>

<style scoped>
.feed-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.feed {
  width: 250px;
  margin: 10px;
  background-color: white;
  border-radius: 5px;
  transition-duration: 0.3s;
}
.feed:hover {
  -webkit-transform: scale(1.05);
  -ms-transform: scale(1.05);
  transform: scale(1.05);
}
.feed-top {
  display: grid;
  grid-template-columns: auto 20px;
  padding: 10px;
}
.feed-top-right {
  display: grid;
  justify-items: center;
}
.feed-top-btn {
  height: 15px;
  width: 15px;
  background: url("../assets/trash-icon.svg") no-repeat;
  background-size: cover;
  background-position: center;
  border: none;
  cursor: pointer;
}
.feed-writer {
  display: grid;
  align-items: center;
  font-weight: 600;
}
.feed-writer a {
  text-decoration: none;
  color: black;
}
.feed-date {
  display: grid;
  align-items: center;
  font-size: 13px;
  color: #878787;
}
.feed-image {
  width: 250px;
  height: 150px;
}
.feed-description {
  font-size: 14px;
  color: #878787;
}
.feed-url {
  font-size: 13px;
}
.feed-url a {
  text-decoration: none;
}
.feed-body {
  padding: 10px;
}
.feed-body a {
  text-decoration: none;
  color: black;
}
.feed-url a {
  text-decoration: none;
  color: blue;
}
@media screen and (max-width: 510px){
  .feed-container {
    display: grid;
    margin: 0px;
    padding: 0px;
  }
  .feed{
    width: 100%;
    margin: 0px;
    margin-bottom: 10px;
    display: grid;
    grid-template-areas:
      "feed-top feed-top"
      "feed-body feed-image";
    grid-template-columns: 80% 20%;
  }
  .feed-top {
    grid-area: feed-top;
  }
  .feed-writer {
    font-size: 14px;
  }
  .feed-date {
    font-size: 12px;
  }
  .feed-image {
    width: 100%;
    height: 80px;
    grid-area: feed-image;
  }
  .feed-body {
    grid-area: feed-body;
  }
  .feed-top-btn {
    height: 15px;
    width: 15px;
  }
  .feed-title {
    font-size: 14px;
  }
  .feed-description {
    font-size: 12px;
  }
  .feed-url {
    display: none;
  }
}
</style>