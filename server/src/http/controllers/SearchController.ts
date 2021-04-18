import UserService from '@app/services/UserService';
import { Request, Response } from 'express';
import { performance } from 'perf_hooks';
import { QueryResult } from 'pg';

class SearchController {
    async handle(request: Request, response: Response) {
        try {
            const searchTerm = String(request.query.q ?? '');
            const shouldUseFullTextSearch = request.query.fulltext === 'true';

            const startAt = performance.now();
            let result: QueryResult;
            if (shouldUseFullTextSearch) {
                result = await UserService.searchUsingFullText(searchTerm);
            } else {
                result = await UserService.searchUsingLike(searchTerm);
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
