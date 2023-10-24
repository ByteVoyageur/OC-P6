console.log('editPhoto.js is starting!')
let logs = []

function customLog(message) {
  logs.push(message)
  console.log(message)
}

document.body.addEventListener('click', function (event) {
  if (event.target && event.target.id === 'add-photo-button') {
    customLog('Add photo button clicked')
    createAddPhotoModal()
  }
})

function initializeAddPhotoModalLogic() {
  customLog('initializeAddPhotoModalLogic is starting')
  const addPhotoButton = document.getElementById('add-photo-button')
  const fileInput = document.getElementById('photo-upload')
  const titleInput = document.getElementById('photo-title')
  const categoryDropdown = document.getElementById('photo-category')
  const submitButton = document.getElementById('edit-add-photo-button')

  function fileInputClickHandler() {
    customLog('File input click handler triggered')
    fileInput.click()
  }

  function fileInputChangeHandler(e) {
    var fileName = e.target.value.split('\\').pop()
    customLog(`File changed: ${fileName}`)

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
    customLog('Submit button clicked, preparing FormData')

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
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        customLog(`Upload response: ${JSON.stringify(data)}`)
      })
      .catch((error) => {
        customLog(`Error uploading photo: ${error.message}`)
      })
  }

  addPhotoButton.addEventListener('click', fileInputClickHandler)
  fileInput.addEventListener('change', fileInputChangeHandler)
  submitButton.addEventListener('click', submitButtonClickHandler)
}
