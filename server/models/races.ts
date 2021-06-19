import mongoose, { Schema } from "mongoose";

const Race = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    distance: {
      type: Number,
      require: true
    },
    startTime: {
      type: String,
      require: true
    },
    horses: [{
      name: {
        type: String,
        require: true,
      },
      distance: {
        type: Number,
        require: true,
      },
      startTime: {
        type: String,
        require: true,
      },
      horses: [
        {
          name: {
            type: String,
            require: true,
          },
          zedId: {
            type: Number,
            require: true,
          },
          totalRaces: {
            type: String,
            require: true,
          },
          totalWinPercentage: {
            type: String,
            require: true,
          },
          winPercentageByDistance: {
            type: String,
          },
          totalPlacePercentage: {
            type: String,
            require: true,
          },
          placePercentageByDistance: {
            type: String,
          },
          oddsByDisatnce: {
            type: String,
          },
        },
      ],
      openGates: {
        type: String,
        require: true
      },
      winPercentageByDistance: {
        "1000m": { type: String, default: '??' },
        "1200m": { type: String, default: '??' },
        "1400m": { type: String, default: '??' },
        "1600m": { type: String, default: '??' },
        "1800m": { type: String, default: '??' },
        "2000m": { type: String, default: '??' },
        "2200m": { type: String, default: '??' },
        "2400m": { type: String, default: '??' },
        "2600m": { type: String, default: '??' },
      },
      totalPlacePercentage: {
        type: String,
        require: true
      },
      placePercentageByDistance: {
        "1000m": { type: String, default: '??' },
        "1200m": { type: String, default: '??' },
        "1400m": { type: String, default: '??' },
        "1600m": { type: String, default: '??' },
        "1800m": { type: String, default: '??' },
        "2000m": { type: String, default: '??' },
        "2200m": { type: String, default: '??' },
        "2400m": { type: String, default: '??' },
        "2600m": { type: String, default: '??' },
      },
      oddsByDisatnce: {
        "1000m": { type: String, default: '??' },
        "1200m": { type: String, default: '??' },
        "1400m": { type: String, default: '??' },
        "1600m": { type: String, default: '??' },
        "1800m": { type: String, default: '??' },
        "2000m": { type: String, default: '??' },
        "2200m": { type: String, default: '??' },
        "2400m": { type: String, default: '??' },
        "2600m": { type: String, default: '??' },
      }
    }],
    openGates: {
      type: String,
      require: true
    }
  }
);

const RaceModel = mongoose.model("races", Race);

export default RaceModel;
