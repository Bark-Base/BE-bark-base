import { Application } from 'express';
import express from 'express';
import  cookieParser  from 'cookie-parser';
import cors from 'cors';

const app: Application = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended : false }));
app.use(cors({
    origin: ['http://localhost:3000', 'localhost:3000' ],
    credentials: true,
    exposedHeaders: ['Set-Cookie']
}));

// App routes
app.use('/api/v1/auth', require('./controllers/users'));
app.use('/api/v1/pet', require('./controllers/pets'));
app.use('/api/v1/contact', require('./controllers/contacts'));
app.use('/api/v1/medical-info', require('./controllers/medical'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
