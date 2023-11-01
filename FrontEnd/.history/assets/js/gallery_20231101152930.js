const categoryButtonsDiv = document.querySelector('#category-buttons')

if (localStorage.getItem('token')) {
  // If the user is logged in, hide the #category-buttons div
  categoryButtonsDiv.style.display = 'none'
}

const apiEndpointWorks = 'http://localhost:5678/api/works'
const apiEndpointCategories = 'http://localhost:5678/api/categories'
let data

fetch(apiEndpointCategories)
  .then((response) => response.json())
  .then((categories) => {
    // Add "Tous" category to the beginning of the categories list
    categories.unshift({ name: 'Tous', id: null })

    categories.forEach((category) => {
      let button = document.createElement('button')
      button.textContent = category.name
      button.setAttribute('data-category-id', category.id) // Using ID directly
      categoryButtonsDiv.appendChild(button)
    })

    // Fetch the works data
    return fetch(apiEndpointWorks)
  })
  .then((response) => response.json())
  .then((fetchedData) => {
    data = fetchedData
    displayData(data)

    const buttons = document.querySelectorAll('#category-buttons button')
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const categoryId = button.getAttribute('data-category-id')
        const filtered =
          categoryId === 'tous'
            ? data
            : data.filter((item) => item.categoryId === categoryId)
        displayData(filtered)
      })
    })
  })
  .catch((error) => {
    console.error('Error fetching data:', error)
  })

function displayData(filteredData, container) {
  const galleryDiv = container || document.querySelector('.gallery')
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
