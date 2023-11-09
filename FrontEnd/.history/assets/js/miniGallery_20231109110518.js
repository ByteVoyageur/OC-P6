if (localStorage.getItem('token')) {
  const editGalleryButton = document.getElementById('editGalleryButton')
  const editIcon = document.getElementById('editIcon')
  const loginLink = document.querySelector('a[href="login.html"]')

  editGalleryButton.classList.add('show')
  editGalleryButton.addEventListener('click', showModal)

  // Change login link to logout
  loginLink.textContent = 'logout'
  loginLink.href = '#'
  loginLink.addEventListener('click', function () {
    localStorage.removeItem('token')
    window.location.reload()
  })

  // Add edit mode indicator if not present
  if (!document.getElementById('editModeIndicator')) {
    const editModeIndicator = document.createElement('div')
    editModeIndicator.className = 'edit-mode-indicator'
    editModeIndicator.id = 'editModeIndicator'
    editModeIndicator.innerHTML =
      '<i class="far fa-pen-to-square"></i><span>Mode edition</span>'

    // Add the indicator to the top of the body
    document.body.insertBefore(editModeIndicator, document.body.firstChild)

    // Now reveal the editModeIndicator
    editModeIndicator.classList.add('show')
  }

  // Show the edit icon
  editIcon.classList.add('show')
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

    const openAddPhotoModal = document.createElement('button')
    openAddPhotoModal.innerText = 'Ajouter une photo'
    openAddPhotoModal.id = 'openAddPhotoModalButton'
    modalContent.appendChild(openAddPhotoModal)

    modalOverlay.appendChild(modalContent)
    document.body.appendChild(modalOverlay)

    modalOverlay.classList.add('show')
  } else {
    modalOverlay.classList.add('show')
  }

  fetch(apiEndpointWorks)
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

function displayMiniGallery(data, container) {
  // Use the provided container for the gallery, or create a new div if none is provided.
  const miniGalleryDiv = container || document.createElement('div')
  miniGalleryDiv.className = 'mini-gallery'

  data.forEach((item) => {
    let figure = document.createElement('figure')

    let img = document.createElement('img')
    img.src = item.imageUrl
    img.alt = item.title

    const deleteIcon = document.createElement('i')
    deleteIcon.classList.add('fa-regular', 'fa-trash-can')
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
  if (!photoId) {
    console.error('Error: The photo ID is missing.')
    return
  }

  const confirmed = confirm('Are you sure you want to delete this photo?')
  if (confirmed) {
    fetch(`${apiEndpointWorks}/${photoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.ok) {
          event.target.parentElement.remove()
          updateMainGallery(photoId)
          alert('Photo deleted successfully.')
        } else {
          alert('Failed to delete photo.')
          console.error('Failed to delete photo.')
        }
      })
      .catch((error) => {
        alert('unknown error')
        console.error('net error', error)
      })
  }
}

function updateMainGallery(photoId) {
  const galleryDiv = document.querySelector('.gallery')
  const figureToRemove = galleryDiv.querySelector('#figure-' + photoId)

  if (figureToRemove) {
    figureToRemove.remove()
  }
}
