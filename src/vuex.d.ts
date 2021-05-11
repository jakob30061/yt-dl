import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    downloadData: {
      file_name: string,
      artist: string,
      title: string,
      year: number,
      genre: string,
      format: { audio: boolean, video: boolean },
      codec: string,
      codecQuality: number,
      cover: string,
      In: number,
      Out: number,
    },
    staticData: {
      url: string,
      uploadInfo: string,
      id: string,
      duration: string,
      durationInSek: number,
      
      channelData: {
        channel_img: string,
        channel_link: string,
        channel_name: string,
      },
      thumbnails: object
    },
    processingData: {
      dateAdded: string,
      metadata: {
        brackets: Array<string>,
        slicedTitle: Array<string>
      }
    }
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}