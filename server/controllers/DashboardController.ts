import { BaseController } from './BaseController';
import { HTTP_STATUS } from './../constants/ErrorStatus';
import express from 'express';
import DashboardService from '../services/DashboardService';
import { Message } from '../constants/Message';

class DashboardController extends BaseController {

    constructor() {
      super();
    }
  
  /**
   * 
   * @param req 
   * @param res 
   * @returns 
   */
    public async getRaces(req: express.Request, res: express.Response) {
      try {
        const racesList = await DashboardService.getRaces(req);
        return res.status(HTTP_STATUS.SUCCESS).send(super.mapApiResponse(true, Message.RACES_LIST, racesList))
      } catch (err) {
        return res.status(err.status).send(super.mapErrorResponse(err));
      }
  }
  
  /**
   * 
   * @param req 
   * @param res 
   * @returns 
   */

    // public async getHorses(req: express.Request, res: express.Response) {
    //   try {
    //     const horsesList = await DashboardService.getHorses(req)
    //     return res.status(HTTP_STATUS.SUCCESS).send(super.mapApiResponse(true, Message.HORSES_LIST, horsesList))
    //   } catch(err) {
    //       return res.status(err.status).send(super.mapErrorResponse(err));
    //   }
    // }
  
}

export default new DashboardController()