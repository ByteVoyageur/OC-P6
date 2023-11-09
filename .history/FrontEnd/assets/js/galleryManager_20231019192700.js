function handleLoginSuccess() {
  // Show the editGalleryButton
  const editGalleryButton = document.getElementById('editGalleryButton')
  editGalleryButton.style.display = 'block'

  // Hide the first four buttons inside #category-buttons
  const categoryButtons = document.querySelectorAll('#category-buttons button')
  for (let i = 0; i < 4; i++) {
    categoryButtons[i].style.display = 'none'
  }

  // ... (您可能还有其他登录成功后的操作)
}

function handleLoginFailure(errorMessage) {
  errorMessage.textContent = 'Login failed. Please check your credentials.'
}
