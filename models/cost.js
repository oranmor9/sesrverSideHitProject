/* 
Tal Yehuda 315006031
Oran Mor 318854338
*/


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Report = require("./report"); // Replace with the correct path to your report model file

const idCounterSchema = new Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 1 }
});

const IdCounter = mongoose.model("IdCounter", idCounterSchema);

const costsSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  user_id: {
    type: String,
    required: [true, 'No user id']
  },
  year: {
    type: Number,
    required: [true, 'Please enter year']
  },
  month: {
    type: Number,
    required: [true, 'Please enter month']
  },
  day: {
    type: Number,
    required: [true, 'Please enter day']
  },
  category: {
    type: String,
    required: [true, 'Please enter category'],
    enum: process.env.CATEGORIES_ALLOWED_VALUES.split(',')
  },
  sum: {
    type: Number,
    required: [true, 'Please enter sum']
  },
  description: {
    type: String,
    required: [true, 'Please enter description']
  }
});

costsSchema.pre("save", async function (next) {
  const doc = this;
  try {
    const counter = await IdCounter.findOneAndUpdate(
      { _id: "costId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    ).lean();
    doc.id = counter.sequence_value;
    next();
  } catch (error) {
    next(error);
  }
});

costsSchema.post("save", async function (doc) {
  try {
    const aggregateResult = await this.model("Cost").aggregate([
      {
        $match: { _id: doc._id }
      },
      {
        $group: {
          _id: {
            user_id: "$user_id",
            year: "$year",
            month: "$month",
            day: "$day",
            category: "$category",
            description: "$description"
          },
          overallSum: { $sum: "$sum" }
        }
      }
    ]);

    const reportData = {
      user_id: doc.user_id,
      year: doc.year,
      month: doc.month,
      day: doc.day,
      category: doc.category,
      description: doc.description,
      overallSum: aggregateResult[0].overallSum
    };

    await Report.findOneAndUpdate(
      {
        user_id: doc.user_id,
        year: doc.year,
        month: doc.month,
        day: doc.day,
        category: doc.category,
        description: doc.description
      },
      { $inc: { overallSum: doc.sum } }, // Increment the overallSum by the current document's sum value
      { upsert: true, new: true }
    );
  } catch (error) {
    console.log("Error updating or creating report:", error);
  }
});

module.exports = mongoose.model("Cost", costsSchema);
