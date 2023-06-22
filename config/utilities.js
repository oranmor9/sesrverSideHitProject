/* 
Tal Yehuda 315006031
Oran Mor 318854338
*/

const User = require('../models/user');
const categories = ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'];
const report = require('../models/report')

    
async function getUserById(id) {
    try {
        const user = await User.findOne({ id });
        return user;
      } catch (error) {
        console.log('User not found', error);
      }
    }

async function getReport (year,month,user_id) {

    try {
        const userCosts = await report.find({
            user_id,
            month,
            year
        });
        console.log(userCosts);
    
      const newReport = categories.reduce((result, category) => {
        result[category] = userCosts
            .filter(userCosts => userCosts.category === category)
            .map(userCosts => ({
                day: userCosts.day,
                description: userCosts.description,
                sum: userCosts.overallSum
            }));
        return result;
            }, {});

    if (newReport) {
        return newReport;
    }} 
    catch (err) {
        console.error(err)
    }
};


const userDateValidation = (year, month, day) => {
    const date = new Date();
    if (!year) {
        year = date.getFullYear();
    }
    if (!month) {
        month = date.getMonth() + 1;
    }
    if (!day) {
        day = date.getDate();
    }

    return { year, month, day };
};

const isDayValid = (day) => Number(day) > 0 && Number(day) <= 31;
const isMonthValid = (month) => Number(month) > 0 && Number(month) <= 12;
const isYearValid = (year) => Number(year) >= 1;
const isDateValid = (day, month, year) => isDayValid(day) && isMonthValid(month) && isYearValid(year);



module.exports = { getUserById,getReport,userDateValidation,isDateValid,isDayValid,isMonthValid,isYearValid };
