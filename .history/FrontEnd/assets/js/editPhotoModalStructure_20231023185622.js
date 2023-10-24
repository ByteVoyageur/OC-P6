async function fetchCategories() {
  try {
    let response = await fetch('http://localhost:5678/api/categories')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    let categories = await response.json()
    return categories
  } catch (error) {
    console.error('There was a problem fetching the categories:', error)
    return []
  }
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

  const addButton = document.createElement('button')
  addButton.innerText = '+ Ajouter photo'
  addButton.addEventListener('click', function () {
    editModalAddPhotoButton.click()
  })
  customUploadLabel.appendChild(addButton)

  const uploadDescription = document.createElement('p')
  uploadDescription.innerText = 'jpg, png: 4MB max'
  uploadDescription.id = 'upload-description'

  const thumbnailContainer = document.createElement('div')
  thumbnailContainer.classList.add('thumbnail-container')

  const thumbnail = document.createElement('img')
  thumbnail.id = 'selectedImageThumbnail'
  thumbnailContainer.appendChild(thumbnail)

  uploadDiv.appendChild(editModalAddPhotoButton)
  uploadDiv.appendChild(customUploadLabel)
  uploadDiv.appendChild(uploadDescription)
  uploadDiv.appendChild(thumbnailContainer)

  editModalAddPhotoForm.appendChild(formFieldsDiv)
  formFieldsDiv.appendChild(document.createElement('br'))
  formFieldsDiv.appendChild(editModalAddPhotoFormTitle)
  formFieldsDiv.appendChild(editModalAddPhotoFormTitleInput)
  formFieldsDiv.appendChild(document.createElement('br'))
  formFieldsDiv.appendChild(editModalAddPhotoFormCategory)
  formFieldsDiv.appendChild(editModalAddPhotoFormCategoryInput)

  const validateButton = document.createElement('button')
  validateButton.id = 'edit-add-photo-button'
  validateButton.innerText = 'Valider'
  editModalAddPhotoForm.appendChild(validateButton) // Moved inside the form

  editModalContent.appendChild(editModalCloseButton)
  editModalContent.appendChild(editModalTitle)
  editModalContent.appendChild(editModalAddPhotoForm)

  editModal.appendChild(editModalContent)

  document.body.appendChild(editModal)

  editModalAddPhotoButton.addEventListener('change', function (e) {
    var fileName = e.target.value.split('\\').pop()
    if (fileName) {
      // 当用户选择了文件后，隐藏customUploadLabel和uploadDescription
      customUploadLabel.style.display = 'none'
      uploadDescription.style.display = 'none'

      // 设置thumbnail的高度为100%
      thumbnail.style.height = '100%'
    } else {
      customUploadLabel.textContent = '+ Ajout'
      customUploadLabel.style.display = ''
      uploadDescription.style.display = ''
    }

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        thumbnail.src = e.target.result
      }
      reader.readAsDataURL(fileInput.files[0])
    }
  })
}