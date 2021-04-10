import { client } from './database/connection';
import server from './http/server';

async function bootstrap() {
    await client.connect();
    server.listen(3333, () => {
        console.log('Listening on http://localhost:3333');
    });
}

bootstrap();
