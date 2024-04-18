import { Request, Response, NextFunction } from 'express';
import { searchService } from '../services/searchService';


export  const  searchController = async (req: Request, res: Response, next: NextFunction) =>{
    
    console.log(' req.query.page: ', req.query.page, 'req.query.page: ', req.query.perPage, 'req.params.searchTerm:', req.params.searchTerm);

    
    const searchTerm = req.params.searchTerm;
    const page = req.query.page || 1;
    const perPage= req.query.perPage || 10;
     

    try {
       
        const result = await searchService({ searchTerm,  page: Number(page),  perPage: Number(perPage) });
        res.send(result);
    }
    catch (err) {
        next(err);
    }
}



