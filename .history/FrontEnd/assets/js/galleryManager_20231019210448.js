document.addEventListener('DOMContentLoaded', function () {
  // Check if the user is logged in
  if (localStorage.getItem('token')) {
    // Display the Modifier button if the user is logged in
    const editGalleryButton = document.getElementById('editGalleryButton')
    editGalleryButton.style.display = 'block'

    // Attach the showModal function to the Modifier button's click event
    editGalleryButton.addEventListener('click', showModal)
  }

  function showModal() {
    // Check if modal already exists
    let modalOverlay = document.getElementById('modalOverlay')
    if (!modalOverlay) {
      // Create modal overlay
      modalOverlay = document.createElement('div')
      modalOverlay.style.position = 'fixed'
      modalOverlay.style.top = '0'
      modalOverlay.style.left = '0'
      modalOverlay.style.width = '100%'
      modalOverlay.style.height = '100%'
      modalOverlay.style.background = 'rgba(0, 0, 0, 0.7)'
      modalOverlay.style.zIndex = '999'
      modalOverlay.id = 'modalOverlay'

      // Create modal content container
      const modalContent = document.createElement('div')
      modalContent.style.position = 'relative'
      modalContent.style.width = '50%'
      modalContent.style.margin = '15% auto'
      modalContent.style.padding = '20px'
      modalContent.style.backgroundColor = '#fff'
      modalContent.style.borderRadius = '8px'

      // Create modal content
      const modalText = document.createElement('p')
      modalText.innerText = 'Galerie photo'

      const modalText = document.createElement('p')
      modalText.innerText = 'Here is the content of the modal window.'
      modalText.style.textAlign = 'center'

      const closeModalButton = document.createElement('button')
      closeModalButton.innerText = 'Close'
      closeModalButton.addEventListener('click', function () {
        document.body.removeChild(modalOverlay)
      })

      // Assemble modal content
      modalContent.appendChild(modalText)
      modalContent.appendChild(closeModalButton)

      // Assemble the full modal
      modalOverlay.appendChild(modalContent)

      // Append the modal to the body
      document.body.appendChild(modalOverlay)
    } else {
      // If modal already exists, just display it
      modalOverlay.style.display = 'block'
    }
  }
})
