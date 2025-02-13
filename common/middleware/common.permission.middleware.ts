import express from "express";
import { PermissionFlag } from "./common.permissionflag.enum";
import debug from "debug";

const log: debug.IDebugger = debug("app:common-permission-middleware");

class PermissionMiddleware {
    permissionFlagRequired(requiredPermissionFlag: PermissionFlag): express.RequestHandler {
        return (req, res, next) => {
            try {
                if (!res.locals.jwt || typeof res.locals.jwt.permissionFlags === "undefined") {
                    res.status(403).json({ errors: ["Missing or invalid JWT"] });
                } else {
                    const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags, 10);
                    if (isNaN(userPermissionFlags)) {
                        res.status(403).json({ errors: ["Invalid permission flags"] });
                    } else if (userPermissionFlags && requiredPermissionFlag) {
                        next();
                    } else {
                        res.status(403).json({ errors: ["Insufficient permissions 222333"] });
                    }
                }
            } catch (e) {
                log(e);
                res.status(500).json({ errors: ["Internal server error"] });
            }
        };
    }

    async onlySameUserOrAdminCanDoThisAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        try {
            const userPermissionFlags = parseInt(res.locals.jwt?.permissionFlags);
            if (
                req.params &&
                req.params.userId &&
                req.params.userId === res.locals.jwt.userId
            ) {
                return next();
            } else {
                if (userPermissionFlags & PermissionFlag.ADMIN_PERMISSION) {
                    return next();
                } else {
                    res.status(403).send();
                    return Promise.resolve();
                }
            }
        } catch (e) {
            log(e);
            res.status(500).send({ errors: ["Internal server error"] });
        }
    }

    async userCantChangePermission(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        try {
            if (
                'permissionFlags' in req.body &&
                req.body.permissionFlags !== res.locals.user?.permissionFlags
            ) {
                res.status(400).send({
                    errors: ["User cannot change permission flags"],
                });
            }
            return next();
        } catch (e) {
            log(e);
            res.status(500).send({ errors: ["Internal server error"] });
        }
    }
}

export default new PermissionMiddleware();
