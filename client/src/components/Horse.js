
 import React, { useState,useEffect } from "react";
 import DashboardService from "../services/DashboardService";

function Horse(props){

const [horse,setHorse]=useState({})
useEffect(() => {
   setImageOfHorse(props.horse)   
 }, [])

 function setImageOfHorse(element){
         DashboardService.getHorseData(element.zedId)
              .then((result) => {
                  if(result && result.data){
                   element['img_url']=result.data['img_url'] 
                   setHorse(element)
                  }
    })
    .catch((err) => {
      console.log("Something went wrong for ",element);
    });
     
  }




return(
<div key ={horse.zedId} className="col-md-4 col-xs-6 mb20">
                          <div className="itemBack">
                            <p className="itemTitle">{horse.name}</p>
                            <div className="itemInner graybg br8">
                              <img src={horse.img_url} className="itemThumbnail" />
                              <div className="flex ai fw3 mb10 jcb">
                                <p>Win %</p>
                                <p>{horse.totalWinPercentage}</p>
                              </div>
                              <div className="flex ai fw3 mb10 jcb">
                                <p>Odd %</p>
                                <p>{horse.totalOddsPercentage}</p>
                              </div>
                              <div className="flex ai fw3 mb10 jcb">
                                <p>Place %</p>
                                <p>{horse.totalPlacePercentage}</p>
                              </div>
                              <div className="flex ai fw3 mb10 jcb">
                                <p>Total Races</p>
                                <p>{horse.totalRaces}</p>
                              </div>
                              
                              {/* <p className="cgray2">
                               {horse.totalRaces}
                                <br />
                                {horse.totalPlacePercentage}
                                P %
                              </p> */}
                            </div> 
                          </div>
                        </div> 

)
}
export default Horse;