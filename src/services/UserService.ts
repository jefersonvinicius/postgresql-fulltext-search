import { client } from '@app/database/connection';
import { User } from '@app/database/models';

class UserService {
    async create(data: CreateData): Promise<User> {
        const result = await client.query(
            `insert into users(name, email) values($1, $2)`,
            [data.name, data.email]
        );
        return result.rows[0];
    }

    async getAll(): Promise<User[]> {
        const result = await client.query('select * from users');
        return result.rows;
    }
}

type CreateData = {
    name: string;
    email: string;
};

export default new UserService();
