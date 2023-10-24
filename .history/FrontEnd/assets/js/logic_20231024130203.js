function initializeAddPhotoModalLogic() {
  const editModal = createAddPhotoModalStructure()
  document.body.appendChild(editModal)

  const backIcon = editModal.querySelector('.back-icon')
  backIcon.addEventListener('click', function () {
    editModal.classList.remove('show')
    modalOverlay.classList.add('show')
  })

  const closeButton = editModal.querySelector('.close-button')
  closeButton.addEventListener('click', function () {
    editModal.classList.remove('show')
  })

  const uploadButton = editModal.querySelector('#photo-upload')
  uploadButton.addEventListener('change', uploadChangeHandler)

  const validateButton = editModal.querySelector('#edit-add-photo-button')
  validateButton.addEventListener('click', validateButtonClickHandler)
}

function uploadChangeHandler(e) {
  const file = e.target.files[0]
  const customUploadLabel = e.target.nextElementSibling
  const uploadDescription = customUploadLabel.nextElementSibling
  const thumbnail = uploadDescription.nextElementSibling.querySelector('img')

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
}

function validateButtonClickHandler(e) {
  e.preventDefault()
  console.log('Valider button clicked')

  const titleValue = e.target.parentElement.querySelector('#photo-title').value
  const selectedFile =
    e.target.parentElement.querySelector('#photo-upload').files[0]
  const categoryValue =
    e.target.parentElement.querySelector('#photo-category').value

  if (!titleValue) {
    console.error('Title is required')
    return
  }

  if (!selectedFile) {
    console.error('A photo must be uploaded')
    return
  }

  if (!categoryValue) {
    console.error('Category must be selected')
    return
  }

  submitButtonClickHandler(titleValue, selectedFile, categoryValue)
}

function submitButtonClickHandler(title, file, category) {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('image', file)
  formData.append('categoryId', category)
  formData.append('userId', localStorage.getItem('userId'))

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Upload response:', data)
    })
    .catch((error) => {
      console.error('Error uploading photo:', error)
    })
}

async function fetchCategories() {
  try {
    let response = await fetch('http://localhost:5678/api/categories')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    let categories = await response.json()
    populateCategoryDropdown(categories)
  } catch (error) {
    console.error('There was a problem fetching the categories:', error)
  }
}

function populateCategoryDropdown(categories) {
  const categoryDropdown = document.querySelector('#photo-category')
  categories.forEach((category) => {
    const option = document.createElement('option')
    option.value = category.id
    option.textContent = category.name
    categoryDropdown.appendChild(option)
  })
}

initializeAddPhotoModalLogic()
