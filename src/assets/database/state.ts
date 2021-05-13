export interface State {
  downloadData: {
    file_name: string,
    artist: string,
    title: string,
    year: number,
    genre?: string,
    format: { audio: boolean, video: boolean },
    codec: string,
    codecQuality: number | string,
    cover: string,
    In: number,
    Out: number,
    lyrics: string
  },

  staticData: {
    url: string,
    uploadInfo: string,
    id: string,
    duration: string,
    durationInSek: number,
    resolution: 'string',
    
    channelData: {
      channel_img: string,
      channel_link: string,
      channel_name: string,
    },
    thumbnails: object
  },

  processingData: {
    dateAdded: Date,
    metadata?: {
      brackets?: Array<string>,
      slicedTitle?: Array<string>
    }
  }
}