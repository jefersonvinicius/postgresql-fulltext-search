import faker from 'faker';
import { client } from '@app/database/connection';
import UserService from '@app/services/UserService';
import { User } from '@app/database/models';

async function run() {
    console.log(`Running ${__filename} script!`);

    await client.connect();

    const createUsersPromises = [...Array(NUMBER_OF_USERS_TO_CREATE)].map(() =>
        createUser()
    );
    Promise.all(createUsersPromises)
        .then(async () => {
            const users = await UserService.getAll();
            console.log(
                `${NUMBER_OF_USERS_TO_CREATE} users created! Now users table have ${users.length} users`
            );
        })
        .catch((error) => {
            console.error('Error: ' + error.message);
        })
        .finally(() => {
            client.end();
        });
}

const NUMBER_OF_USERS_TO_CREATE = 4000;

async function createUser(): Promise<User> {
    const name = faker.name.findName();
    return await UserService.create({
        name: name,
        email: faker.internet.email(name),
    });
}

run();
