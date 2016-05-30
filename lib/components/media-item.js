import $ from 'simulacra'
const state = {
  title: '',
  media: null,
  likes: 0,
  liker: 0
}

export default function mount (value) {
  const { id, caption, likes, images: { low_resolution: { url } } } = value
  const fragment = document.getElementById('markup-media-item').content
  const bindFragment = $(fragment, {
    title: $('.media__title', function (node, value) {
      node.textContent = value
      if (value.length > 140)
        node.classList.add('media__title--long')
    }),
    media: $('.media__img', (node, value) => { node.src = value }),
    likes: $('.media__likes')
    // likeBtn: $('.media__like-btn', (node, value) => {
    //   node.dataset.mediaId = value
    //   node.addEventListener('click', (e) => {
    //     e.preventDefault()
    //     // increment the likes.
    //   })
    // })
  })

  const content = $({
    title: caption ? caption.text : '',
    media: url,
    likes: likes.count,
    likeBtn: id
  }, bindFragment)

  return content
}
