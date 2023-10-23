console.log('editPhoto.js is starting')

document.body.addEventListener('click', function (event) {
  if (event.target && event.target.id === 'add-photo-button') {
    console.log('Add photo button clicked')
    createAddPhotoModal()
  }
})

function initializeAddPhotoModalLogic() {
  const addPhotoButton = document.getElementById('add-photo-button')
  const fileInput = document.getElementById('photoFileInput')
  const titleInput = document.getElementById('photoTitleInput')
  const categoryDropdown = document.getElementById('categoryDropdown')
  const submitButton = document.getElementById('submitButton')

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

function createAddPhotoModal() {
  const editModal = document.createElement('div')
  editModal.id = 'editModalOverlay'
  editModal.classList.add('show')

  const editModalContent = document.createElement('div')
  editModalContent.classList.add('modal-content')

  const editModalCloseButton = document.createElement('button')
  editModalCloseButton.innerText = 'X'
  editModalCloseButton.classList.add('close-button')
  editModalCloseButton.addEventListener('click', function () {
    editModal.classList.remove('show')
  })

  const editModalTitle = document.createElement('h2')
  editModalTitle.innerText = 'Ajout photo'

  const editModalAddPhotoForm = document.createElement('form')
  editModalAddPhotoForm.id = 'add-photo-form'
  editModalAddPhotoForm.setAttribute('enctype', 'multipart/form-data')

  const uploadDiv = document.createElement('div')
  uploadDiv.classList.add('upload-div')

  const editModalAddPhotoButton = document.createElement('input')
  editModalAddPhotoButton.type = 'file'
  editModalAddPhotoButton.id = 'photo-upload'
  editModalAddPhotoButton.classList.add('hidden-upload')

  const customUploadLabel = document.createElement('label')
  customUploadLabel.setAttribute('for', 'photo-upload')
  customUploadLabel.classList.add('customFileUpload')

  const uploadIcon = document.createElement('i')
  uploadIcon.classList.add('fa-regular', 'fa-image')
  customUploadLabel.appendChild(uploadIcon)

  const space = document.createElement('br')
  customUploadLabel.appendChild(space)

  const addButton = document.createElement('button')
  addButton.innerText = '+ Ajouter photo'
  addButton.addEventListener('click', function () {
    editModalAddPhotoButton.click() // Trigger the file input click event
  })
  customUploadLabel.appendChild(addButton)

  const uploadDescription = document.createElement('p')
  uploadDescription.innerText = 'jpg, png: 4MB max'
  uploadDescription.id = 'upload-description'

  const formFieldsDiv = document.createElement('div')
  formFieldsDiv.classList.add('title-category-div')

  const editModalAddPhotoFormTitle = document.createElement('label')
  editModalAddPhotoFormTitle.innerText = 'Titre'
  editModalAddPhotoFormTitle.setAttribute('for', 'photo-title')
  const editModalAddPhotoFormTitleInput = document.createElement('input')
  editModalAddPhotoFormTitleInput.type = 'text'
  editModalAddPhotoFormTitleInput.id = 'photo-title'
  editModalAddPhotoFormTitleInput.required = true

  const editModalAddPhotoFormCategory = document.createElement('label')
  editModalAddPhotoFormCategory.innerText = 'Catégorie'
  editModalAddPhotoFormCategory.setAttribute('for', 'photo-category')
  const editModalAddPhotoFormCategoryInput = document.createElement('select')
  editModalAddPhotoFormCategoryInput.id = 'photo-category'
  editModalAddPhotoFormCategoryInput.required = true

  const categories = ['Category 1', 'Category 2', 'Category 3']
  for (const category of categories) {
    const option = document.createElement('option')
    option.value = category
    option.innerText = category
    editModalAddPhotoFormCategoryInput.appendChild(option)
  }

  editModal.appendChild(editModalContent)
  editModalContent.appendChild(editModalCloseButton)
  editModalContent.appendChild(editModalTitle)
  editModalContent.appendChild(editModalAddPhotoForm)

  const validateButton = document.createElement('button')
  validateButton.id = 'edit-add-photo-button'
  validateButton.innerText = 'Valider'
  editModalContent.appendChild(validateButton)

  editModalAddPhotoForm.appendChild(uploadDiv)
  uploadDiv.appendChild(editModalAddPhotoButton)
  uploadDiv.appendChild(customUploadLabel)
  uploadDiv.appendChild(uploadDescription)

  editModalAddPhotoForm.appendChild(formFieldsDiv)
  formFieldsDiv.appendChild(document.createElement('br'))
  formFieldsDiv.appendChild(editModalAddPhotoFormTitle)
  formFieldsDiv.appendChild(editModalAddPhotoFormTitleInput)
  formFieldsDiv.appendChild(document.createElement('br'))
  formFieldsDiv.appendChild(editModalAddPhotoFormCategory)
  formFieldsDiv.appendChild(editModalAddPhotoFormCategoryInput)

  document.body.appendChild(editModal)

  editModalAddPhotoButton.addEventListener('change', function (e) {
    var fileName = e.target.value.split('\\').pop()
    if (fileName) {
      customUploadLabel.textContent = fileName
    } else {
      customUploadLabel.textContent = '+ Ajout'
    }
  })
  initializeAddPhotoModalLogic()
}
