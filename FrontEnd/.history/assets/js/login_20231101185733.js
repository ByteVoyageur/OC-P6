console.log('login.js is being executed')
const loginForm = document.getElementById('login-page-form')

loginForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const email = document.getElementById('user-email').value
  const password = document.getElementById('user-password').value

  const requestData = {
    email: email,
    password: password,
  }

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        console.log('Logged in successfully', data.token)
        localStorage.setItem('token', data.token)
        window.location.href = 'index.html'
      } else {
        const errorMessageDiv = document.getElementById('error-message')

        errorMessageDiv.textContent =
          data.message || "Une erreur s'est produite lors de la connexion."

        errorMessageDiv.style.display = 'block'
      }
    })
    .catch((error) => {
      console.error('Error during login', error)
    })
})

if (localStorage.getItem('token')) {
  const editGalleryButton = document.getElementById('editGalleryButton')
  const editModeIndicator = document.getElementById('editModeIndicator')
  const editIcon = document.getElementById('editIcon')

  editGalleryButton.classList.add('show')
  editGalleryButton.addEventListener('click', showModal)
  editModeIndicator.classList.add('show')
  editIcon.classList.add('show')
}
