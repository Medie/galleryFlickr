import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const FLICKR_API_KEY = process.env.FLICKR_API_KEY 
const FLICKR_URL = process.env.FLICKR_URL || 'https://www.flickr.com/services/rest/';
const method = 'flickr.photos.search';

export interface SearchGalleryParams {
    searchTerm: string;
    page: number; // page number
    perPage: number; // number of photos per page
    
}



export async function searchGallery ({ searchTerm,  page, perPage }: SearchGalleryParams) {

 const url = `${FLICKR_URL}?method=${method}&api_key=${FLICKR_API_KEY}&text=${searchTerm}&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`;
 const response = await axios.get(url);
 console.log('Flickr response :',response.data);

// the response.data.photos.photo object is an array of photos
// we need to map over it and return a new object with the photo url    
// we can use the farm, server, id and secret to build the url
//https://farm{farm}.staticflickr.com/{server}/{id}_{secret}.jpg
// we can also add the title of the photo to the object
// we can return the object as an array of objects

const photos = response.data.photos.photo.map((photo: any) => {
    
    const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    const title = photo.title;
    console.log('photo url :',imageUrl + ' Title :',title);
    return {imageUrl  ,title};
});

console.log('photos :',photos);
return photos;
  
}

