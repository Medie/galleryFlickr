import { Router } from 'express';
import { searchController } from '../controllers/searchGallery';


const router = Router();

// what is :searchTerm in the url? It is a parameter that we can access in the controller

// :searchTerm is a parameter in the url that we can access in the controller as req.params.searchTerm

// why define it like that ? because we want to make the search term dynamic, so that we can search for any term

router.get ('/search/:searchTerm',searchController);

   

export default router;