import $ from 'simulacra'
import request from 'request'
import mediaItem from './components/media-item'
let state = {
  items: []
}

const mountItem = (node, value) => {
  const content = mediaItem(value)
  node.appendChild(content)
}

const mountApp = () => {
  const app = document.querySelector('#app-markup').content
  const target = document.querySelector('#app')
  const bindings = $(app, {
    items: $(app.querySelector('li'), {}, mountItem)
  })
  const container = $(state, bindings)
  target.appendChild(container)
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
