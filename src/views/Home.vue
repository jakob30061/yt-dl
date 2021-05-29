<template>
  <div>
    <div class="row mainDiv">
      <div class="col-md-3">
        <p class="tagHeader">{{ $t("message.fileName").toUpperCase() + ':' }}</p>
        <input class="file_element" :value="file_name">

        <div style="position: relative">
          <p class="tagHeader">{{ $t("message.title").toUpperCase() + ':' }}</p>
          <input class="file_element" :value="videoData.downloadData.title">
          <popover :visible="false"></popover>
        </div>

        <p class="tagHeader">{{ $t("message.artist").toUpperCase() + ':' }}</p>
        <input class="file_element" :value="videoData.downloadData.artist">

        <p class="tagHeader">{{ $t("message.year").toUpperCase() + ':' }}</p>
        <input class="file_element" type="number" :value="videoData.downloadData.year">

        <p class="tagHeader">{{ $t("message.genre").toUpperCase() + ':' }}</p>
        <input class="file_element" :value="videoData.downloadData.genre">

        <p class="tagHeader">{{ $t("message.channel").toUpperCase() + ':' }}</p>
        <input class="file_element" :value="videoData.staticData.channelData.channel_name">

        <img id="file_channel_img" :src="videoData.staticData.channelData.channel_img" alt="channel image"/>
      </div>
      
      <div class="col-md-9">
        <img v-if="!showVideo" @click="showVideo = !showVideo" id="thumbnail" :src="videoData.staticData.thumbnails.maxres.url" alt="Video thumbnail"/>
        <iframe
          v-else
          @click="showVideo = !showVideo"

          id="videoPlayer"
          :src="'https://www.youtube-nocookie.com/embed/' + videoData.staticData.id"
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; gyroscope; picture-in-picture" 
          :allowfullscreen="true">
        </iframe>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3" id="progressDiv">
        <p>{{ videoData.downloadData.file_name }}</p>

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

    <img id="bg-cover" :style="{ backgroundImage: `url(${videoData.staticData.thumbnails.maxres.url})` }">

    <UrlOverlay @fetchedData="setData"/>
    <AppMenu id="menu"></AppMenu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

//components
import Popover from '@/components/Popover.vue'
import UrlOverlay from '@/components/Url-overlay.vue'
import AppMenu from '@/components/menu/Menu.vue'

//libs
import '@/assets/libs/loading-bar.min.css'
import '@/assets/libs/bootstrap-grid.min.css'
import '@/assets/libs/loading-bar.min.js'

import sanitize from 'sanitize-filename' // removing directory paths and invalid characters from a filename

import bgImage from '@/assets/default-image.jpg';

export default defineComponent({
  name: "Home",
  components: { Popover, UrlOverlay, AppMenu },

  data() {
    return {
      showVideo: false,
      showPasteUrl: true,

      videoData: {
        downloadData: {
          file_name: undefined,
          artist: undefined,
          title: undefined,

          year: undefined,
        },
        staticData: {
          channelData: {
            channel_name: undefined,
          },
          thumbnails: {
            maxres: {
              url: bgImage
            }
          }
        }
      }
    }
  },

  computed: {
    file_name() {
      return sanitize(`${this.videoData.downloadData.artist} - ${this.videoData.downloadData.title}`)
    }
  },

  methods: {
    setData(data: any) {
      console.log(data);
      this.videoData = data;
      this.showPasteUrl = false;
    }
  },
});
</script>

<style lang="scss" scoped>
@import '../assets/styles/mixins';

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
  @include input;
  width: 100%;
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

//-------------------------------------------------------
#menu {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>