document.addEventListener('DOMContentLoaded', function () {
  // Define the categoryButtonsDiv variable by selecting the div with id "category-buttons"
  const categoryButtonsDiv = document.querySelector('#category-buttons')

  fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((categories) => {
      categories.unshift({ name: 'Tous' })
      categories.forEach((category) => {
        let button = document.createElement('button')
        button.textContent = category.name
        button.setAttribute('data-category', category.name.toLowerCase())
        categoryButtonsDiv.appendChild(button)
      })
    })
    .catch((error) => {
      console.error('Error fetching categories:', error)
    })

  const apiEndpoint = 'http://localhost:5678/api/works'
  let data

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((fetchedData) => {
      data = fetchedData
      console.log('Fetched data:', data) // Debugging statement

      displayData(data)

      const buttons = document.querySelectorAll('#category-buttons button')

      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const category = button.getAttribute('data-category')
          console.log('Clicked category:', category) // Debugging statement
          const filtered =
            category === 'tous'
              ? data
              : data.filter((item) => item.category.name === category)
          console.log('Filtered data:', filtered) // Debugging statement
          displayData(filtered)
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
