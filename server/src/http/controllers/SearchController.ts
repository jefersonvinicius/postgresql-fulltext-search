import { Request, Response } from 'express';
import { performance } from 'perf_hooks';
import UserService from '@app/services/UserService';
import { QueryResult } from 'pg';

class SearchController {
    async handle(request: Request, response: Response) {
        try {
            const searchTerm = String(request.query.q ?? '');

            const startAt = performance.now();
            const result = await UserService.searchFullTextUsingLike(
                searchTerm
            );
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
