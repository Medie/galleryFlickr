import { Router } from 'express';
import { searchController } from '../controllers/searchGallery';


const router = Router();

router.get ('/search/:searchTerm',searchController);

   

export default router;