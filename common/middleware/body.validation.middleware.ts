import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

class BodyValidationMiddleware {
    verifyBodyFieldsErrors(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ errors: errors.array() });
        } else {
            next();
        }
    }
}

export default new BodyValidationMiddleware();
