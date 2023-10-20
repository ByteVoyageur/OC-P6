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
  editModal.id = 'modalOverlay'
  editModal.classList.add('show') // Add the modalOverlay and show classes

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

  const editModalAddPhotoButtonLabel = document.createElement('label')
  editModalAddPhotoButtonLabel.innerText = 'Ajouter une photo'
  editModalAddPhotoButtonLabel.setAttribute('for', 'photo-upload')
  const editModalAddPhotoButton = document.createElement('input')
  editModalAddPhotoButton.type = 'file'
  editModalAddPhotoButton.id = 'photo-upload'

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

  // Add options to the category dropdown
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

  // Add photo button comes first
  editModalAddPhotoForm.appendChild(editModalAddPhotoButtonLabel)
  editModalAddPhotoForm.appendChild(editModalAddPhotoButton)
  editModalAddPhotoForm.appendChild(document.createElement('br')) // Separate add photo button and title
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormTitle)
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormTitleInput)
  editModalAddPhotoForm.appendChild(document.createElement('br')) // Separate title and category
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormCategory)
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormCategoryInput)

  // Add the modal to the body of the document
  document.body.appendChild(editModal)
}
