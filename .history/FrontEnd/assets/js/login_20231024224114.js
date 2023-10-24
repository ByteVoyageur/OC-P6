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
        console.error('Login error', data)
        alert(data.message || "Une erreur s'est produite lors de la connexion.")
      }
    })
    .catch((error) => {
      // Handle any other errors
      console.error('Error during login', error)
    })
})

const forgotPasswordLink = document.getElementById('forgot-password-link')
forgotPasswordLink.addEventListener('click', function () {
  console.log('Forgot password link clicked')
})
