document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.querySelector('nav ul li:nth-child(3)')
  const closeButton = document.getElementById('close-login-dialog')
  const loginDialog = document.getElementById('login-dialog')

  loginButton.addEventListener('click', function () {
    console.log('Login button clicked!')
    loginDialog.classList.add('login-dialog-visible')
    loginDialog.classList.remove('login-dialog-hidden')
  })

  closeButton.addEventListener('click', function () {
    loginDialog.classList.add('login-dialog-hidden')
    loginDialog.classList.remove('login-dialog-visible')
  })
})
