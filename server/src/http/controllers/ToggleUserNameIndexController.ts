import DatabaseService from '@app/services/DatabaseService';
import { Request, Response } from 'express';

class ToggleUserNameIndexController {
    async handle(_: Request, response: Response) {
        try {
            if (await DatabaseService.existsUserNameIndex()) {
                await DatabaseService.dropUserNameIndex();
            } else {
                await DatabaseService.createUserNameIndex();
            }

            return response.sendStatus(200);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}

export default new ToggleUserNameIndexController();
