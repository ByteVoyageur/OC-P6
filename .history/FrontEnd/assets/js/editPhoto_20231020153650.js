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
  editModal.id = 'addPhotoModal'
  editModal.classList.add('edit-modal')

  const editModalContent = document.createElement('div')
  editModalContent.classList.add('edit-modal-content')

  const editModalCloseButton = document.createElement('button')
  editModalCloseButton.innerText = 'X'
  editModalCloseButton.classList.add('close-button')

  const editModalTitle = document.createElement('h2')
  editModalTitle.innerText = 'Ajout photo'

  const editModalAddPhotoForm = document.createElement('form')
  editModalAddPhotoForm.id = 'add-photo-form'
  editModalAddPhotoForm.setAttribute('enctype', 'multipart/form-data')

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

  editModal.appendChild(editModalContent)
  editModalContent.appendChild(editModalCloseButton)
  editModalContent.appendChild(editModalTitle)
  editModalContent.appendChild(editModalAddPhotoForm)
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormTitle)
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormTitleInput)
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormCategory)
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormCategoryInput)
}
