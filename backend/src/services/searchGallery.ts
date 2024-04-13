import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();



const FLICKR_API_KEY = process.env.FLICKR_API_KEY 
const FLICKR_URL = process.env.FLICKR_URL || 'https://www.flickr.com/services/rest/';
const method = 'flickr.photos.search';



// Add pagination here
export interface SearchGalleryParams {
    searchTerm: string;
    page: number;
    perPage: number;
    //method: string;
}




export async function searchGallery ({ searchTerm,  page, perPage }: SearchGalleryParams) {

 const url = `${FLICKR_URL}?method=${method}&api_key=${FLICKR_API_KEY}&text=${searchTerm}&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`;
 const response = await axios.get(url);
 console.log('Flickr response :',response.data);
 return response.data;
}


/* export async function searchGallery (searchTerm: string) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&text=${searchTerm}&format=json&nojsoncallback=1`;


    return response.data;
} */