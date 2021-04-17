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
        console.log(result.rows[1]);
        return result.rows;
    }

    async getByName(name: string): Promise<QueryResult<User[]>> {
        const result = await client.query<User[]>(
            'select id, name, email, bio, image, created_at as "createdAt", updated_at as "updatedAt" from users where name = $1',
            [name]
        );
        return result;
    }

    async getByEmail(email: string): Promise<QueryResult<User[]>> {
        const result = await client.query<User[]>(
            'select id, name, email, bio, image, created_at as "createdAt", updated_at as "updatedAt" from users where email = $1',
            [email]
        );
        return result;
    }

    async searchFullText(term: string): Promise<QueryResult<User[]>> {
        const result = await client.query<User[]>(
            'select id, name, email, bio, image, created_at as "createdAt", updated_at as "updatedAt" from users where email = $1',
            [term]
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
