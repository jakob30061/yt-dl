<template>
  <div id="overlay">
    <div id="setVideo" :class="{ expanded }">
      <div id="pasteURL">
        <input placeholder="paste YouTube URL or ID" v-model="url" @input="fetchData">
      </div>
      <div id="fetchVideo">
        <div class="loading-cricle">
          <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ytAPI } from '../../keys'

export default {
  name: "URL-Overlay",
  emits: ['fetchedData'],

  data() {
    return {
      url: 'https://www.youtube.com/watch?v=PRqiUgXHCWA',
      expanded: true
    }
  },

  methods: {
    async fetchData() {
      try {
        if(this.url.includes("watch?v=")){
          this.expanded = true;

          const id = this.url.slice(this.url.indexOf("watch?v=") + 8, this.url.indexOf("watch?v=") + 19);

          const videoAPI = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${ytAPI}`;
          const data = await (await axios.get(videoAPI)).data.items[0].snippet;
          console.log(data);
          this.$emit('fetchedData', data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#overlay {
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0 , 0, 0.8);

    #setVideo {
      width: 40%;
      height: 50px;
      background-color: var(--bg);

      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      transition: height 0.22s ease-in-out;

        &.expanded {
          height: 50vh;
        }
    }

    #pasteURL {
      display: flex;
      justify-content: center;
      margin: 10px 0 35px 0;

      input {
        width: 80%;

        background: none;
        border: 0;
        outline: none;

        text-align: center;
        color: var(--text, #ffffff);
        border-bottom: 1px solid rgb(255, 255, 255, 0.3);
        padding-bottom: 8px;
      }
    }

    #fetchVideo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80%;
    }
}

//-------------------------------------------------------
.loading-cricle {
  svg {
    width: 3.75em;
    transform-origin: center;
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: #fc2f70;
    stroke-width: 3;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}
</style>