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

  fetch(apiEndpointUsers, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
   c
      } else {
        const errorMessageDiv = document.getElementById('error-message')

        errorMessageDiv.textContent =
          data.message ||
          'Authentication failed. Please check your email and password and try again.'

        errorMessageDiv.style.display = 'block'
      }
    })
    .catch((error) => {
      console.error('Error during login', error)
      const errorMessageDiv = document.getElementById('error-message')
      errorMessageDiv.textContent =
        'Cannot connect to the server. Please check your network connection and try again.'
      errorMessageDiv.style.display = 'block'
    })
})

console.log('login.js has been executed')
