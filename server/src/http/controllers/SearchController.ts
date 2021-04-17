import { Request, Response } from 'express';
import { performance } from 'perf_hooks';
import UserService from '@app/services/UserService';
import { QueryResult } from 'pg';

class SearchController {
    async handle(request: Request, response: Response) {
        try {
            const name = String(request.query.name);
            const email = String(request.query.email);
            const fulltext = String(request.query.fulltext);

            let result: QueryResult;
            const startAt = performance.now();
            if (name) {
                result = await UserService.getByName(name);
            } else if (email) {
                result = await UserService.getByEmail(email);
            } else {
                result = await UserService.searchFullText(fulltext);
            }

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
