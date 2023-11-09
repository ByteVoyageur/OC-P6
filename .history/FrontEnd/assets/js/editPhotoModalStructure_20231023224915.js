function createAddPhotoModal() {
  modalOverlay.classList.remove('show')
  const editModal = document.createElement('div')
  editModal.id = 'editModalOverlay'
  editModal.classList.add('show')

  const editModalContent = document.createElement('div')
  editModalContent.classList.add('modal-content')

  const backIcon = document.createElement('i')
  backIcon.classList.add('fa-solid', 'fa-arrow-left', 'back-icon')
  editModalContent.appendChild(backIcon)
  backIcon.addEventListener('click', function () {
    editModal.classList.remove('show')
    modalOverlay.classList.add('show')
  })

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

  editModalAddPhotoButton.addEventListener('change', function (e) {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = function (event) {
        thumbnail.src = event.target.result
        thumbnail.classList.remove('hidden-upload')

        customUploadLabel.classList.add('hidden-upload')
        uploadDescription.classList.add('hidden-upload')
      }
      reader.readAsDataURL(file)
    } else {
      customUploadLabel.classList.remove('hidden-upload')
      uploadDescription.classList.remove('hidden-upload')
      thumbnail.classList.add('hidden-upload')
    }
  })

  uploadDiv.appendChild(editModalAddPhotoButton)

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

  // Fetch categories from the API and populate the dropdown
  fetchCategories().then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement('option')
      option.value = category.id
      option.textContent = category.name
      editModalAddPhotoFormCategoryInput.appendChild(option)
    })
  })

  editModalAddPhotoForm.appendChild(uploadDiv)

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
  editModalAddPhotoForm.appendChild(validateButton)

  validateButton.addEventListener('click', function (event) {
    console.log('Valider button clicked')
    // 如果需要阻止默认的提交行为，可以在此处添加 event.preventDefault();
  })

  editModalContent.appendChild(editModalCloseButton)
  editModalContent.appendChild(editModalTitle)
  editModalContent.appendChild(editModalAddPhotoForm)

  editModal.appendChild(editModalContent)

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
