document.addEventListener('DOMContentLoaded', function () {
  // Check if the user is logged in
  if (localStorage.getItem('token')) {
    // Display the Modifier button if the user is logged in
    const editGalleryButton = document.getElementById('editGalleryButton')
    editGalleryButton.style.display = 'block'

    function showModal() {
      // Create modal overlay
      const modalOverlay = document.createElement('div')
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
      modalText.innerText = 'Here is the content of the modal window.'

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
    }

    // Add click event listener to the Modifier button to open the edit window
    editGalleryButton.addEventListener('click', function () {
      const editWindow = document.getElementById('editWindow')
      if (
        editWindow.style.display === 'none' ||
        editWindow.style.display === ''
      ) {
        editWindow.style.display = 'block'
      } else {
        editWindow.style.display = 'none'
      }
    })

    // Add functionality to the add button inside the edit window
    const addButton = document.getElementById('addButton')
    addButton.addEventListener('click', function () {
      // Your logic to add new content goes here...
      console.log('Add button clicked')
    })
  }
})
