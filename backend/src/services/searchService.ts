import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const FLICKR_URL = process.env.FLICKR_URL 
const method = 'flickr.photos.search';

interface ISearchParams {
    searchTerm: string;
    page: number; // page number
    perPage: number; // number of photos per page
}

interface IPhoto {
    farm: number;
    server: string;
    id: string;
    secret: string;
    title: string;
}


// This function takes an array of Photo objects and returns an array of objects containing the imageURL and title of a photo.
function mapPhotos(photos: IPhoto[]): { imageUrl: string; title: string } [] {
    return photos.map(({ farm, server, id, secret, title }: IPhoto) => {
        // Construct the URL of the photo
        const imageUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
        // Return an object containing the URL and title of the photo
        return { imageUrl, title };
    });
}
 

//This function takes in a ISearchParams object as input and returns an array of photo objects containing the URL and title of a photo.
export async function searchService ({ searchTerm,  page, perPage }: ISearchParams) {
    try {
       
        const url = `${FLICKR_URL}?method=${method}&api_key=${FLICKR_API_KEY}&text=${searchTerm}&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`;
       
        const response = await axios.get(url);

        // Destructure the response object to directly access the photo array
        const { data: { photos: { photo } } } = response;

     /* Use the mapPhotos function to make the imageUrl and title properties of each photo  object. */
        const photos = mapPhotos(photo);
        console.log('Photos:', photos);
        // Return the transformed photo array
        return photos;

    } catch (error) {
        
        // check what error is being thrown
        console.error('Error fetching photos:', error);
        return [];
    }
}