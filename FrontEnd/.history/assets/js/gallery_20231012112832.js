document.addEventListener('DOMContentLoaded', function () {
  // Fetch the data from the API
  const apiEndpoint = 'http://localhost:5678/api/works'
  let data

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((fetchedData) => {
      data = fetchedData
      displayData(data) // Display all data initially

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
    galleryDiv.innerHTML = '' // Clear existing content
    filteredData.forEach((item) => {
      // Create and append new DOM elements to display filtered data
      // ...
    })
  }
})
