document.addEventListener('DOMContentLoaded', function () {
  const apiEndpoint = 'http://localhost:5678/api/works'
  let data

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((fetchedData) => {
      data = fetchedData
      displayData(data)

      const buttons = document.querySelectorAll('#category-buttons button')

      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const category = button.getAttribute('data-category')
          displayData(
            category === 'tous'
              ? data
              : data.filter((item) => item.category.name === category)
          )
        })
      })
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })

  function displayData(filteredData) {
    const galleryDiv = document.querySelector('.gallery')
    galleryDiv.innerHTML = ''
    filteredData.forEach((item) => {
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
  }
})
