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

  function fileInputChangeHandler(e) {
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const thumbnail = document.getElementById('selectedImageThumbnail')
        thumbnail.src = e.target.result
      }
      reader.readAsDataURL(fileInput.files[0])
    }
  }

  function submitButtonClickHandler(event) {
    event.preventDefault()
    if (!fileInput.files || fileInput.files.length === 0) {
      alert('Please add a photo.')
      return
    }

    if (!titleInput.value.trim()) {
      alert('Please enter a title.')
      return
    }

    const formData = new FormData()
    formData.append('title', titleInput.value)
    formData.append('image', fileInput.files[0])
    formData.append('category', categoryDropdown.value)

    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.status} ${response.statusText}`
          )
        }
        return response.json()
      })
      .then((data) => {
        alert('Photo added successfully.')
      })
      .catch((error) => {
        alert('There was a problem adding the photo.')
      })
  }

  addPhotoButton.addEventListener('click', fileInputClickHandler)
  fileInput.addEventListener('change', fileInputChangeHandler)
  submitButton.addEventListener('click', submitButtonClickHandler)
}
