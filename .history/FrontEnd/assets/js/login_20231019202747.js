document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-page-form')
  const errorMessage = document.getElementById('error-message')

  if (!loginForm) {
    console.error('Cannot find element with id "login-page-form".')
    return // Exit the function early
  }

  loginForm.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault()

    // Get user input values
    const email = document.getElementById('user-email').value
    const password = document.getElementById('user-password').value

    // Construct the request payload
    const requestData = {
      email: email,
      password: password,
    }

// Make the API call to login the user
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
        console.log('Logged in successfully!', data.token);
        
        // Handle the display of elements based on login success
        const editGalleryButton = document.getElementById('editGalleryButton')
        if (editGalleryButton) {
            editGalleryButton.style.display = 'block';
        } else {
            console.error('Cannot find element with id "editGalleryButton".')
        }

        const categoryButtons = document.querySelectorAll('#category-buttons button')
        if (categoryButtons && categoryButtons.length >= 4) {
            for (let i = 0; i < 4; i++) {
                categoryButtons[i].style.display = 'none'
            }
        } else {
            console.error('Cannot find the expected buttons inside #category-buttons.')
        }
        
        localStorage.setItem('token', data.token)
        window.location.href = 'index.html'
    } else {
        handleLoginFailure(errorMessage);
    }
  })
  .catch((error) => {
    console.error('Error during login:', error)
    displayError("Une erreur s'est produite lors de la connexion.")
  })



  function displayError(message) {
    errorMessage.textContent = message
    errorMessage.style.display = 'block'
  }

  const forgotPasswordLink = document.getElementById('forgot-password-link')
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function () {
      console.log('Forgot password link clicked')
    })
  } else {
    console.error('forgot-password-link element not found!')
  }
})
