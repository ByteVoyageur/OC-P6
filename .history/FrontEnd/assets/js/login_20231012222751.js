document.addEventListener('DOMContentLoaded', function () {
  // References to the login button, close button and login dialog
  const loginButton = document.querySelector('nav ul li:nth-child(3)')
  const loginDialog = document.getElementById('login-dialog')

  // Show the login dialog when the login button is clicked
  loginButton.addEventListener('click', function () {
    console.log('Login button clicked!')
    loginDialog.classList.add('login-dialog-visible')
    loginDialog.classList.remove('login-dialog-hidden')
  })
})
