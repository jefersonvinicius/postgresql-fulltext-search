import { Request, Response } from 'express';
import { performance } from 'perf_hooks';
import UserService from '@app/services/UserService';

class SearchController {
    async handle(request: Request, response: Response) {
        try {
            const name = String(request.query.name);

            const startAt = performance.now();
            const result = await UserService.getByName(name);
            const endAt = performance.now();

            return response.json({
                users: result.rows,
                queryDuration: endAt - startAt,
            });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}

export default new SearchController();
