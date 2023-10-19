document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('token')) {
    const editGalleryButton = document.getElementById('editGalleryButton')
    editGalleryButton.classList.add('show') // 使用CSS类来控制显示
    editGalleryButton.addEventListener('click', showModal)
  }

  function displayMiniGallery(data, container) {
    const miniGalleryDiv = container || document.createElement('div')
    miniGalleryDiv.className = 'mini-gallery'

    data.forEach((item) => {
      let figure = document.createElement('figure')

      let img = document.createElement('img')
      img.src = item.imageUrl
      img.alt = item.title

      figure.appendChild(img)
      miniGalleryDiv.appendChild(figure)
    })

    return miniGalleryDiv
  }

  function showModal() {
    console.log('showModal function is called')
    let modalOverlay = document.getElementById('modalOverlay')
    let modalContent

    if (!modalOverlay) {
      modalOverlay = document.createElement('div')
      modalOverlay.id = 'modalOverlay'

      modalContent = document.createElement('div')

      const modalText = document.createElement('p')
      modalText.innerText = 'Gallery photo '

      const closeModalButton = document.createElement('button')
      closeModalButton.innerText = 'X'

      closeModalButton.addEventListener('click', function () {
        document.body.removeChild(modalOverlay)
      })

      modalContent.appendChild(modalText)
      modalContent.appendChild(closeModalButton)
      const miniGalleryDiv = document.createElement('div')
      miniGalleryDiv.className = 'mini-gallery'
      modalContent.appendChild(miniGalleryDiv)

      modalOverlay.appendChild(modalContent)
      document.body.appendChild(modalOverlay)
    } else {
      modalOverlay.classList.add('show') // 使用CSS类来控制显示
    }

    fetch('http://localhost:5678/api/works')
      .then((response) => response.json())
      .then((data) => {
        const miniGallery = displayMiniGallery(data, miniGalleryDiv)
        modalContent.appendChild(miniGallery)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }

  console.log('galleryManager.js is loaded')
})
