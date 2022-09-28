import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/winston.logger';

export const joiValidator = (schema: { validateAsync: (arg0: any) => any }) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error: any) {
            logger.error(`Data validator error: ${error.message}`);
            res.status(400).send({ status: 'Failed', error: error.message });
        }
    };
};
