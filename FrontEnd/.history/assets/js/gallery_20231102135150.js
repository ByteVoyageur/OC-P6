const categoryButtonsDiv = document.querySelector('#category-buttons')

if (localStorage.getItem('token')) {
  categoryButtonsDiv.style.display = 'none'
}

const apiEndpointWorks = 'http://localhost:5678/api/works'
const apiEndpointCategories = 'http://localhost:5678/api/categories'
let data

fetch(apiEndpointCategories)
  .then((response) => response.json())
  .then((categories) => {
    // Create the "Tous" button first
    let buttonTous = document.createElement('button')
    buttonTous.textContent = 'Tous'
    categoryButtonsDiv.appendChild(buttonTous)

    // Create other category buttons
    categories.forEach((category) => {
      let button = document.createElement('button')
      button.textContent = category.name
      button.setAttribute('data-category-id', category.id.toString())
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
          !categoryId || categoryId === 'null'
            ? data
            : data.filter((item) => item.categoryId.toString() === categoryId)
        displayData(filtered)
      })
    })
  })
  .catch((error) => {
    console.error('Error fetching data:', error)
  })

function displayData(filteredData, container) {
  const galleryDiv = document.querySelector('.gallery')
  galleryDiv.innerHTML = ''
  filteredData.forEach((item) => {
    let figure = document.createElement('figure')

    let img = document.createElement('img')
    img.src = item.imageUrl
    img.alt = item.title
    img.classList.add('clickable')

    let figcaption = document.createElement('figcaption')
    figcaption.textContent = item.title

    figure.appendChild(img)
    figure.appendChild(figcaption)

    galleryDiv.appendChild(figure)

    img.addEventListener('click', () => {
      img.classList.toggle('clicked')
  })
}
