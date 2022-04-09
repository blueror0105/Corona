/**
 * Main entry point of our web server
 * 
 * @version 1.0.0
 */


/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';

import routes from './routes';

dotenv.config();


/**
 * App variables
 */
if ( ! process.env.PORT ) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);


/**
 * Eastablish database connection
 */
mongoose.connect(process.env.DATABASE_URL as string, () => {
    console.log("connected to the database");
    
    const app = express();


    /**
     * App Configurations
     */
    // app.use(helmet());
    app.use(cors());
    app.use(express.json());

    app.use("/", routes);

    /**
     * Server Activation
     */
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})