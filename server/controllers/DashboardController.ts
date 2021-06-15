import express from 'express';
import DashboardService from '../services/DashboardService';
// import authService from '../services/AuthService';

class DashboardController {

    constructor() {

  }
  
    public async getRaces(req: express.Request, res: express.Response) {
        return res.json(await DashboardService.getRaces(req));
    }

    public async getHorses(req: express.Request, res: express.Response) {
        return res.json(await DashboardService.getHorses(req));
    }
  
}

export default new DashboardController()