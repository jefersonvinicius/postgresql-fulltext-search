import { client } from '@app/database/connection';
import { User } from '@app/database/models';
import { QueryResult } from 'pg';

class UserService {
    async create(data: CreateData): Promise<User> {
        const result = await client.query(
            `insert into users(name, email, bio, image) values($1, $2, $3, $4)`,
            [data.name, data.email, data.bio, data.image]
        );
        return result.rows[0];
    }

    async getAll(): Promise<User[]> {
        const result = await client.query(
            'select id, name, email, bio, image, created_at as "createdAt", updated_at as "updatedAt" from users'
        );
        return result.rows;
    }

    async searchFullTextUsingLike(text: string): Promise<QueryResult<User[]>> {
        const finalText = `%${text.toLowerCase()}%`;
        const result = await client.query<User[]>(
            'select id, name, email, bio, image, created_at as "createdAt", updated_at as "updatedAt" from users where lower(email) like $1 or lower(name) like $2 or lower(bio) like $3',
            [finalText, finalText, finalText]
        );
        return result;
    }
}

type CreateData = {
    name: string;
    email: string;
    bio: string;
    image: string;
};

export default new UserService();
