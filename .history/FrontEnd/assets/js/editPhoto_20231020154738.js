function createAddPhotoModal() {
  const editModal = document.createElement('div')
  editModal.id = 'addPhotoModal'
  editModal.classList.add('edit-modal', 'modalOverlay', 'show') // Add the modalOverlay and show classes

  const editModalContent = document.createElement('div')
  editModalContent.classList.add('modal-content')

  const editModalCloseButton = document.createElement('button')
  editModalCloseButton.innerText = 'X'
  editModalCloseButton.classList.add('close-button')
  editModalCloseButton.addEventListener('click', function () {
    editModal.classList.remove('show') // Hide the modal when the close button is clicked
  })

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

  // Add the modal to the body of the document
  document.body.appendChild(editModal)
}
