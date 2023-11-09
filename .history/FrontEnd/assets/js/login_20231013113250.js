document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('loginBtn')
  const loginOverlay = document.getElementById('loginOverlay')
  const closeButton = document.getElementById('close-login-dialog')

  loginBtn.addEventListener('click', function () {
    loginOverlay.style.display = 'block'
  })

  closeButton.addEventListener('click', function () {
    loginOverlay.style.display = 'none'
  })

  loginOverlay.addEventListener('click', function (e) {
    if (e.target === loginOverlay) {
      loginOverlay.style.display = 'none'
    }
  })
})
