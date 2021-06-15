import express from 'express'
import RaceModel from '../models/races';
import { Error } from 'mongoose';


class DashboardService {

    public async getRaces(req:express.Request) : Promise<any> {
        const { className, distance } = req.body;
          try {
            let objFilter: any = {};
            if (className !== null) {
              objFilter['class'] = className;
            }
            if (distance !== null) {
              objFilter['distance'] = distance;
            }
            let raceList;
            if (objFilter == null) {
              raceList = await RaceModel.find();
            } else {
              raceList = await RaceModel.find(...objFilter);
            }
            if(raceList) {
                return {
                    success:true,
                    message: "Race List",
                    data: raceList
                };
            }
        } catch (error) {
            throw new Error("Internal Server Error");   
        }
    }


    public async getHorses(req:express.Request) : Promise<any> {
        
    }
}

export default new DashboardService();