document.addEventListener('DOMContentLoaded', function () {
  // Get the login form using its ID
  const loginForm = document.getElementById('login-page-form')

  // Add an event listener for form submission
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
          // If successful, store the authentication token (consider using cookies or local storage)
          console.log('Logged in successfully', data.token)

          // Redirect to the home page or dashboard
          window.location.href = '/path-to-home-page' // Update the path as needed
        } else {
          // Handle login error (e.g., show an error message to the user)
          console.error('Login error', data)
        }
      })
      .catch((error) => {
        // Handle any other errors
        console.error('Error during login', error)
      })
  })

  // If you wish to implement a "forgot password" functionality,
  // you can add an event listener to the "forgot-password-link" as well.
  const forgotPasswordLink = document.getElementById('forgot-password-link')
  forgotPasswordLink.addEventListener('click', function () {
    // Handle "forgot password" logic here
    console.log('Forgot password link clicked')
  })
})
