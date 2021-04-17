import { Router } from 'express';
import DatabaseInfoController from './controllers/DatabaseInfoController';

import SearchController from './controllers/SearchController';
import ToggleUserEmailIndexController from './controllers/ToggleUserEmailIndexController';
import ToggleUserNameIndexController from './controllers/ToggleUserNameIndexController';

const routes = Router();

routes.get('/search', SearchController.handle);
routes.put('/user-name-index/toggle', ToggleUserNameIndexController.handle);
routes.put('/user-email-index/toggle', ToggleUserEmailIndexController.handle);
routes.get('/database-info', DatabaseInfoController.handle);

export default routes;
