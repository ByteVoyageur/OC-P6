document.addEventListener('DOMContentLoaded', function () {
  let categoryMap = {}

  const apiEndpoint = 'http://localhost:5678/api/works'
  let data

  // Fetch category data from the API and dynamically create category buttons
  fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((categories) => {
      categoryMap['tous'] = null // Add the "Tous" category
      categories.forEach((category) => {
        categoryMap[category.name.toLowerCase()] = category.id
      })

      // Add "Tous" category to the beginning of the categories list
      categories.unshift({ name: 'Tous' })

      categories.forEach((category) => {
        const categoryButtonsDiv = document.querySelector('#category-buttons')
        console.log(categoryButtonsDiv)
        let button = document.createElement('button')
        button.textContent = category.name
        button.setAttribute('data-category', category.name.toLowerCase())
        categoryButtonsDiv.appendChild(button)
      })

      // Fetch the works data
      return fetch(apiEndpoint)
    })
    .then((response) => response.json())
    .then((fetchedData) => {
      data = fetchedData
      displayData(data)

      const buttons = document.querySelectorAll('#category-buttons button')
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const category = button.getAttribute('data-category')
          const filtered =
            category === 'tous'
              ? data
              : data.filter((item) => item.categoryId === categoryMap[category])
          displayData(filtered)
        })
      })
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })

  function displayData(filteredData, isModal = false) {
    const galleryDiv = isModal
      ? document.querySelector('#modalOverlay .gallery')
      : document.querySelector('.gallery')
    galleryDiv.innerHTML = ''

    filteredData.forEach((item) => {
      let figure = document.createElement('figure')

      let img = document.createElement('img')
      img.src = item.imageUrl
      img.alt = item.title
      if (isModal) {
        img.style.width = '50px'
        img.style.height = '50px'
      }

      if (isModal) {
        let deleteIcon = document.createElement('span')
        deleteIcon.innerHTML = '❌'
        deleteIcon.style.position = 'absolute'
        deleteIcon.style.right = '5px'
        deleteIcon.style.top = '5px'
        deleteIcon.style.cursor = 'pointer'

        deleteIcon.addEventListener('click', () => {
          galleryDiv.removeChild(figure)
        })

        figure.appendChild(deleteIcon)
      }

      let figcaption = document.createElement('figcaption')
      figcaption.textContent = item.title

      figure.appendChild(img)
      figure.appendChild(figcaption)

      galleryDiv.appendChild(figure)
    })
  }
})
