document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('token')) {
    const editGalleryButton = document.getElementById('editGalleryButton')
    const editModeIndicator = document.getElementById('editModeIndicator')

    editGalleryButton.classList.add('show')
    editGalleryButton.addEventListener('click', showModal)
    editModeIndicator.classList.add('show')
  }

  function displayMiniGallery(data, container) {
    const miniGalleryDiv = container || document.createElement('div')
    miniGalleryDiv.className = 'mini-gallery'

    data.forEach((item) => {
      let figure = document.createElement('figure')

      let img = document.createElement('img')
      img.src = item.imageUrl
      img.alt = item.title

      const deleteIcon = document.createElement('i')
      deleteIcon.classList.add('fa', 'fa-trash')
      deleteIcon.dataset.id = item.id
      deleteIcon.addEventListener('click', handleDeleteClick)

      figure.appendChild(img)
      figure.appendChild(deleteIcon)
      miniGalleryDiv.appendChild(figure)
    })

    return miniGalleryDiv
  }

  function handleDeleteClick(event) {
    const photoId = event.target.dataset.id
    if (!photoId) return

    const confirmed = confirm('Are you sure you want to delete this photo?')
    if (confirmed) {
      fetch(`http://localhost:5678/api/works/${photoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((response) => {
          if (response.ok) {
            event.target.parentElement.remove()
          } else {
            console.error('Failed to delete photo.')
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
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
        const miniGalleryDiv = document.querySelector('.mini-gallery')
        miniGalleryDiv.innerHTML = ''
        displayMiniGallery(data, document.querySelector('.mini-gallery'))
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  console.log('galleryManager.js is loaded')
})
