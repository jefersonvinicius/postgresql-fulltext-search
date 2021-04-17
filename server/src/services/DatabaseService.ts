import { client } from '@app/database/connection';

class DatabaseService {
    async existsUserNameIndex(): Promise<boolean> {
        try {
            const result = await client.query(
                "select exists(select * from pg_indexes where tablename = 'users' and indexname = 'users_name_index')"
            );
            return result.rows[0].exists;
        } catch (error) {
            return false;
        }
    }

    async existsUserEmailIndex(): Promise<boolean> {
        const result = await client.query(
            "select exists(select * from pg_indexes where tablename = 'users' and indexname = 'users_email_index')"
        );
        return result.rows[0].exists;
    }

    async createUserNameIndex(): Promise<void> {
        await client.query(
            'create index users_name_index on users (lower(name))'
        );
    }

    async dropUserNameIndex(): Promise<void> {
        await client.query('drop index users_name_index');
    }

    async createUserEmailIndex(): Promise<void> {
        await client.query(
            'create index users_email_index on users (lower(email))'
        );
    }

    async dropUserEmailIndex(): Promise<void> {
        await client.query('drop index users_email_index');
    }
}

export default new DatabaseService();
