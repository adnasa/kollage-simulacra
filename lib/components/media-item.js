import $ from 'simulacra'

const commonProps = () => ({
  title: $('.media__title', (node, value) => {
    node.textContent = value
    if (value.length > 140)
      node.classList.add('media__title--long')
  }),
  image: $('.media__img', (node, value) => { node.src = value }),
  video: $('.media__video', (node, value) =>  {
    node.classList.add('hidden')
    node.type = 'video/mp4'
    node.src = value
  }, (node, value, previousValue) => {
    console.log(node, value, 'mutator')
  }),
  likes: $('.media__likes')
})

export function mountImage (value) {
  const {
    id, type, likes,
    caption, videos,
    images: { low_resolution }
  } = value
  const fragment = document.getElementById('markup-media-item').content
  const bindFragment = $(fragment, Object.assign({}, commonProps()))
  const state = {
    title: caption ? caption.text : '',
    likes: likes.count,
    image: low_resolution.url,
    video: ''
  }
  const content = $(state, bindFragment)
  return content
}

export function mountVideo (value) {

}

export default function mount (value) {
  return mountImage(value)
}
