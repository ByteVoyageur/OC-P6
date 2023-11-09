document.addEventListener('DOMContentLoaded', function () {
  // Check if the user is logged in
  if (localStorage.getItem('token')) {
    // Display the Modifier button if the user is logged in
    const editGalleryButton = document.getElementById('editGalleryButton')
    editGalleryButton.style.display = 'block'

    // Add click event listener to the Modifier button to open the edit window
    editGalleryButton.addEventListener('click', function () {
      const editWindow = document.getElementById('editWindow')
      editWindow.style.display = 'block'
    })

    // Add functionality to the add button inside the edit window
    const addButton = document.getElementById('addButton')
    addButton.addEventListener('click', function () {
      // Your logic to add new content goes here...
      console.log('Add button clicked')
    })
  }
})
