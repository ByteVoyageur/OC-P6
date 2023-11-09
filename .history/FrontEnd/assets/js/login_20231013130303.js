document.addEventListener('DOMContentLoaded', function () {
  const forgotPasswordLink = document.getElementById('forgot-password-link')
  forgotPasswordLink.addEventListener('click', function () {
    alert(
      "Veuillez contacter l'administrateur pour réinitialiser votre mot de passe."
    )
  })

  const loginForm = document.getElementById('login-page-form')
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const userEmail = document.getElementById('user-email').value
    const userPassword = document.getElementById('user-password').value

    if (userEmail === '' || userPassword === '') {
      alert('Veuillez remplir tous les champs.')
      return
    }

    alert('Login effectué avec succès!')
  })
})
