document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('token')) {
    const editGalleryButton = document.getElementById('editGalleryButton')
    editGalleryButton.style.display = 'block'
    editGalleryButton.addEventListener('click', function () {
      showModal()
      fetchDataAndDisplayInModal()
    })
  }

  function showModal() {
    let modalOverlay = document.getElementById('modalOverlay')
    if (!modalOverlay) {
      modalOverlay = createModal()
      document.body.appendChild(modalOverlay)
    } else {
      modalOverlay.style.display = 'block'
    }
  }

  function createModal() {
    const modalOverlay = document.createElement('div')
    modalOverlay.style.position = 'fixed'
    modalOverlay.style.top = '0'
    modalOverlay.style.left = '0'
    modalOverlay.style.width = '100%'
    modalOverlay.style.height = '100%'
    modalOverlay.style.background = 'rgba(0, 0, 0, 0.7)'
    modalOverlay.style.zIndex = '999'
    modalOverlay.id = 'modalOverlay'

    const modalContent = document.createElement('div')
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
    closeModalButton.innerHTML = '<i class="fas fa-trash-alt"></i>' // Using FontAwesome's trashcan icon
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

    const galleryDiv = document.createElement('div')
    galleryDiv.classList.add('gallery')

    modalContent.appendChild(modalText)
    modalContent.appendChild(closeModalButton)
    modalContent.appendChild(galleryDiv)
    modalOverlay.appendChild(modalContent)
    return modalOverlay
  }

  function fetchDataAndDisplayInModal() {
    const apiEndpoint = 'http://localhost:5678/api/works'
    let data

    fetch('http://localhost:5678/api/categories')
      .then((response) => response.json())
      .then((categories) => {
        // ... your previous logic to fetch and display categories ...

        return fetch(apiEndpoint)
      })
      .then((response) => response.json())
      .then((fetchedData) => {
        data = fetchedData
        displayData(data, true)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  function displayData(filteredData, isModal = false) {
    const galleryDiv = isModal
      ? document.querySelector('#modalOverlay .gallery')
      : document.querySelector('.gallery')
    galleryDiv.innerHTML = ''

    // ... your previous logic to display data ...

    // NOTE: You'll need to make sure the displayData function is adjusted as we discussed before
    // to show the trash icon only in modal and smaller images.
  }
})
