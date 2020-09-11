const $btn = document.getElementById('shortern__btn')
const $form = document.querySelector('form')
const mensajeError = document.querySelector('.error-input')
const shorterns = document.querySelector('.shorterns-urls__container')

$form.addEventListener('submit', (e) => {
  let inputForm = document.getElementById('shortern__input').value.trim()
  e.preventDefault()
  let newShorten = ''
  if (inputForm === '') {
    mensajeError.style.display = 'Block'
  } else {
    getUrl(inputForm).then((data) => {
      $input = ''
      newShorten = data[0]
      let urlShort = 'https://rel.ink/' + newShorten.hashid
      if (inputForm.length > 32) {
        var url_cor = newShorten.url.slice(0, 32) + '...'
      } else {
        url_cor = inputForm
      }
      let divContainer = document.createElement('div')
      divContainer.className = 'shorterns-urls__card animate__animated animate__slideInLeft'
      divContainer.innerHTML = `
          <div class="container-x">
          <a href=${newShorten.url} class="shorterns-urls__url">${url_cor}</a>
          <img src="./img/x.svg" height="15" alt="x">
          </div>
          <hr class="separador" />
          <a href=${urlShort} class="short-url">${urlShort}</a>
          <button class="btn-copy" data-clipboard-text=${urlShort}>Copy</button>
          `
      document.querySelector('.shorterns-urls__container').appendChild(divContainer)

      if (!localStorage.getItem('arraysShorten')) {
        localStorage.setItem('arraysShorten', JSON.stringify([newShorten]))
      } else {
        let tmpLS = JSON.parse(localStorage.getItem('arraysShorten'))
        tmpLS = [...tmpLS, newShorten]
        localStorage.setItem('arraysShorten', JSON.stringify(tmpLS))
      }
    })
  }
})

if (localStorage.getItem('arraysShorten')) {
  render()
}

function render() {
  let arrayRender = JSON.parse(localStorage.getItem('arraysShorten'))
  arrayRender.map((elem, i) => {
    let urlShort = 'https://rel.ink/' + elem.hashid
    let divContainer = document.createElement('div')
    divContainer.className = 'shorterns-urls__card animate__animated animate__slideInLeft'
    var url_cor = elem.url.slice(0, 32) + '...'
    if (elem.url.length > 32) {
      divContainer.innerHTML = `
      <div class="container-x">
      <a href=${elem.url} class="shorterns-urls__url">${url_cor}</a>
      <img src="./img/x.svg" height="15" alt="x">
      </div>
      <hr class="separador" />
      <a href=${urlShort} class="short-url">${urlShort}</a>
      <button class="btn-copy" data-clipboard-text=${urlShort}>Copy</button>
      `
    } else {
      divContainer.innerHTML = `
      <div class="container-x">
      <a href=${elem.url} class="shorterns-urls__url">${elem.url}</a>
      <img src="./img/x.svg" height="15" alt="x">
      </div>
      <hr class="separador" />
      <a href=${urlShort} class="short-url">${urlShort}</a>
      <button class='btn-copy' data-clipboard-text=${urlShort}>Copy</button>
      `
    }
    document.querySelector('.shorterns-urls__container').appendChild(divContainer)
  })
}

// fetch services
async function getUrl(url) {
  let response = []
  await fetch('https://rel.ink/api/links/', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'es-US,es;q=0.9,en-US;q=0.8,en;q=0.7,es-419;q=0.6',
      'content-type': 'application/json;charset=UTF-8',
    },
    method: 'POST',
    body: JSON.stringify({
      url: url,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => (response = [...response, data]))
  return response
}

// Función para copiar url
function CopyClipboard() {
  document.querySelector('.shorterns-urls__container').addEventListener('click', (e) => {
    e.stopPropagation()
    var btns = document.querySelectorAll('.btn-copy')
    var clipboard = new ClipboardJS(btns)
    clipboard.on('success', function (e) {
      e.trigger.innerHTML = 'Copied!'
      e.trigger.style.backgroundColor = '#3b3054'
      setTimeout(() => {
        e.trigger.innerHTML = 'Copy'
        e.trigger.style.backgroundColor = '#2acfcf'
      }, 500)
    })
    clipboard.on('error', function (e) {
      console.log(e)
    })
  })
}
CopyClipboard()

document.querySelector('.shorterns-urls__container').addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    let urlId = e.target.parentElement.parentElement.querySelector('.short-url').textContent.split('/').pop().trim()
    let LS = JSON.parse(localStorage.getItem('arraysShorten'))
    let newArray = LS.filter(({ hashid }, index) => hashid.indexOf(urlId) !== index)
    console.log(newArray)
    console.log(urlId)
    localStorage.setItem('arraysShorten', JSON.stringify(newArray))
    //  e.target.parentElement.parentElement.remove()
  }
})
