import { client } from './database/connection';
import server from './http/server';

const PORT = 3332;

async function bootstrap() {
    await client.connect();
    server.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
}

bootstrap();
