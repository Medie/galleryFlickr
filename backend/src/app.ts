import express from 'express';
import searchRouter from './routers/searchRoute';
import cors from 'cors';

async function  main() {

    try {
        const app = express();
        const port =  process.env.NODE_PORT  || 4000;
        
        app.use(cors());       
        app.use (express.json()); // for parsing application/json   
        app.use (express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

        app.use (searchRouter);

        app.listen (port, async () => {
            console.log(`Server running on port ${port}`);
        })
    }
    catch (err) {
        console.error('Error starting server', err);
    }
}

main();


