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
  // ... 这里需要完整的uploadDiv创建逻辑 ...

  return uploadDiv
}

function createFormFieldsDiv() {
  const formFieldsDiv = document.createElement('div')
  formFieldsDiv.classList.add('title-category-div')
  // ... 这里需要完整的formFieldsDiv创建逻辑 ...

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

  const editModalTitle = document.createElement('h2')
  editModalTitle.innerText = 'Ajout photo'
  editModalContent.appendChild(editModalTitle)

  const editModalAddPhotoForm = document.createElement('form')
  editModalAddPhotoForm.id = 'add-photo-form'
  editModalAddPhotoForm.setAttribute('enctype', 'multipart/form-data')

  editModalAddPhotoForm.appendChild(createUploadDiv())
  editModalAddPhotoForm.appendChild(createFormFieldsDiv())

  const validateButton = document.createElement('button')
  validateButton.id = 'edit-add-photo-button'
  validateButton.innerText = 'Valider'
  editModalAddPhotoForm.appendChild(validateButton)

  editModalContent.appendChild(editModalAddPhotoForm)
  editModal.appendChild(editModalContent)

  document.body.appendChild(editModal)

  initializeAddPhotoModalLogic()
}
