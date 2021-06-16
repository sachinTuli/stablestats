import express from 'express'
import RaceModel from '../models/races';
import { Error } from 'mongoose';
import { HTTP_STATUS } from '../constants/ErrorStatus';
import { ERROR_MESSAGE } from '../constants/ErrorMessage';
import HttpException from '../exceptions/HttpException';

class DashboardService {

  /**
   * 
   * @param req 
   * @returns 
   */

    public async getRaces(req:express.Request) : Promise<any> {
      const { className, distance } = req.body;
          try {
            let objFilter: any = {};
            if (className) {
              objFilter.class = className;
            }
            if (distance) {
              objFilter.distance = distance;
            }
            let raceList;
            raceList = await RaceModel.find(objFilter).lean();
            return raceList;
        } catch (error) {
            throw new Error("Internal Server Error");   
        }
  }
  
  /**
   * 
   * @param req 
   * @returns 
   */


    // public async getHorses(req:express.Request) : Promise<any> {
    //   // const raceId = req.params.raceId;
    //   const { raceId, distance, avgWin, avgWinDistance, avgOdds, avgOddsDistance } = req.body;
    //   try {
    //     let objFilter: any = {};
    //     if (raceId) {
    //       console.log(raceId);
    //       objFilter._id = raceId;
    //       if (avgWin || avgWinDistance || avgOdds || avgOddsDistance) {
    //         objFilter.horses = {} ;
    //       }
    //       if (avgWin) {
    //         console.log("line 50 ", avgWin);
    //         // objFilter.horses.totalWinPercentage = avgWin;
    //         objFilter.horses = {$elemMatch: {totalWinPercentage: avgWin}};
    //         console.log(objFilter);
    //       }
    //       if (avgWinDistance) {
    //         console.log(avgWinDistance);
    //         // objFilter.horses.winPercentageByDistance[distance] = { $lte: avgWinDistance }
    //         objFilter.horses.winPercentageByDistance[distance] = { $lte: avgWinDistance }
    //       }
    //       if(avgOdds) {
    //         console.log(avgOdds);
    //         objFilter.horses.totalOddsPercentage = avgOdds + "%" 
    //       }
    //       if (avgOddsDistance) {
    //         console.log(avgOddsDistance);
    //         objFilter.horses.oddsByDistance[distance] = { $lte: avgOddsDistance }
    //       }
    //       let horsesList;
    //       console.log("71", objFilter);
    //       horsesList = await RaceModel.find(objFilter).lean();
    //       return horsesList;
    //     } else {
    //       throw new HttpException(HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGE.INTERNET_SERVER_ERROR);
    //     }
        
    //   } catch (error) {
    //     throw new Error("Internal Server Error");   
    //   }

    // }
}

export default new DashboardService();