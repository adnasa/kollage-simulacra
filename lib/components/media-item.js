import $ from 'simulacra'
import MediaItemStore from 'store/media-item'

function createBindings (state) {
  return {
    title: ['.media__title', (node, value) => {
      node.textContent = value
      if (value.length > 140)
        node.classList.add('media__title--long')
    }],
    image: ['.media__img', (node, value) => {
      node.src = value
      node.addEventListener('click', (e) => {
        e.preventDefault()
        MediaItemStore.open(state)
      })
    }],
    video: ['.media__video', (node, value) => {
      if (value) {
        node.type = 'video/mp4'
        node.src = value
      }
    }],
    likes: ['.media__likes']
  }
}

export function mountImage (media) {
  const { id, type, likes, caption, videos, images: { low_resolution } } = media
  const emptyFragment = document.getElementById('markup-media-item').content

  const initialState = {
    title: caption ? caption.text : '',
    likes: likes.count,
    image: low_resolution.url,
    video: videos ? videos.standard_resolution.url : null
  }

  const content = $(initialState, [ emptyFragment,
    createBindings(initialState, media) ])

  return content
}

export default function mount (media) {
  return mountImage(media)
}
