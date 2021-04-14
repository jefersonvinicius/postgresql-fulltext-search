import { Request, Response } from 'express';
import { client } from '@app/database/connection';

import { performance } from 'perf_hooks';

class SearchController {
    async handle(request: Request, response: Response) {
        try {
            const name = request.query.name;

            const startAt = performance.now();
            const result = await client.query(
                'select * from users where name = $1',
                [name]
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
