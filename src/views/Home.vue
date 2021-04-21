<template>
  <div>
    <div class="row mainDiv">
      <div class="col-md-3">
        <p class="tagHeader">{{ $t("message.fileName").toUpperCase() + ':' }}</p>
        <p class="file_element"></p>

        <p class="tagHeader">{{ $t("message.title").toUpperCase() + ':' }}</p>
        <p class="file_element"></p>

        <p class="tagHeader">{{ $t("message.artist").toUpperCase() + ':' }}</p>
        <p class="file_element"></p>

        <p class="tagHeader">{{ $t("message.year").toUpperCase() + ':' }}</p>
        <p class="file_element"></p>

        <p class="tagHeader">{{ $t("message.genre").toUpperCase() + ':' }}</p>
        <p class="file_element"></p>

        <p class="tagHeader">{{ $t("message.channel").toUpperCase() + ':' }}</p>
        <p class="file_element"></p>
      </div>
      
      <div class="col-md-9">
        <img id="thumbnail" :src="url" alt="Video thumbnail"/>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3" id="progressDiv">
        <p>{{ file_name }}</p>

        <div style="width: auto; height: 50px;" id="progressbar" data-preset="energy" class="ldBar label-center"></div>
        <p id="progressText">1MB von 3MB</p>
      </div>

      <div class="col-md-9" id="queue">
        <div>
          <h4 style="text-align: center;" id="fullProgress">100/300</h4>
        </div>
      </div>
    </div>

    <img id="bg-cover" :style="{ backgroundImage: `url(${url})` }">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import '@/assets/libs/loading-bar.min.css'
import '@/assets/libs/loading-bar.min.js'

export default defineComponent({
  name: "Home",

  data() {
    return {
      url: 'https://i.ytimg.com/vi/PRqiUgXHCWA/maxresdefault.jpg',
      file_name: 'Coldplay x Porter Robinson x Krewella - Every Language is Alive (Kyante Wilson Mashup)'
    }
  },
});
</script>

<style lang="scss" scoped>
.mainDiv {
  margin-bottom: 25px;

    div:first-of-type {
      background-color: rgb(64, 64, 64, 0.4);
      border-bottom-right-radius: 8px;
      border-bottom: 1.5px rgb(0, 0, 0, 0.25) solid;
      border-right: 1.5px rgb(0, 0, 0, 0.25) solid;
      padding: 20px 20px 0px 30px;
    }
    
    div:last-of-type {
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
  cursor: text;
  border-bottom: 1px solid rgb(255, 255, 255, 0.3);
  padding-bottom: 5px;
  margin: 5px 0 35px 0;
}


#thumbnail {
  width: 94%;
  border-radius: 6px;
  border: 1.5px rgb(255, 255, 255, 0.2) solid;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.8);
  
  transition: box-shadow 0.2s linear 0.3s;
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
</style>