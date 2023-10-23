console.log('editPhoto.js is starting')

// Use event delegation on the body to listen for click events
document.body.addEventListener('click', function (event) {
  // Check if the clicked element is "add-photo-button"
  if (event.target && event.target.id === 'add-photo-button') {
    console.log('Add photo button clicked')
    createAddPhotoModal()
  }
})

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
  uploadDescription.classList.add('upload-description')

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

  editModalAddPhotoForm.appendChild(uploadDiv)
  uploadDiv.appendChild(editModalAddPhotoButton)
  uploadDiv.appendChild(customUploadLabel)
  uploadDiv.appendChild(uploadDescription)

  editModalAddPhotoForm.appendChild(document.createElement('br'))
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormTitle)
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormTitleInput)
  editModalAddPhotoForm.appendChild(document.createElement('br'))
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormCategory)
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormCategoryInput)

  document.body.appendChild(editModal)

  editModalAddPhotoButton.addEventListener('change', function (e) {
    var fileName = e.target.value.split('\\').pop()
    if (fileName) {
      customUploadLabel.textContent = fileName
    } else {
      customUploadLabel.textContent = '+ Ajout'
    }
  })
}
