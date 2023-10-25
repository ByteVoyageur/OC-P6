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
  uploadDiv.appendChild(editModalAddPhotoButton)

  const customUploadLabel = document.createElement('label')
  customUploadLabel.setAttribute('for', 'photo-upload')
  customUploadLabel.classList.add('customFileUpload')
  uploadDiv.appendChild(customUploadLabel)

  const uploadIcon = document.createElement('i')
  uploadIcon.classList.add('fa-regular', 'fa-image')
  customUploadLabel.appendChild(uploadIcon)

  const addButton = document.createElement('button')
  addButton.innerText = '+ Ajouter photo'
  customUploadLabel.appendChild(addButton)

  const uploadDescription = document.createElement('p')
  uploadDescription.innerText = 'jpg, png: 4MB max'
  uploadDescription.id = 'upload-description'
  uploadDiv.appendChild(uploadDescription)

  const thumbnailContainer = document.createElement('div')
  thumbnailContainer.classList.add('thumbnail-container')
  const thumbnail = document.createElement('img')
  thumbnail.id = 'selectedImageThumbnail'
  thumbnailContainer.appendChild(thumbnail)
  uploadDiv.appendChild(thumbnailContainer)

  return uploadDiv
}

function createFormFieldsDiv() {
  const formFieldsDiv = document.createElement('div')
  formFieldsDiv.classList.add('title-category-div')

  const editModalAddPhotoFormTitle = document.createElement('label')
  editModalAddPhotoFormTitle.innerText = 'Titre'
  editModalAddPhotoFormTitle.setAttribute('for', 'photo-title')
  formFieldsDiv.appendChild(editModalAddPhotoFormTitle)

  const editModalAddPhotoFormTitleInput = document.createElement('input')
  editModalAddPhotoFormTitleInput.type = 'text'
  editModalAddPhotoFormTitleInput.id = 'photo-title'
  editModalAddPhotoFormTitleInput.required = true
  formFieldsDiv.appendChild(editModalAddPhotoFormTitleInput)

  const editModalAddPhotoFormCategory = document.createElement('label')
  editModalAddPhotoFormCategory.innerText = 'Catégorie'
  editModalAddPhotoFormCategory.setAttribute('for', 'photo-category')
  formFieldsDiv.appendChild(editModalAddPhotoFormCategory)

  const editModalAddPhotoFormCategoryInput = document.createElement('select')
  editModalAddPhotoFormCategoryInput.id = 'photo-category'
  editModalAddPhotoFormCategoryInput.required = true
  formFieldsDiv.appendChild(editModalAddPhotoFormCategoryInput)

  // Fetch categories from the API and populate the dropdown
  fetchCategories().then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement('option')
      option.value = category.id
      option.textContent = category.name
      editModalAddPhotoFormCategoryInput.appendChild(option)
    })
  })

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
