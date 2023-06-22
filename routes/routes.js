/* 
Tal Yehuda 315006031
Oran Mor 318854338
*/

const express = require('express');
const { getUserById,getReport,userDateValidation,isDateValid} = require('../config/utilities');
const user = require('../models/user');
const router = express.Router();
const userUTL = require('../config/utilities');
const Cost = require('../models/cost');
const bodyParser = require('body-parser');
const changeMonthFormat = (month) => {
    const monthPrefix = '0';
    return (typeof month !== 'string' && month < 10 || month.length < 2) ? monthPrefix.concat('', month) : month;
}


//Addcost -->
router.post('/addcost', async (req, res) => {

        const { description, category, sum, user_id } = req.body;
        let { day, month, year } = req.body;
        
    
        const user = await getUserById(user_id);
        console.log(user);
    
        
        const currentDate = userDateValidation(year, month, day);
        if (!year) {
            year = currentDate.year;
        }
        if (!month) {
            month = currentDate.month;
        }
        if (!day) {
            day = currentDate.day;
        }
        console.log('after check');
        if (user) {

            if (isDateValid(day, month, year)) {
                try {
                    
                    const fixedMonth = changeMonthFormat(month);
                    
                    const cost = new Cost({
                        description,
                        year,
                        month: fixedMonth,
                        day,
                        category,
                        sum,
                        user_id,
                    });

                    const result = await cost.save();

                    return res.status(200).json({ success: true, result });
                } catch (e) {
                    return res.status(400).send({error: e.message});
                }
            } else {
                return res.status(400).send({ error: 'Invalid date' });
            }
        } else {
            return res.status(401).json({ success: false, message: 'user_id' });
        }

})

//About -->
router.get('/about', (req, res) => {
    const developersJson = [
        {
            'first_name': 'Oran',
            'last_name': 'Mor',
            'id': '318854338',
            'email': 'oranmor9@gmail.com'
        },
        {
            'first_name': 'Tal',
            'last_name': 'Yehuda',
            'id': '315006031',
            'email': 'talyehuda27@gmail.com'
        }
    ];
    res.json(developersJson);
});

//Report -->
router.get('/report',async function (req, res) {
    //const test = await userUTL.getUserById(123123);

    const { year, user_id, month } = req.query;

    if (!year) {
        return res.status(400).send('Year error');
    }
    if (!month) {
        return res.status(400).send('Month error');
    }
    if(!user_id) {
        return res.status(400).send('User_id error');

    }

    const resultJson = await getReport(year,month,user_id);
    if (resultJson){
        return res.status(200).json(resultJson);
    }
    else {
        return res.status(400);
    }
    });



module.exports = router;

