const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
/*
Here i am using a className instead of an ID so a  dot is needed before the class name */
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;
let perPage = 10;

const APIURL = "http://localhost:3000/search/car?page=1&perPage=13";

const main = document.querySelector('main');

async function getImages() {
  const response = await fetch(APIURL);
  const respData = await response.json();

  console.log("respData", respData);

  respData.forEach((photo) => {
    // console.log("photo", photo);
    const { imageUrl, title } = photo;
    console.log("imageUrl", imageUrl);
    console.log("title", title);

    const imageEl = document.createElement("div");
    imageEl.classList.add("image");

    imageEl.innerHTML = `
                <img
                    src="${imageUrl}"
                    alt="${title}"
                />
                <div class="image-info">
                    <a>${title}</a>
                </div>
            `;
    main.appendChild(imageEl);

  });

  return respData;
}

getImages();

/* const searchImages = async () => {
  inputData = searchInputEl.value;
  const url = `http://localhost:3000/search/${inputData}?page=${page}&perPage=${perPage}`;

  const response = await fetch(url);
  const respData = await response.json();

  if (page === 1) {
    searchResults.innerHTML = "";
    //showMore.style.display = "none";
  }

  const results = respData;

  //results.map((photo) => {
  results.forEach((photo) => {
    console.log("photo");
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = photo.imageUrl;
    image.alt = photo.title;
    const title = document.createElement("a");
    title.textContent = photo.title;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(title);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
};

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  //show the search results container
  searchResults.classList.remove("hidden");
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
}); */
