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

  const addButton = document.createElement('button')
  addButton.innerText = '+ Ajouter photo'
  addButton.addEventListener('click', function () {
    editModalAddPhotoButton.click() // Trigger the file input click event
  })
  customUploadLabel.appendChild(addButton)

  const uploadDescription = document.createElement('p')
  uploadDescription.innerText = 'jpg, png: 4MB max'
  uploadDescription.id = 'upload-description'

  const thumbnail = document.createElement('img')
  thumbnail.id = 'selectedImageThumbnail'
  thumbnail.style.height = '100%' // Ensure it takes the full height

  // Add elements to uploadDiv
  uploadDiv.appendChild(editModalAddPhotoButton)
  uploadDiv.appendChild(customUploadLabel)
  uploadDiv.appendChild(uploadDescription)
  uploadDiv.appendChild(thumbnail)

  editModalContent.appendChild(editModalCloseButton)
  editModalContent.appendChild(editModalTitle)
  editModalContent.appendChild(editModalAddPhotoForm)

  editModalAddPhotoForm.appendChild(uploadDiv)

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

  formFieldsDiv.appendChild(document.createElement('br'))
  formFieldsDiv.appendChild(editModalAddPhotoFormTitle)
  formFieldsDiv.appendChild(editModalAddPhotoFormTitleInput)
  formFieldsDiv.appendChild(document.createElement('br'))
  formFieldsDiv.appendChild(editModalAddPhotoFormCategory)
  formFieldsDiv.appendChild(editModalAddPhotoFormCategoryInput)

  editModalAddPhotoForm.appendChild(formFieldsDiv)

  fetchCategories().then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement('option')
      option.value = category.id
      option.textContent = category.name
      editModalAddPhotoFormCategoryInput.appendChild(option)
    })
  })

  const validateButton = document.createElement('button')
  validateButton.id = 'edit-add-photo-button'
  validateButton.innerText = 'Valider'
  editModalContent.appendChild(validateButton)

  document.body.appendChild(editModal)

  editModalAddPhotoButton.addEventListener('change', function (e) {
    var fileName = e.target.value.split('\\').pop()
    if (fileName) {
      customUploadLabel.style.display = 'none'
      uploadDescription.style.display = 'none'
      thumbnail.style.display = 'block'

      const reader = new FileReader()
      reader.onload = function (event) {
        thumbnail.src = event.target.result
      }
      reader.readAsDataURL(editModalAddPhotoButton.files[0])
    } else {
      customUploadLabel.style.display = 'block'
      uploadDescription.style.display = 'block'
      thumbnail.style.display = 'none'
    }
  })
}
