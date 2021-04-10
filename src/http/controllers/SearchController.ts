import { Request, Response } from 'express';
import { client } from '@app/database/connection';

import { performance } from 'perf_hooks';

class SearchController {
    async handle(request: Request, response: Response) {
        const name = request.query.name;
        const queryValue = `%${name}%`;

        const startAt = performance.now();
        const result = await client.query(
            'select * from users where name like $1',
            [queryValue]
        );
        const endAt = performance.now();

        return response.json({
            users: result.rows,
            requestDuration: endAt - startAt,
        });
    }
}

export default new SearchController();
