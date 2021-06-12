import express from 'express';
import authService from '../services/AuthService';

class AuthController {

    constructor() {

    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    public async register(req: express.Request, res: express.Response) {
        return res.json(await authService.register(req));
    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns user
     */
    public async login(req: express.Request, res: express.Response) {
        return res.json(await authService.login(req));
    }
}

export default new AuthController()