document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form')
  const errorMessage = document.getElementById('error-message')

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault() // Empêche le comportement par défaut du formulaire

    const email = loginForm['email'].value
    const password = loginForm['password'].value

    // Envoyer la requête de connexion
    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Connexion réussie
          localStorage.setItem('token', data.token) // Stocker le token pour une utilisation ultérieure
          window.location.href = 'index.html' // Redirection vers la page d'accueil
        } else {
          // Afficher un message d'erreur
          errorMessage.textContent = 'Email ou mot de passe incorrect'
        }
      })
      .catch((error) => {
        console.error('Erreur de connexion:', error)
        errorMessage.textContent =
          'Une erreur est survenue. Veuillez réessayer.'
      })
  })
})
