import express from 'express';
import routes from './routes';

const server = express();

server.use(routes);

export default server;
