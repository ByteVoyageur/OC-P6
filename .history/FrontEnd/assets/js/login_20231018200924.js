document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-page-form')

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
          console.log('Logged in successfully', data.token)

          window.location.href = 'index.html'
        } else {
          console.error('Login error', data)
          alert(
            data.message || "Une erreur s'est produite lors de la connexion."
          )
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
})
