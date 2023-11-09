function createAddPhotoModal() {
  const editModal = document.createElement('div')
  modal.id = 'addPhotoModal'
  modal.classList.add('edit-modal')

  const editModalContent = document.createElement('div')
  editModalContent.classList.add('edit-modal-content')

  const editModalCloseButton = document.createElement('button')
  editModalCloseButton.innerText = 'X'
  closeModalButton.classList.add('close-button')

  const editModalTitle = document.createElement('h2')
  editModalTitle.innerText = 'Ajout photo'

  const editModalAddPhotoForm = document.createElement('form')
  editModalAddPhotoForm.id = 'add-photo-form'
  editModalAddPhotoForm.setAttribute('enctype', 'multipart/form-data')

  const editModalAddPhotoFormTitle = document.createElement('label')
  editModalAddPhotoFormTitle.innerText = 'Titre'
  editModalAddPhotoFormTitle.setAttribute('for', 'photo-title')
  editModalAddPhotoFormTitle.required = true
  const editModalAddPhotoFormTitleInput = document.createElement('input')
  editModalAddPhotoFormTitleInput.type = 'text'
  editModalAddPhotoFormTitleInput.id = 'photo-title'

  const editModalAddPhotoFormCategory = document.createElement('label')
  editModalAddPhotoFormCategory.innerText = 'Catégorie'
  editModalAddPhotoFormCategory.setAttribute('for', 'photo-category')
  editModalAddPhotoFormCategory.required = true
  const editModalAddPhotoFormCategoryInput = document.createElement('select')
  editModalAddPhotoFormCategoryInput.id = 'photo-category'

  editModal.appendChild(editModalContent)
  editModalContent.appendChild(editModalCloseButton)
  editModalContent.appendChild(editModalTitle)
  editModalContent.appendChild(editModalAddPhotoForm)
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormTitle)
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormTitleInput)
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormCategory)
  editModalAddPhotoForm.appendChild(editModalAddPhotoFormCategoryInput)
}
