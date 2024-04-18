# Gallery App

This application fetches images from Flickr API and displays them on a webpage. Users can load more images by clicking a "Show More" button. The backend of this application is a Node.js server built with Express.js. It serves the API that the frontend uses to fetch images.
# Prerequisites

### Flickr

You will need to go through the Flickrs process to get yourself an API key for your application
[https://www.flickr.com](https://www.flickr.com)

## Installation

To install the application, follow these steps:
```sh
1. Unzip the project.
2. Create a .env file in the backend folder of the project.
```
Declare variables in the .env file
```sh
FLICKR_API_KEY="YOUR_FLICKR_KEY"  
FLICKER_URL="https://www.flickr.com/services/rest/."
NODE_PORT=3000
```
Install the backend dependencies:
```sh
cd ../backend
npm install
```
## Running the Application

To run the application, you need to start the backend server and then open the frontend in your browser.
### To run the the backend 
```sh
cd backend
npm run dev
```
# Usage

### Search Service

This function takes an array of Photo objects and returns an array of objects containing the imageURL and title of a photo.
```typescript
const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const FLICKR_URL = process.env.FLICKR_URL 
const method = 'flickr.photos.search';

interface IPhoto {
    farm: number;
    server: string;
    id: string;
    secret: string;
    title: string;
}

function mapPhotos(photos: IPhoto[]): { imageUrl: string; title: string } [] {
    return photos.map(({ farm, server, id, secret, title }: IPhoto) => {
      
        const imageUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
        return { imageUrl, title };
    });
}
```
This function takes in a ISearchParams object as input and returns an array of photo objects containing the URL and title of a photo.
```typescript
interface ISearchParams {
    searchTerm: string;
    page: number; // page number
    perPage: number; // number of photos per page
}

export async function searchService ({ searchTerm,  page, perPage }: ISearchParams) {
    try {
        const url = `${FLICKR_URL}?method=${method}&api_key=${FLICKR_API_KEY}&text=${searchTerm}&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`;

        const response = await axios.get(url);
        const { data: { photos: { photo } } } = response;
        const photos = mapPhotos(photo);

        return photos;
    } catch (error) {      
        console.error('Error fetching photos:', error);
        return [];
    }
}
```

## WEB

The application fetches images from an API and displays them on the page. 

### Script Usage
The `script.js` file contains the main logic for displaying the images.

### Configuring the Port

The script file uses a specific port to communicate with the backend. If your backend is running on a different port, you'll need to update the script file to match.

1. Open the `script.js` file in your text editor.
2. Locate the line where the `PORT` is defined and change it accordingly:

```javascript
const PORT = 3000;
```
### To run the the Frontend
```sh
Open the frontend folder
Right click the the index.html and choose what browser to run the file. 
```
## Overview of what `scripts.js`does: 
Here is a function that creates an image element from a given photo object.
```js
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
```
The getImages function is responsible for fetching the images and updating the page. It creates an image element for each image and appends it to the main element.  
```js
async function getImages() {
  const inputData = searchInputEl.value;

  if (page === 1) {
    main.innerHTML = "<div class='loader'></div>";
  }

  try {
    const APIURL = `${API_BASE_URL}${PORT}/search/${inputData}?page=${page}&perPage=${perPage}`;

    const response = await fetch(APIURL);
    const respData = await response.json();

    if (respData.length === 0) {
      main.innerHTML = "<div class='unresponsive'> network error please contact support</div>";
      return;
    }

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
    main.innerHTML = "<div class='unresponsive'>  network error please contact support</div>";
  }
}
```
Loads more images on "Show More" button click
```js
showMore.addEventListener("click", getImages);
```
On form submission, resets page to 1 and fetches images
```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  getImages();
});
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
## License

[MIT](https://choosealicense.com/licenses/mit/)