console.log('editPhoto.js is starting')
let logs = []

function customLog(message) {
  logs.push(message)
  console.log(message)
}

document.body.addEventListener('click', function (event) {
  // Check if the clicked element is "add-photo-button"
  if (event.target && event.target.id === 'add-photo-button') {
    console.log('Add photo button clicked')
    createAddPhotoModal()
  }
})

function initializeAddPhotoModalLogic() {
  const addPhotoButton = document.getElementById('add-photo-button')
  const fileInput = document.getElementById('photo-upload') // Adjusted to match the ID in the modal structure
  const titleInput = document.getElementById('photo-title') // Adjusted to match the ID in the modal structure
  const categoryDropdown = document.getElementById('photo-category') // Adjusted to match the ID in the modal structure
  const submitButton = document.getElementById('edit-add-photo-button') // Adjusted to match the ID in the modal structure

  function fileInputClickHandler() {
    fileInput.click()
  }

  function fileInputChangeHandler(e) {
    var fileName = e.target.value.split('\\').pop()
    if (fileName) {
      addPhotoButton.textContent = fileName
    } else {
      addPhotoButton.textContent = '+ Ajout'
    }

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const thumbnail = document.getElementById('selectedImageThumbnail')
        thumbnail.src = e.target.result
      }
      reader.readAsDataURL(fileInput.files[0])
    }
  }

  function submitButtonClickHandler() {
    const formData = new FormData()
    formData.append('title', titleInput.value)
    formData.append('imageUrl', fileInput.files[0])
    formData.append('categoryId', categoryDropdown.value)
    formData.append('userId', localStorage.getItem('userId'))

    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Upload response:', data)
      })
      .catch((error) => {
        console.error('Error uploading photo:', error)
      })
  }

  addPhotoButton.addEventListener('click', fileInputClickHandler)
  fileInput.addEventListener('change', fileInputChangeHandler)
  submitButton.addEventListener('click', submitButtonClickHandler)
}
