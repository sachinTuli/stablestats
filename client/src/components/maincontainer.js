

 import horsesample from '../img/horse_sample.png'
 import item_sample from '../img/item_sample.png'
 import React, { useState,useEffect } from "react";
 import DashboardService from "../services/DashboardService";

 import Horse from '../components/Horse';

 import Race from '../components/Race';

function Maincontainer (props){

const classes=[
  {
    'label':'Class I',
    'value':1
  },
  {
    'label':'Class II',
    'value':2
  },
  {
    'label':'Class III',
    'value':3
  },
  {
    'label':'Class IV',
    'value':4
  },
  {
    'label':'Class V',
    'value':5
  },
  ]

const distancesArray=[1000,1200,1400,1600,1800,2000,2200,2400,2600]
//these 5 are filter 
const [className, setClassName] = useState("")
const [distance,setDistance] = useState("")
const [winPercentage,setWinPercentage] = useState("")
const [winPercentageDistance,setWinPercentageDistance] = useState("")
const [odds,setOdds] = useState("")
const [oddsDistance,setOddsDistance] = useState("")

//this is races list
const [races,setRaces] = useState([])
//this is horse list of selected race
const [horses,setHorses]=useState([])

const [selectedRace,setSelectedRace] = useState("")

//class or distance change logic

const [classDistChanged,setClassDistChanged]=useState(true)


function filterOutHorses(givenHorses){
  // console.log(givenHorses);
  if(givenHorses && givenHorses.length>0){
      if(winPercentage) {
        givenHorses = givenHorses.filter(obj => obj.totalWinPercentage <= winPercentage);
      }
      if(odds) {
        givenHorses = givenHorses.filter(obj => obj.totalOddsPercentage <= odds);
      }
      if(winPercentageDistance) {
        let strDistance = distance + "m";
        givenHorses = givenHorses.filter(obj => {
          for(var ele in obj.winPercentageByDistance) {
            if(ele == strDistance && winPercentageDistance <= obj.winPercentageByDistance[ele]) {
              return true;
            }
        }
        });
      }
       if(oddsDistance) {
        givenHorses = givenHorses.filter(obj => {
          for(var ele in obj.oddsByDistance) {
            if(ele == distance && oddsDistance <= obj.oddsByDistance[ele]) {
              return true;
            }
        }
        });
      }
        setHorses(givenHorses);

}
}


function checkDisable(){
  return distance=='';
}


function setSelectedRaceForGiven(race){
  if(races && races.length>0){
    let selectedItem= races.filter(obj => obj._id===race._id);
    if(selectedItem && selectedItem.length>0 ){
      setSelectedRace(selectedItem[0]);
      setHorses(selectedItem[0].horses)
    }
  }
}

async function resetFilter(){

    
    setClassName("")
    setDistance("")
    setWinPercentage("")
    setWinPercentageDistance("")
    setOdds("")
    setOddsDistance("")
    //JUGGAD
    searchHorse(true)
} 
function  searchHorse(forceCall){
  if(classDistChanged || forceCall)
  {
    let data ;
    if(!forceCall)
    {
 data={
    'className':className,
    'distance':distance
  }
    }
      
    DashboardService.getRaces(data)
    .then((result) => {
      setClassDistChanged(false)
          setWinPercentage("")
    setWinPercentageDistance("")
    setOdds("")
    setOddsDistance("")
      if(result && result.data ){
        let output=result.data.data;
        if(output && output.length>0)
        {
        setRaces(output)
        setSelectedRace(output[0])
        setHorses(output[0].horses);
        }
        else{
        setRaces([])
        setSelectedRace("")
        setHorses([]);
        }
      }
    })
    .catch((err) => {
      alert("Something went wrong");
    });
  }
else{ 
    filterOutHorses(selectedRace.horses)
}

}


useEffect(() => {
   searchHorse(true)
 }, [])
    return(
      
      <section className="mainContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb20">
            <div className="blockBox">
              <h2 className="widgetHead1">Class</h2>
              <div className="classCont">
                  {
                    classes.map(shownClass =>
                        <div className="classOuter"><span style={{ color: className == shownClass.value ? 'red': 'white'}} onClick={(e) =>{  setClassName(shownClass.value); setClassDistChanged(true)}} className="classBox">{shownClass.label}</span></div>
                      )
                  }
                
              </div>
              <h2 className="widgetHead1 mt40">Distance</h2>
              <div className="distAvfSlider">
                  {
                    distancesArray.map(distanceShown => 
                      <span style={{ color: distance == distanceShown? 'red': 'white'}} onClick={(e) => { setDistance(distanceShown) ;setClassDistChanged(true)}} className="classBox">{distanceShown}</span>

                    )
                  }             
              </div>
              <div className="flex avgFilterCont mt40 ai jcb">
                <div className="cont">
                  <h2 className="avgFilterTxt">Avg win %</h2>
                  <p className="smallTxtFilter mt10">(Maximum Of)</p>
                </div>
                <input  value={winPercentage}  onChange={(e) => setWinPercentage(e.target.value)} type="number" name="winPercentage" placeholder="%" className="inpAvgFilter" />
              </div>
              <div className="flex avgFilterCont mt20 ai jcb">
                <div className="cont">
                  <h2 className="avgFilterTxt">Avg win % Distance</h2>
                  <p className="smallTxtFilter mt10">(Maximum Of)</p>
                </div>
                <input value={winPercentageDistance} disabled={checkDisable()}  onChange={(e) => setWinPercentageDistance(e.target.value)} type="number" name="winPercentageDistance" placeholder="%" className="inpAvgFilter" />
              </div>
              <div className="flex avgFilterCont mt20 ai jcb">
                <div className="cont">
                  <h2 className="avgFilterTxt">Avg Odds</h2>
                  <p className="smallTxtFilter mt10">(Maximum Of)</p>
                </div>
                <input value={odds}  onChange={(e) => setOdds(e.target.value)} type="number" name="odds" placeholder="%" className="inpAvgFilter" />
              </div>
              <div className="flex avgFilterCont mt20 ai jcb">
                <div className="cont">
                  <h2 className="avgFilterTxt">Avg Odds Distance</h2>
                  <p className="smallTxtFilter mt10">(Maximum Of)</p>
                </div>
                <input value={oddsDistance} disabled={checkDisable()} onChange={(e) => setOddsDistance(e.target.value)} type="oddsDistance" name="avgWithPercent" placeholder="%" className="inpAvgFilter" />
              </div>
              <hr className="lightBlueLine mt20 mb 10" />
              <button type="submit" name="searchHorse" onClick={ (e) => searchHorse(false)} className="btnFilter trans cwhite fw3 br5 w100"><i className="fa fa-search" aria-hidden="true" /> &nbsp; Search </button>
              <hr className="lightBlueLine mt20 mb 10" />

              <button type="submit" name="searchHorse" onClick={ (e) => resetFilter()} className="btnFilter trans cwhite fw3 br5 w100"><i className="fa fa-refresh" aria-hidden="true" /> &nbsp; Reset Filter </button>

            </div> {/* blockBox */}
            <div className="blockBox mt30">
              <table className="changeTable w100">
                <tbody><tr>
                    <th className="cgray">CHANGE</th>
                    <th className="cblue">ENTREE FEE</th>
                    <th className="cgray">REGISTERED</th>
                   
                  </tr>
                  {
                      races.length === 0 &&
                        <tr>
                          No record found
                        </tr>
                  }
                  
                  {
                    races.map(race =>
                    <Race  key ={race._id} race={race} setSelectedRaceForGiven={ (value)=>setSelectedRaceForGiven(value)} />
                      )
                  }
                </tbody></table>
            </div> {/* blockBox */}
          </div> {/* col */}
          <div className="col-md-5 mb20">
            <div className="blockBox">
              <div className="majorBox br8 graybg">
                <h2 className="fs20 mb5">{selectedRace?selectedRace.title:"NO RACE SELECTED"}</h2>
                <p className="cgray2 fs18">{selectedRace?selectedRace.distance:"0"} M</p>
              </div>
              {/* <div className="majorMiniCont">
                <div className="flex">
                  <div className="majorMiniBox br8 w100 flex ai jc bluebg mr15">
                    <div className="cont">
                      <p className="fw4">Avg win % A distance</p>
                      <p className="cgray2 fs11 mt5">Avg sample text</p>
                      <a href="javascript:" className="cblue inline mt5">View race on Zed Run</a>
                    </div>
                  </div>  
                </div>
              </div> */}
            </div> {/* blockBox */}
            <div className="blockBox mt30">
              <div className="dashItems">
                <div className="row">
                 {
                      horses.length === 0 &&
                        <h1>
                          No Horse found
                        </h1>
                  }
                  {
                    horses.map(horse =>
                    <Horse  key ={horse.zedId} horse={horse} />
                         
                    )
                  }



                </div> {/* row */}
              </div> {/* dashItems */}
            </div> {/* blockBox */}
          </div> {/* col */}
          {/* blur krna */}
          <div className="col-md-4 mb20">
            <div className="blockBox">
              <form method="post" action>
                <input type="text" name="search" placeholder="Search your horse" className="searchHorseInp w100 br8 mb-2 p-4" />
              </form>
              <div className="image ">
                <img src={horsesample} className="horseResult w100 mt20 image__img" />
                <div className="image__overlay">
                  <div className="image__title">
                    <h3>COMING SOON!</h3>
                  </div>
                </div>
              </div>
            </div> {/* blockBox */}
            <div className="blur">
              <div className="blockBox mt30">
                <p className="fs17 fw3">Race Breakdown</p>
                <hr className="lightBlueLine m10" />
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <div className="raceStatBox bluebg">
                      <p className="fw4">No of hourses</p>
                      <p>205</p>
                      <p>Last win today at 10:45 pm</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="raceStatBox bluebg">
                      <p className="fw4">No of hourses</p>
                      <p>205</p>
                      <p>Last win today at 10:45 pm</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="raceStatBox bluebg">
                      <p className="fw4">No of hourses</p>
                      <p>205</p>
                      <p>Last win today at 10:45 pm</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="raceStatBox bluebg">
                      <p className="fw4">No of hourses</p>
                      <p>205</p>
                      <p>Last win today at 10:45 pm</p>
                    </div>
                  </div>
                </div> {/* row */}
                <div className="row">
                  <div className="col-md-4 col-sm-6">
                    <div className="raceStatBox bluebg fs11">
                      <p className="fw4">W % 0.0008</p>
                      <p className="cgray2">W % 1000  <br /> P %10</p>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="raceStatBox bluebg fs11">
                      <p className="fw4">W % 0.0008</p>
                      <p className="cgray2">W % 1000  <br /> P %10</p>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="raceStatBox bluebg fs11">
                      <p className="fw4">W % 0.0008</p>
                      <p className="cgray2">W % 1000  <br /> P %10</p>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="raceStatBox bluebg fs11">
                      <p className="fw4">W % 0.0008</p>
                      <p className="cgray2">W % 1000  <br /> P %10</p>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="raceStatBox bluebg fs11">
                      <p className="fw4">W % 0.0008</p>
                      <p className="cgray2">W % 1000  <br /> P %10</p>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="raceStatBox bluebg fs11">
                      <p className="fw4">W % 0.0008</p>
                      <p className="cgray2">W % 1000  <br /> P %10</p>
                    </div>
                  </div>
                </div> {/* row */}
              </div> {/* blockBox */}
              <div className="blockBox mt20" align="center">
                <p>Available gates open at the race</p>
              </div>
              <div className="blur__overlay">
                <div className="blur__title">
                  <h3>COMING SOON!</h3>
                </div>
              </div>
            </div>
          </div>
          {/* yhn tk */}
        </div> {/* row */}
      </div> 
      </section>

)}
export default Maincontainer