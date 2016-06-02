import $ from 'simulacra'
import MediaItemStore from 'store/media-item'

function defaultBindings (state, media) {
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
        MediaItemStore.open(media)
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

export function mountImage (media, bindings) {
  const { id, type, likes, caption, videos, images: { low_resolution } } = media
  const fragment = document.getElementById('markup-media-item').content
  const state = {
    title: caption ? caption.text : '',
    likes: likes.count,
    image: low_resolution.url,
    video: videos ? videos.standard_resolution.url : null
  }

  const fragmentBinding = Object.assign(defaultBindings(state, media), bindings)

  return $(state, [ fragment, fragmentBinding ])
}

export default function mount (media, bindings) {
  return mountImage(media, bindings)
}
