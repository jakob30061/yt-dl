<template>
  <div id="overlay">
    <div id="setVideo" :class="{ expanded }">
      <div id="pasteURL">
        <input placeholder="paste YouTube URL or ID" v-model="url" @input="fetchData" v-focus>
      </div>
      <div id="fetchVideo" v-show="expanded">
        <div class="loading-cricle">
          <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import axios from 'axios';
import { useOnline } from '@vueuse/core'

import { ytAPI } from '../../keys'

//interfaces
import { State } from '../assets/database/state'

export default defineComponent({
  name: "URL-Overlay",
  emits: ['fetchedData'],

  data() {
    return {
      url: '',
      expanded: false
    }
  },

  methods: {
    async fetchData() {
      try {
        this.expanded = true;

        let id: string; 
        if(this.url.includes("watch?v=")){
          id = this.url.slice(this.url.indexOf("watch?v=") + 8, this.url.indexOf("watch?v=") + 19);
        }else {
          id = this.url;
        }

        const videoAPI = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${ytAPI}`;
        const videoData = await (await axios.get(videoAPI)).data.items[0];
        const channelAPI = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${videoData.snippet.channelId}&key=${ytAPI}`;
        const channelData = await (await axios.get(channelAPI)).data.items[0];
        const arr = videoData.snippet.title.split(" - ") as Array<string>;
        
        const video:State = {
          downloadData: {
            file_name: videoData.snippet.title,
            artist: (arr[0] != undefined ? arr[0] : videoData.snippet.title),
            title: (arr[1] != undefined  ? arr[1] : videoData.snippet.title),

            year: videoData.snippet.publishedAt.slice(0, 4),
            format: {
              audio: true,
              video: false
            },
            codec: '_default',
            codecQuality: '_default',
            cover: '_default',
            In: 0,
            Out: 300,
            lyrics: ''
          },
          staticData: {
            url: `https://www.youtube.com/watch?v=${videoData.id}`,
            uploadInfo: `${videoData.snippet.publishedAt.slice(8, 10)}.${videoData.snippet.publishedAt.slice(5, 7)}.${videoData.snippet.publishedAt.slice(0, 4)}`,
            id: videoData.id,
            duration: '',
            durationInSek: 725,
            resolution: videoData.contentDetails.definition,
            
            channelData: {
              channel_img: channelData.snippet.thumbnails.default.url,
              channel_link: `https://www.youtube.com/channel/${ channelData.id}`,
              channel_name: channelData.snippet.title,
            },
            thumbnails: videoData.snippet.thumbnails
          },
          processingData: {
            dateAdded: new Date()
          }
        }

        this.$emit('fetchedData', video);
      } catch (error) {
        this.expanded = false;
        console.log(error);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import '../assets/styles/mixins';

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
        @include input;
        width: 80%;
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