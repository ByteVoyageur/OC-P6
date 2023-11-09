document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('token')) {
    const editGalleryButton = document.getElementById('editGalleryButton')
    editGalleryButton.classList.add('show')
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

      figure.appendChild(img)
      miniGalleryDiv.appendChild(figure)
    })

    return miniGalleryDiv
  }

  function showModal() {
    console.log('showModal function is called')
    let modalOverlay = document.getElementById('modalOverlay')
    let modalContent

    if (!modalOverlay) {
      modalOverlay = document.createElement('div')
      modalOverlay.id = 'modalOverlay'

      modalContent = document.createElement('div')
      modalContent.classList.add('modal-content')

      const modalText = document.createElement('p')
      modalText.innerText = 'Gallery photo '

      const closeModalButton = document.createElement('button')
      closeModalButton.innerText = 'X'
      closeModalButton.classList.add('close-button')

      closeModalButton.addEventListener('click', function () {
        modalOverlay.classList.remove('show')
      })

      modalContent.appendChild(closeModalButton)
      modalContent.appendChild(modalText)

      const miniGalleryDiv = document.createElement('div')
      miniGalleryDiv.className = 'mini-gallery'
      modalContent.appendChild(miniGalleryDiv)

      const addButton = document.createElement('button')
      addButton.innerText = 'Ajouter une photo'
      addButton.id = 'add-photo-button'
      modalContent.appendChild(addButton)

      modalOverlay.appendChild(modalContent)
      document.body.appendChild(modalOverlay)

      modalOverlay.classList.add('show')
    } else {
      modalOverlay.classList.add('show')
    }

    fetch('http://localhost:5678/api/works')
      .then((response) => response.json())
      .then((data) => {
        displayMiniGallery(data, document.querySelector('.mini-gallery'))
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  console.log('galleryManager.js is loaded')
})
