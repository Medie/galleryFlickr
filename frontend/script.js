// I need to call the backend and get data and show it on the frontend.
// I will use fetch to call the backend.

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

const APIURL = `http://localhost:3000/search/bird?page=1&perPage=3`;

async function fetchData() {
  const response = await fetch(APIURL);
  const respData = await response.json();
  console.log(respData);

  respData.forEach((photo) => {
    const img = document.createElement('img');
    img.src = photo.imageUrl;
    img.alt = photo.title;
    //document.searchResults.appendChild(img);
    document.body.appendChild(img);
  });
}

fetchData();

/* searchButton.addEventListener('click', async () => {
  const searchTerm = searchInput.value;
  const response = await fetch(url);

  const data = await response.json();

  console.log(data);

  const results = data.photos.photo;
  searchResults.innerHTML = '';
  results.forEach((result) => {
    const img = document.createElement('img');
    img.src = `https://live.staticflickr.com/${result.server}/${result.id}_${result.secret}_b.jpg`;

    searchResults.appendChild(img);
  });
}); */

// Path: backend/index.js
