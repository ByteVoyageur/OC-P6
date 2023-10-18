document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form')
  const errorMessage = document.getElementById('error-message')

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault() // 防止默认的表单提交行为

    const email = loginForm['email'].value
    const password = loginForm['password'].value

    // 发送登录请求
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
          // 登录成功
          localStorage.setItem('token', data.token) // 存储token，以供后续使用
          window.location.href = 'dashboard.html' // 例如，转到仪表板页面
        } else {
          // 显示错误消息
          errorMessage.textContent = 'Invalid email or password'
        }
      })
      .catch((error) => {
        console.error('Login error:', error)
        errorMessage.textContent = 'An error occurred. Please try again.'
      })
  })
})
