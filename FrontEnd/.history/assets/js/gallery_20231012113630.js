document.addEventListener('DOMContentLoaded', function () {

  const apiEndpoint = 'http://localhost:5678/api/works'

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      const galleryDiv = document.querySelector('.gallery')
      data.forEach((item) => {
        // Create a new figure for each item
        let figure = document.createElement('figure')

        // Create an image element
        let img = document.createElement('img')
        img.src = item.imageUrl // Use imageUrl directly from the fetched data
        img.alt = item.title // Use title property from the fetched data

        // Create a caption
        let figcaption = document.createElement('figcaption')
        figcaption.textContent = item.title

        // Append the image and caption to the figure
        figure.appendChild(img)
        figure.appendChild(figcaption)

        // Append the figure to the gallery div
        galleryDiv.appendChild(figure)
      })
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })

    const buttons = document.querySelectorAll('#categories button')

    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        const category = button.getAttribute('data-category')
        
})
