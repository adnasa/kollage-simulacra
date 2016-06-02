import EventEmmiter from 'events'
import { MEDIA_CLOSE, MEDIA_OPEN } from 'constants'

class MediaItem extends EventEmmiter {
  onClose (cb) {
    this.on(MEDIA_CLOSE, cb)
  }

  onOpen (cb) {
    this.on(MEDIA_OPEN, cb)
  }

  close (payload) {
    this.emit(MEDIA_CLOSE, payload)
  }

  open (payload) {
    this.emit(MEDIA_OPEN, payload)
  }
}

export default new MediaItem()
