console.log('createAddPhotoModalStructure function is begining')
function createAddPhotoModalStructure() {
  const editModal = document.createElement('div')
  editModal.id = 'editModalOverlay'
  editModal.classList.add('show')

  const editModalContent = document.createElement('div')
  editModalContent.classList.add('modal-content')

  const backIcon = createBackIcon()
  const editModalCloseButton = createCloseButton()
  const editModalTitle = createModalTitle()
  const editModalAddPhotoForm = createPhotoForm()

  editModalContent.appendChild(backIcon)
  editModalContent.appendChild(editModalCloseButton)
  editModalContent.appendChild(editModalTitle)
  editModalContent.appendChild(editModalAddPhotoForm)
  editModal.appendChild(editModalContent)

  return editModal
}

function createBackIcon() {
  const backIcon = document.createElement('i')
  backIcon.classList.add('fa-solid', 'fa-arrow-left', 'back-icon')
  return backIcon
}

function createCloseButton() {
  const closeButton = document.createElement('button')
  closeButton.innerText = 'X'
  closeButton.classList.add('close-button')
  return closeButton
}

function createModalTitle() {
  const title = document.createElement('h2')
  title.innerText = 'Ajout photo'
  return title
}

function createPhotoForm() {
  const form = document.createElement('form')
  form.id = 'add-photo-form'
  form.setAttribute('enctype', 'multipart/form-data')

  const uploadDiv = createUploadDiv()
  const fieldsDiv = createFieldsDiv()
  const validateButton = createValidateButton()

  form.appendChild(uploadDiv)
  form.appendChild(fieldsDiv)
  form.appendChild(validateButton)

  return form
}

function createUploadDiv() {
  const uploadDiv = document.createElement('div')
  uploadDiv.classList.add('upload-div')

  const editModalAddPhotoButton = document.createElement('input')
  editModalAddPhotoButton.type = 'file'
  editModalAddPhotoButton.id = 'photo-upload'
  editModalAddPhotoButton.classList.add('hidden-upload')

  const customUploadLabel = createCustomUploadLabel()
  const uploadDescription = createUploadDescription()
  const thumbnailContainer = createThumbnailContainer()

  uploadDiv.appendChild(editModalAddPhotoButton)
  uploadDiv.appendChild(customUploadLabel)
  uploadDiv.appendChild(uploadDescription)
  uploadDiv.appendChild(thumbnailContainer)

  return uploadDiv
}

function createCustomUploadLabel() {
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
  customUploadLabel.appendChild(addButton)

  return customUploadLabel
}

function createUploadDescription() {
  const uploadDescription = document.createElement('p')
  uploadDescription.innerText = 'jpg, png: 4MB max'
  uploadDescription.id = 'upload-description'
  return uploadDescription
}

function createThumbnailContainer() {
  const thumbnailContainer = document.createElement('div')
  thumbnailContainer.classList.add('thumbnail-container')
  const thumbnail = document.createElement('img')
  thumbnail.id = 'selectedImageThumbnail'
  thumbnailContainer.appendChild(thumbnail)

  return thumbnailContainer
}

function createFieldsDiv() {
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

  formFieldsDiv.appendChild(editModalAddPhotoFormTitle)
  formFieldsDiv.appendChild(editModalAddPhotoFormTitleInput)
  formFieldsDiv.appendChild(editModalAddPhotoFormCategory)
  formFieldsDiv.appendChild(editModalAddPhotoFormCategoryInput)

  return formFieldsDiv
}

function createValidateButton() {
  const validateButton = document.createElement('button')
  validateButton.id = 'edit-add-photo-button'
  validateButton.innerText = 'Valider'
  return validateButton
}

export { createAddPhotoModalStructure }

console.log('createEditPhotoModalStructure function is end')
