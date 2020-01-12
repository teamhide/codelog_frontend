<template>
  <div class="write-container">
    <div class="post-url">
      <textarea id="post-url" v-model="url" placeholder="http://" rows="5"/>
    </div>
    <div class="post-tags">
      <input id="post-tags" v-model="tags" type="text" placeholder="#Python (Optional, Maximum 3)" />
    </div>
    <div class="post-switch">
      <label class="container">Private
        <input type="checkbox" checked="checked">
        <span v-on:click="checkPrivate" class="checkmark"></span>
      </label>
    </div>
    <div v-on:click="write" class="post-write" id="post-write">
      POST
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Endpoint } from '../enum'

export default {
  name: 'Write',
  data() {
    return {
      url: '',
      tags: '',
      isPrivate: true,
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
  methods: {
    checkPrivate() {
      this.isPrivate = !this.isPrivate;
      console.log(this.isPrivate);
    },
    lockInput(flag) {
      document.getElementById("post-url").disabled = flag;
      document.getElementById("post-tags").disabled = flag;
      if (flag === true) {
        document.getElementById("post-write").style.pointerEvents = 'auto';
      } else {
        document.getElementById("post-write").style.pointerEvents = 'none';
      }
    },
    write() {
      if (this.url.length == 0 && this.tags.length == 0) {
        alert('URL/Tag를 입력해주세요.');
        return
      } else if (this.url.length < 10) {
        alert('유효한 URL을 입력해주세요.');
        return
      } else if (!this.url.startsWith('http://') && !this.url.startsWith('https://')) {
        alert('http:// 또는 https://로 시작하는 주소를 입력해주세요.');
        return
      }
      this.lockInput(true);

      var params = new URLSearchParams();
      params.append('url', this.url);
      params.append('tags', this.tags);
      params.append('is_private', this.isPrivate);

      axios.post(`${Endpoint.URL}/api/feeds/`, params, {
        headers: { Authorization: 'Bearer '+ this.$store.getters.getToken }
      })
      .then(() => {
        window.location.replace('/');
      })
      .catch(() => {
        this.lockInput(false);
        alert('글쓰기 실패');
        window.location.replace('/');
      });
    }
  }
}
</script>

<style scoped>
.write-container {
  display: grid;
  justify-items: center;
  align-items: center;
}
.post-url {
  display: grid;
  justify-items: center;
  width: 100%;
}
.post-tags {
  display: grid;
  justify-items: center;
  width: 100%;
}
.post-url textarea {
  border: none;
  font-size: 20px;
  padding: 8px;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  margin-bottom: 20px;
  resize: none;
  border-radius: 10px;
  font-weight: 200;
}
.post-tags input {
  border: none;
  font-size: 20px;
  width: 100%;
  max-width: 800px;
  padding: 8px;
  border-radius: 10px;
  font-weight: 200;
}
.post-write {
  display: grid;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  padding: 8px;
  background-color: #6196ff;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 10px;
  text-align: center;
  font-size: 22px;
  pointer-events: auto;
}
.post-switch {
  display: grid;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  padding: 8px;
}
/* The container */
.container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 2px;
  left: 80px;
  height: 25px;
  width: 25px;
  background-color: #d1d1d1;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>