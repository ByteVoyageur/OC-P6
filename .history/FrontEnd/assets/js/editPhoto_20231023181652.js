console.log('editPhoto.js is starting')

document.body.addEventListener('click', function (event) {
  // Check if the clicked element is "add-photo-button"
  if (event.target && event.target.id === 'add-photo-button') {
    console.log('Add photo button clicked')
    createAddPhotoModal()
  }
})
