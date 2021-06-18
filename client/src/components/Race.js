
 import React, { useState,useEffect } from "react";
 import DashboardService from "../services/DashboardService";

function Race(props){


return(
<tr  onClick={(e) => props.setSelectedRaceForGiven(props.race)}>
                    <td>
                      <p className="fw3">{props.race.distance} M</p>
                      <span className="cgray">{props.race.title}</span>
                      {/* <span className="cgray">{props.race.class}</span> */}
                    </td>
                    <td>
                      <p className="cblue">Entre fee would be {props.race.entryFees}</p>
                      <p className="cblue">Prize Breakdown:</p>
                      <p className="cblue">First:{props.race.prize.first}</p>
                      <p className="cblue">Second:{props.race.prize.second}</p>
                      <p className="cblue">Third:{props.race.prize.third}</p>
                    </td>
                    <td>
                      {props.race.horses.length}
                    </td>
                    </tr>

)
}
export default Race;