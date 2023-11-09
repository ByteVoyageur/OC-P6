document.addEventListener('DOMContentLoaded', function () {
  // References to the login button, close button and login dialog
  const loginButton = document.querySelector('nav ul li:nth-child(3)')
  const closeButton = document.getElementById('close-login-dialog')
  const loginDialog = document.getElementById('login-dialog')

  // Show the login dialog when the login button is clicked
  loginButton.addEventListener('click', function () {
    console.log('Login button clicked!')
    loginDialog.classList.add('login-dialog-visible')
    loginDialog.classList.remove('login-dialog-hidden')
  })

  // Hide the login dialog when the close button is clicked
  closeButton.addEventListener('click', function () {
    console.log('Login button clicked!')
    loginDialog.classList.add('login-dialog-hidden')
    loginDialog.classList.remove('login-dialog-visible')
  })
})
