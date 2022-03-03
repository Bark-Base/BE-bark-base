import { Application } from 'express';
import express from 'express';
import  cookieParser  from 'cookie-parser';
import cors from 'cors';
import * as path from 'express';

const app: Application = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended : false }));
app.use(cors({
    origin: ['http://localhost:3000', 'localhost:3000', 'barkbase.netlify.app', 'https://barkbase.netlify.app/' ],
    credentials: true,
    methods: [ "GET", "HEAD", "PATCH", "POST", "DELETE" ],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: true
}));

// App routes
app.use('/api/v1/auth', require('./controllers/users'));
app.use('/api/v1/pet', require('./controllers/pets'));
app.use('/api/v1/contact', require('./controllers/contacts'));
app.use('/api/v1/medical', require('./controllers/medical'));
app.use('/api/v1/static', express.static('dist/public'))
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
