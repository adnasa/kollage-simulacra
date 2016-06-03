import $ from 'simulacra'
import mediaItem from 'components/media-item'

export default function modal (media) {
  const fragment = document.getElementById('markup-modal').content
  fragment.querySelector('.modal').classList.add('open')
  return $(media, [ fragment, {
    'title': ['.modal-element__header', (node, value) => {
      node.textContent = value
    }],
    'content': ['.modal-element__content', (node, value) => {
      const isVideo = value.type === 'video'
      const content = mediaItem(value, {
        title: ['.media__title', () => { }],
        image: ['.media__img', (node, value) => {
          node.src = value
          if (isVideo)
            node.classList.add('hidden')
        }],
        video: ['.media__video', (node, value) => {
          if (value && isVideo) {
            node.type = 'video/mp4'
            node.src = value
            node.classList.remove('hidden')
          }
        }]
      })
      node.appendChild(content)
    }]
  }])
}
