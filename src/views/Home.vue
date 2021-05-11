<template>
  <div>
    <div class="row mainDiv">
      <div class="col-md-3">
        <p class="tagHeader">{{ $t("message.fileName").toUpperCase() + ':' }}</p>
        <input class="file_element" :value="fileName">

        <div style="position: relative">
          <p class="tagHeader">{{ $t("message.title").toUpperCase() + ':' }}</p>
          <input class="file_element" :value="title">
          <popover :visible="true"></popover>
        </div>

        <p class="tagHeader">{{ $t("message.artist").toUpperCase() + ':' }}</p>
        <input class="file_element" :value="artist">

        <p class="tagHeader">{{ $t("message.year").toUpperCase() + ':' }}</p>
        <input class="file_element" type="number" :value="year">

        <p class="tagHeader">{{ $t("message.genre").toUpperCase() + ':' }}</p>
        <input class="file_element" :value="genre">

        <p class="tagHeader">{{ $t("message.channel").toUpperCase() + ':' }}</p>
        <input class="file_element" :value="channel">

        <img id="file_channel_img" src="https://yt3.ggpht.com/a/AATXAJz1memzaKdtvRY4MNUDAXid9eo-7ye38M136_-n5Q=s88-c-k-c0xffffffff-no-rj-mo" alt="channel image"/>
      </div>
      
      <div class="col-md-9">
        <img v-if="!showVideo" @click="showVideo = !showVideo" id="thumbnail" :src="url" alt="Video thumbnail"/>
        <iframe
          v-else
          @click="showVideo = !showVideo"

          id="videoPlayer"
          src="https://www.youtube-nocookie.com/embed/PRqiUgXHCWA" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; gyroscope; picture-in-picture" 
          allowfullscreen="true">
        </iframe>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3" id="progressDiv">
        <p>{{ file_name }}</p>

        <div style="width: auto; height: 50px;" id="progressbar" data-preset="energy" class="ldBar label-center"></div>
        <p id="progressText">(1.02MB of 3.58MB)</p>
      </div>

      <div class="col-md-9" id="queue">
        <div>
          <h4 style="text-align: center;" id="fullProgress">100/300</h4>
          <img>
        </div>
      </div>
    </div>

    <img id="bg-cover" :style="{ backgroundImage: `url(${url})` }">

    <div id="overlay">
      <div id="setVideo" :class="{ expanded }">
        <div id="pasteURL">
          <input placeholder="paste YouTube URL or ID" v-model="url" @input="fetchData">
        </div>
        <div id="fetchVideo">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Popover from '@/components/Popover.vue'

import '@/assets/libs/loading-bar.min.css'
import '@/assets/libs/bootstrap-grid.min.css'
import '@/assets/libs/loading-bar.min.js'

import axios from 'axios';

import { ytAPI } from '../../keys'

export default defineComponent({
  name: "Home",
  components: { Popover },

  data() {
    return {
      url: 'https://www.youtube.com/watch?v=PRqiUgXHCWA',
      showVideo: false,
      expanded: false
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
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.mainDiv {
  margin-bottom: 25px;

    >div:first-of-type {
      background-color: rgb(64, 64, 64, 0.4);
      border-bottom-right-radius: 8px;
      border-bottom: 1.5px rgb(0, 0, 0, 0.25) solid;
      border-right: 1.5px rgb(0, 0, 0, 0.25) solid;
      padding: 20px 20px 0px 30px;

      position: relative;
    }
    
    >div:last-of-type {
      padding: 10px 0px 0px 30px;
    }
}

.tagHeader {
  font-weight: 600; 
  font-size: 16px; 
  margin: 1px;
  text-align: left;
}

.file_element {
  background: none;
  border: 0;
  outline: none;

  width: 100%;
  text-align: center;
  color: var(--text, #ffffff);
  border-bottom: 1px solid rgb(255, 255, 255, 0.3);
  padding-bottom: 5px;
  margin: 5px 0 35px 0;
}

#file_channel_img {
    border-radius: 50%;
    width: 3rem;
    margin-bottom: 10px;
}

//-------------------------------------------------------
#thumbnail {
  width: 94%;
  border-radius: 6px;
  border: 1.5px rgb(255, 255, 255, 0.2) solid;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.8);
}

#videoPlayer {
  width: 94%;
  height: 99%;
  border-radius: 6px;
}

//-------------------------------------------------------
#progressDiv {
  background-color: rgb(64, 64, 64, 0.4);
  border-radius: 0 8px 8px 0;
  border-bottom: 1.5px rgb(0, 0, 0, 0.25) solid;
  border-right: 1.5px rgb(0, 0, 0, 0.25) solid;
  border-top: 1.5px rgb(0, 0, 0, 0.25) solid;
  padding: 16px 0;

    p:first-of-type {
      padding: 0 10px;
      margin-bottom: 16px;
    }
}

#progressText {
  margin: 4px 0;
  padding: 0 10px;
}

//-------------------------------------------------------
#queue {
  padding-left: 30px;

  div:first-child {
    background-color: rgb(64, 64, 64, 0.4);
    border-radius: 8px 0px 0px 8px;
    border: 1.5px rgb(0, 0, 0, 0.25) solid;
    height: 100%;
    padding-top: 16px;
  }
}

//-------------------------------------------------------
#bg-cover {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  background-repeat: no-repeat;
  background-size: cover;
  
  filter: blur(5px) brightness(0.75);
  transform: scale(1.1);
  z-index: -1;
}

//------------------------------------------------
#overlay {
  position: absolute;
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

    #pasteURL input {
      width: 80%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      background: none;
      border: 0;
      outline: none;

      text-align: center;
      color: var(--text, #ffffff);
      border-bottom: 1px solid rgb(255, 255, 255, 0.3);
      padding-bottom: 8px;
      margin: 10px 0 35px 0;
    }

    #fetchVideo {
      height: 100%;
    }
}
</style>