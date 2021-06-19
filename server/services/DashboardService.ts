import express from 'express'
import RaceModel from '../models/races';
import { Error } from 'mongoose';

class DashboardService {

  /**
   * 
   * @param req 
   * @returns 
   */

    public async getRaces(req:express.Request) : Promise<any> {

      const { className, distance,maxDistance } = req.body;
          try {
            let objFilter: any = {};
            if (className) {
              objFilter.class = className;
            }
            if (distance) {
              objFilter.distance = distance;
            }
            if(maxDistance){
              objFilter.distance={$gte:distance,$lte:maxDistance}
            }
            console.log("FILTER OBJECT IS",objFilter)

            let raceList;
            raceList = await RaceModel.find(objFilter).lean();
            return raceList;
        } catch (error) {
            throw new Error("Internal Server Error");   
        }

        // const { className, distance } = req.body;
        //   try {
        //     let objFilter: any = {};
        //     // if (className !== null) {
        //     //   objFilter['class'] = className;
        //     // }
        //     if (distance !== null) {
        //       objFilter['distance'] = distance;
        //     }
        //     console.log("FILTER OBJECT IS",objFilter)
        //     let raceList;
        //     if (objFilter['distance'] == undefined && objFilter['class'] == undefined) {
        //       console.log("GETTING ALL RACES LIST WITHOUT ANY FILTER")
        //       raceList = await RaceModel.find();
        //     } else {
        //       console.log("GETTING RACES LIST BASED ON FILTERS")
        //       //raceList = await RaceModel.find(...objFilter);
        //       raceList = await RaceModel.find({distance:distance});
              
        //     }
        //     if(raceList) {
        //         return {
        //             success:true,
        //             message: "Race List",
        //             data: raceList
        //         };
        //     }
        // } catch (error) {
        //     throw new Error("Internal Server Error");   
        // }
    }


    public async getHorses(req:express.Request) : Promise<any> {
    const { body } = req.body;
      
    }
}

export default new DashboardService();