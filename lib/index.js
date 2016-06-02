import $ from 'simulacra'
import request from 'request'
import mediaItem from 'components/media-item'
import modalItem from 'components/modal'
import mediaItemStore from 'store/media-item'

let state = {
  modal: null,
  items: []
}

const mountItem = (node, media) => {
  const content = mediaItem(media)
  node.appendChild(content)
}

const mountModal = (node, media) => {
  const content = modalItem(media)
  node.appendChild(content)
}

const mountApp = () => {
  const app = document.querySelector('#app-markup').content
  const target = document.querySelector('#app')
  const container = $(state, [app, {
    'items': [ app.querySelector('li'), mountItem ],
    'modal': [ app.getElementById('modal-placement'), mountModal ]
  }])
  target.appendChild(container)
  mediaItemStore.onOpen(payload => {
    state.modal = Object.assign({}, {
      title: payload.caption ? payload.caption.text : '',
      content: payload
    }, { open: true })
  })
}

const getItems = () => {
  return new Promise((resolve, reject) => {
    request('http://localhost:3000/data.json',
    (err, response, body) => {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(body))
    })
  })
}

getItems().then((result) => {
  mountApp()
  result.data.forEach((item) => {
    state.items.push(item)
  })
})
