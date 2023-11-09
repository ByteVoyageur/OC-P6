document.body.addEventListener('click', function (event) {
  if (event.target && event.target.id === 'openAddPhotoModalButton') {
    createAddPhotoModal()
  }
})

function initializeAddPhotoModalLogic() {
  const addPhotoButton = document.getElementById('upload-photo-button')
  const fileInput = document.getElementById('photo-upload')
  const titleInput = document.getElementById('photo-title')
  const categoryDropdown = document.getElementById('photo-category')
  const submitButton = document.getElementById('valider-add-photo-button')

  function fileInputClickHandler() {
    fileInput.click()
  }

  // Event handler for file input change.
  // If a file is selected, it creates a FileReader instance,
  // sets up the onload event handler to update the thumbnail image's source,
  // and initiates the read operation as a Data URL.
  function fileInputChangeHandler(e) {
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        // Retrieve the image element and set its source to the file's data URL.
        const thumbnail = document.getElementById('selectedImageThumbnail')
        thumbnail.src = e.target.result
      }
      // Start reading the first selected file as a Data URL.
      reader.readAsDataURL(fileInput.files[0])
    }
  }

  c
  addPhotoButton.addEventListener('click', fileInputClickHandler)
  fileInput.addEventListener('change', fileInputChangeHandler)
  submitButton.addEventListener('click', submitButtonClickHandler)
}
