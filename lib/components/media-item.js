import $ from 'simulacra'


function createBindings (state, media) {
  return {
    title: ['.media__title', (node, value) => {
      node.textContent = value
      if (value.length > 140)
        node.classList.add('media__title--long')
    }],
    image: ['.media__img', (node, value) => {
      node.src = value
      // node.addEventListener('click', function (e) {
      //   if (media.type === 'video')
      //     state.video = media.videos.low_resolution.url
      // })
    }],
    video: ['.media__video', (node, value) =>  {
      node.classList.add('hidden')
      node.type = 'video/mp4'
      node.src = value
    }],
    likes: ['.media__likes']
  }
}

export function mountImage (value) {
  const { id, type, likes, caption, videos, images: { low_resolution } } = value
  const emptyFragment = document.getElementById('markup-media-item').content
  const initialState = {
    title: caption ? caption.text : '',
    likes: likes.count,
    image: low_resolution.url,
    video: ''
  }

  const content = $(initialState, [ emptyFragment,
    createBindings(initialState, value) ])

  return content
}

export default function mount (value) {
  return mountImage(value)
}
