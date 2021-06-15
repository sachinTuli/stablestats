import mongoose, { Schema } from "mongoose";

const Race = new Schema({
    title: {
        type:String,
        require:true,
    },
    distance: {
        type: String,
        require: true
    },
    startTime: {
        type:String,
        require:true
  },
  horses: [{
    name: {
      type: String,
      require:true
    },
    zedId: {
      type: Number,
      require:true
    },
    totalRaces: {
      type: String,
      require:true
    },
    totalWinPercentage: {
      type: String,
      require:true
    },
    winPercentageByDistance: {
      type:String
    },
    totalPlacePercentage: {
      type: String,
      require:true
    },
    placePercentageByDistance: {
      type:String
    },
    oddsByDisatnce: {
      type:String
    }
  }],
  openGates: {
      type:String,
      require:true
  },
  oldIds: [{
    type:Number    
  }]
}, {strict:false});

const RaceModel = mongoose.model('races', Race);

export default RaceModel;