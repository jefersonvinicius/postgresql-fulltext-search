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
        .then(() => {
            console.log(`${NUMBER_OF_USERS_TO_CREATE} created!`);
        })
        .catch((error) => {
            console.error('Error: ' + error.message);
        })
        .finally(() => {
            client.end();
        });
}

const NUMBER_OF_USERS_TO_CREATE = 2000;

async function createUser(): Promise<User> {
    return await UserService.create({
        name: faker.name.firstName(),
        email: faker.internet.email(),
    });
}

run();
