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

function createBackIcon() {
  const backIcon = document.createElement('i')
  backIcon.classList.add('fa-solid', 'fa-arrow-left', 'back-icon')
  backIcon.addEventListener('click', function () {
    document.getElementById('editModalOverlay').classList.remove('show')
    modalOverlay.classList.add('show')
  })
  return backIcon
}

function createCloseButton() {
  const closeButton = document.createElement('button')
  closeButton.innerText = 'X'
  closeButton.classList.add('close-button')
  closeButton.addEventListener('click', function () {
    document.getElementById('editModalOverlay').classList.remove('show')
  })
  return closeButton
}

function createUploadDiv() {
  const uploadDiv = document.createElement('div')
  uploadDiv.classList.add('upload-div')

  const editModalAddPhotoButton = document.createElement('input')
  editModalAddPhotoButton.type = 'file'
  editModalAddPhotoButton.id = 'photo-upload'
  editModalAddPhotoButton.classList.add('hidden-upload')
  // ... 这里还有相关的事件处理逻辑 ...

  const customUploadLabel = document.createElement('label')
  // ... 这里还有customUploadLabel的相关逻辑 ...

  const uploadDescription = document.createElement('p')
  uploadDescription.innerText = 'jpg, png: 4MB max'
  uploadDescription.id = 'upload-description'

  const thumbnailContainer = document.createElement('div')
  thumbnailContainer.classList.add('thumbnail-container')
  const thumbnail = document.createElement('img')
  thumbnail.id = 'selectedImageThumbnail'
  thumbnailContainer.appendChild(thumbnail)

  // ... 这里还有其他的appendChild操作 ...

  return uploadDiv
}

function createFormFieldsDiv() {
  const formFieldsDiv = document.createElement('div')
  formFieldsDiv.classList.add('title-category-div')

  const editModalAddPhotoFormTitle = document.createElement('label')
  // ... 以下是editModalAddPhotoFormTitle和其他相关元素的逻辑 ...

  const editModalAddPhotoFormCategoryInput = document.createElement('select')
  // ... 这里还有editModalAddPhotoFormCategoryInput的相关逻辑 ...

  fetchCategories().then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement('option')
      option.value = category.id
      option.textContent = category.name
      editModalAddPhotoFormCategoryInput.appendChild(option)
    })
  })

  // ... 这里还有其他的appendChild操作 ...

  return formFieldsDiv
}

function createAddPhotoModal() {
  modalOverlay.classList.remove('show')
  const editModal = document.createElement('div')
  editModal.id = 'editModalOverlay'
  editModal.classList.add('show')

  const editModalContent = document.createElement('div')
  editModalContent.classList.add('modal-content')

  editModalContent.appendChild(createBackIcon())
  editModalContent.appendChild(createCloseButton())
  editModalContent.appendChild(createUploadDiv())
  editModalContent.appendChild(createFormFieldsDiv())

  const editModalTitle = document.createElement('h2')
  editModalTitle.innerText = 'Ajout photo'
  editModalContent.appendChild(editModalTitle)

  const editModalAddPhotoForm = document.createElement('form')
  editModalAddPhotoForm.id = 'add-photo-form'
  editModalAddPhotoForm.setAttribute('enctype', 'multipart/form-data')
  editModalContent.appendChild(editModalAddPhotoForm)

  const validateButton = document.createElement('button')
  validateButton.id = 'edit-add-photo-button'
  validateButton.innerText = 'Valider'
  editModalAddPhotoForm.appendChild(validateButton)

  editModal.appendChild(editModalContent)
  document.body.appendChild(editModal)

  initializeAddPhotoModalLogic()
}
