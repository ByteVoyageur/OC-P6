document.addEventListener('DOMContentLoaded', function () {

  const apiEndpoint = 'http://localhost:5678/api/works'

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      const galleryDiv = document.querySelector('.gallery')
      
    .catch((error) => {
      console.error('Error fetching data:', error)
    })

    const buttons = document.querySelectorAll('#categories button')

    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        const category = button.getAttribute('data-category')
        displayData(category === 'tous' ? data : data.filter(item => item.category.name === category))
      })
})

function displayData(data) {
  const galleryDiv = document.querySelector('.gallery')
  galleryDiv.innerHTML = ''
  filterData(data).forEach((item) => {data.forEach((item) => {
        let figure = document.createElement('figure')

        let img = document.createElement('img')
        img.src = item.imageUrl 
        img.alt = item.title 

        let figcaption = document.createElement('figcaption')
        figcaption.textContent = item.title

        figure.appendChild(img)
        figure.appendChild(figcaption)

        galleryDiv.appendChild(figure)
      })
    })
  })   