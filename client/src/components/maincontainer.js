


 import horsesample from '../img/horse_sample.png'
 import item_sample from '../img/item_sample.png'
 import React, { useState,useEffect } from "react";
 import DashboardService from "../services/DashboardService";
 import LoginService from "../services/LoginService";

 import Horse from '../components/Horse';

 import Race from '../components/Race';

 import './style.css'

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

 async function check() {
  return LoginService.getCurruntUser()
    .then((result) => {
      console.log(result);
      return result.data;
    })
    .catch((err) => {
      alert("Something went wrong");
    });
}



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

// const distancesArray=[1000,1200,1400,1600,1800,2000,2200,2400,2600]
const distancesArray=[{
  'label':'Short (1000 - 1200mm)',
  'value':[1000,1200]
},{
  'label':'Middle (1400 - 1900mm)',
  'value':[1400,1900]
},{
  'label':'Long (2000 - 2600mm)',
  'value':[2000,2600]
}]
//these 5 are filter 
const [className, setClassName] = useState("")
const [distance,setDistance] = useState([])


const [winPercentage,setWinPercentage] = useState([20, 80])
const [winPercentageDistance,setWinPercentageDistance] = useState([20, 80])
const [odds,setOdds] = useState([20, 80])
const [oddsDistance,setOddsDistance] = useState([20, 80])

//this is races list
const [races,setRaces] = useState([])
//this is horse list of selected race
const [horses,setHorses]=useState([])

const [selectedRace,setSelectedRace] = useState("")

//class or distance change logic

const [classDistChanged,setClassDistChanged]=useState(true)


function resetData(){
        setRaces([])
        setSelectedRace("")
        setHorses([]);
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
    setDistance([])

    setWinPercentage([20, 80])
    setWinPercentageDistance([20, 80])
    setOdds([20, 80])
    setOddsDistance([20, 80])
    //JUGGAD
    searchHorse(true)
} 



function  searchHorse(forceCall){
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

      if(result && result.data ){
        let output=result.data.data;
        if(output && output.length>0)
        {
        setRaces(output)
        setSelectedRace(output[0])
        setHorses(output[0].horses);
        }
        else{
          resetData();
        }
      }
    })
    .catch((err) => {
      alert("Something went wrong");
    });
  }





useEffect(() => {
   searchHorse(true)
 }, [])
  
function valuetext(value) {
  return `${value}°C`;
}


  const handleChange1 = (event, newValue) => {
    setWinPercentage(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setWinPercentageDistance(newValue);
  };

  const handleChange3 = (event, newValue) => {
    setOdds(newValue);
  };

  const handleChange4 = (event, newValue) => {
    setOddsDistance(newValue);
  };





    return(
   
      <section className="mainContainer">
      <div className="container">
        <div className="row">
          {/* col */}

          <div className="col-md-3 mb20">


          <div className="blockBox mt0">
              <table className="changeTable w100">
                <tbody><tr>
                    <th className="cgray">CHANGE</th>
                    <th className="cblue">ENTREE FEE</th>
                    <th className="cgray">REGISTERED</th>
                  </tr>

                  {
                    races.map(race =>
                    <Race  key ={race._id} race={race} setSelectedRaceForGiven={ (value)=>setSelectedRaceForGiven(value)} />
                      )
                  }
                </tbody></table>
            </div>



          </div>







          <div className="col-md-6 mb20">
            <div className="blockBox">
              <div className="majorBox br8 graybg">
                 <h2 className="fs20 mb5">{selectedRace?selectedRace.title:"NO RACE SELECTED"}</h2>
                <p className="cgray2 fs18">{selectedRace?selectedRace.distance:"0"} M</p>
              </div>
              <div className="majorMiniCont">
                <div className="flex">
                  <div className="majorMiniBox br8 w100 flex ai jc bluebg mr15">
                    <div className="cont">
                      <p className="fw4">Avg win % A distance</p>
                      <p className="cgray2 fs11 mt5">Avg sample text</p>
                      <a href="javascript:" className="cblue inline mt5">View race on Zed Run</a>
                    </div>
                  </div>
                  
                </div>
              </div>
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
         



          <div className="col-md-3 mb20">
            <div className="blockBox">
              <h2 className="widgetHead1">Class</h2>
              <div className="mainrow" >
                    {
                    classes.map(shownClass =>
                        <div key ={shownClass.value} className="row1"><span style={{ color: className == shownClass.value ? 'red': 'white'}} onClick={(e) =>{  setClassName(shownClass.value); setClassDistChanged(true)}} className="">{shownClass.label}</span></div>
                      )
                  }
              </div>
              <h2 className="widgetHead1 widgethead2 mt40">Distance</h2>
              <div className="distAvfSlider" >
              {
                    distancesArray.map(distanceShown => 
                      <span key ={distanceShown.value} style={{ color: distance && distance[0] == distanceShown.value[0]? 'red': 'white'}} onClick={(e) => { setDistance(distanceShown.value) ;setClassDistChanged(true)}} className="classBox">{distanceShown.label}</span>

                    )
              }  

              </div>
              <div className="flex avgFilterCont mt40 ai jcb">
                <div className="cont">
                  <h2 className="avgFilterTxt">Avg win %</h2>
                </div>
              </div>
              <Typography id="range-slider" gutterBottom>
</Typography>
<Slider
  value={winPercentage}
  onChange={handleChange1}
  valueLabelDisplay="auto"
  aria-labelledby="range-slider"
  getAriaValueText={valuetext}
/>
 
             

              <div className="flex avgFilterCont mt20 ai jcb">
                <div className="cont">
                  <h2 className="avgFilterTxt">Avg win % Distance</h2>
                </div>
              </div>
              <Typography id="range-slider" gutterBottom>
</Typography>
<Slider
  value={winPercentageDistance}
  onChange={handleChange2}
  valueLabelDisplay="auto"
  aria-labelledby="range-slider"
  getAriaValueText={valuetext}
/>
 

              <div className="flex avgFilterCont mt20 ai jcb">
                <div className="cont">
                  <h2 className="avgFilterTxt">Avg Odds</h2>
                  
                </div>
                
                
              </div>

              <Typography id="range-slider" gutterBottom>
</Typography>
<Slider
  value={odds}
  onChange={handleChange3}
  valueLabelDisplay="auto"
  aria-labelledby="range-slider"
  getAriaValueText={valuetext}
/>
 



              
              <div className="flex avgFilterCont mt20 ai jcb">
                <div className="cont">
                  <h2 className="avgFilterTxt">Avg Odds Distance</h2>
                </div>
              </div>
              <Typography id="range-slider" gutterBottom>
</Typography>
<Slider
  value={oddsDistance}
  onChange={handleChange4}
  valueLabelDisplay="auto"
  aria-labelledby="range-slider"
  getAriaValueText={valuetext}
/>
 

              <hr className="lightBlueLine mt20 mb 10" />
              <button type="submit" name="searchHorse" onClick={ (e) => searchHorse(false)} className="btnFilter trans cwhite fw3 br5 w100"><i className="fa fa-search" aria-hidden="true" /> &nbsp; Search </button>
            </div> {/* blockBox */}
           {/* blockBox */}
          </div>


          {/* yhn tk */}
        </div> {/* row */}
      </div> 
      </section>

)}
export default Maincontainer