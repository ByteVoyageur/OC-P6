document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('token')) {
    const editGalleryButton = document.getElementById('editGalleryButton')
    editGalleryButton.style.display = 'block'
    editGalleryButton.addEventListener('click', showModal)
  }

  function displayMiniGallery(data, container) {
    const miniGalleryDiv = container || document.createElement('div')
    miniGalleryDiv.className = 'mini-gallery'

    data.forEach((item) => {
      let figure = document.createElement('figure')

      let img = document.createElement('img')
      img.src = item.imageUrl
      img.alt = item.title
      img.style.width = '50px'
      img.style.height = '50px'

      let figcaption = document.createElement('figcaption')
      figcaption.textContent = item.title

      figure.appendChild(img)
      figure.appendChild(figcaption)

      miniGalleryDiv.appendChild(figure)
    })

    return miniGalleryDiv
  }

  function showModal() {
    console.log('showModal function is called')
    let modalOverlay = document.getElementById('modalOverlay')
    let modalContent, miniGalleryDiv

    if (!modalOverlay) {
      modalOverlay = document.createElement('div')
      modalOverlay.style.position = 'fixed'
      modalOverlay.style.top = '0'
      modalOverlay.style.left = '0'
      modalOverlay.style.width = '100%'
      modalOverlay.style.height = '100%'
      modalOverlay.style.background = 'rgba(0, 0, 0, 0.7)'
      modalOverlay.style.zIndex = '999'
      modalOverlay.id = 'modalOverlay'

      modalContent = document.createElement('div')
      modalContent.style.position = 'relative'
      modalContent.style.width = '50%'
      modalContent.style.margin = '15% auto'
      modalContent.style.padding = '20px'
      modalContent.style.backgroundColor = '#fff'
      modalContent.style.borderRadius = '8px'

      const modalText = document.createElement('p')
      modalText.innerText = 'Gallery photo '
      modalText.style.textAlign = 'center'

      const closeModalButton = document.createElement('button')
      closeModalButton.innerText = 'X'
      closeModalButton.style.position = 'absolute'
      closeModalButton.style.right = '10px'
      closeModalButton.style.top = '10px'
      closeModalButton.style.border = 'none'
      closeModalButton.style.background = 'none'
      closeModalButton.style.fontSize = '20px'
      closeModalButton.style.cursor = 'pointer'

      closeModalButton.addEventListener('click', function () {
        document.body.removeChild(modalOverlay)
      })

      modalContent.appendChild(modalText)
      modalContent.appendChild(closeModalButton)
      miniGalleryDiv = document.createElement('div')
      miniGalleryDiv.className = 'mini-gallery'
      modalContent.appendChild(miniGalleryDiv)

      modalOverlay.appendChild(modalContent)
      document.body.appendChild(modalOverlay)
    } else {
      modalOverlay.style.display = 'block'
    }

    fetch('http://localhost:5678/api/works')
      .then((response) => response.json())
      .then((data) => {
        const miniGallery = displayMiniGallery(data, miniGalleryDiv)
        modalContent.appendChild(miniGallery)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  console.log('galleryManager.js is loaded')
})