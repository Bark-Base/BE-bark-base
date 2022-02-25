import { Application } from 'express';
import express from 'express';
import  cookieParser  from 'cookie-parser';

const app: Application = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());

// App routes
app.use('/api/v1/auth', require('./controllers/users'));
app.use('/api/v1/pet', require('./controllers/pets'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
