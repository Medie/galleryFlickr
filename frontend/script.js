const searchInputEl = document.getElementById("search-input");
const showMore = document.getElementById("show-more-btn");
const main = document.querySelector('main');
const form = document.querySelector('form');

const perPage = 10;
let page = 1;

function createImageElement(photo) {
  const { imageUrl, title } = photo;

  const imageEl = document.createElement("div");
  imageEl.classList.add("image");

  imageEl.innerHTML = `
    <img src="${imageUrl}" alt="${title}" />
    <div class="image-info">
      <a>${title}</a>
    </div>
  `;

  return imageEl;
}

async function getImages() {
  const inputData = searchInputEl.value;

  if (page === 1) {
    main.innerHTML = "<div class='loader'></div>";
  }

  try {
    const APIURL = `http://localhost:3000/search/${inputData}?page=${page}&perPage=${perPage}`;

    const response = await fetch(APIURL);
    const respData = await response.json();

    if (page === 1) {
      main.innerHTML = "";
      showMore.style.display = "none";
    }

    respData.forEach((photo) => {
      const imageEl = createImageElement(photo);
      main.appendChild(imageEl);
    });

    page++;

    if (page >= 1) {
      setTimeout(() => {
        showMore.style.display = "block";
      }, 1000);
    }

  } catch (error) {
    console.log("error", error);
    main.innerHTML = "<div class='unresponsive'> Something went wrong please try  again</div>";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  getImages();
});

showMore.addEventListener("click", getImages);