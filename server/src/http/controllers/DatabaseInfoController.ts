import DatabaseService from '@app/services/DatabaseService';
import { Request, Response } from 'express';

class DatabaseInfoController {
    async handle(_: Request, response: Response) {
        try {
            const hasUserEmailIndex = await DatabaseService.existsUserEmailIndex();
            const hasUserNameIndex = await DatabaseService.existsUserNameIndex();

            return response.json({
                hasUserNameIndex,
                hasUserEmailIndex,
            });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}

export default new DatabaseInfoController();
