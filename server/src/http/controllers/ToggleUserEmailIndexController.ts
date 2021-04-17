import DatabaseService from '@app/services/DatabaseService';
import { Request, Response } from 'express';

class ToggleUserEmailIndexController {
    async handle(_: Request, response: Response) {
        try {
            if (await DatabaseService.existsUserEmailIndex()) {
                await DatabaseService.dropUserEmailIndex();
            } else {
                await DatabaseService.createUserEmailIndex();
            }

            return response.sendStatus(200);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}

export default new ToggleUserEmailIndexController();
