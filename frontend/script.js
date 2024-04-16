
const searchInputEl = document.getElementById("search-input");
const showMore = document.getElementById("show-more-btn");
const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.getElementById('search');
const Loading = document.querySelector('loading');

let inputData = "";
let page = 1;
let perPage = 10;


async function getImages() {
  /* loader class to show
   when user clicks on show more button then do not show loader */
  if (page === 1) {
    main.innerHTML = "<div class='loader'></div>";
  }

  inputData = searchInputEl.value;


  try {
    const APIURL = `http://localhost:3000/search/${inputData}?page=${page}&perPage=${perPage}`;

    const response = await fetch(APIURL);
    const respData = await response.json();

    console.log("respData", respData);
    if (page === 1) {
      main.innerHTML = " ";
      showMore.style.display = "none";
    }


    respData.forEach((photo) => {

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

    page++;
    if (page >= 1) {
      // make a delay of 3 seconds to show moreMore button
      setTimeout(() => {
        showMore.style.display = "block";
      }, 5000);
    }

  } catch (error) {
    console.log("error", error);
    main.innerHTML =
      "<div class='unresponsive'> Something went wrong please try  again</div>";

  }


}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputData = searchInputEl.value;
  page = 1;
  getImages();
});

showMore.addEventListener("click", () => {
  console.log("show more clicked");
  getImages();
});


