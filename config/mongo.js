/* 
Tal Yehuda 315006031
Oran Mor 318854338
*/


const mongoose = require('mongoose');
const User = require('../models/user')
const costs = require('../models/cost')

const user = new User({
    id: '123123',
    first_name: 'moshe',
    last_name: 'israeli',
    birthday: new Date('January 10, 1990'),
});

const cost = new costs({
    id: '777',
    user_id: '123123',
    year:2022,
    month:1,
    day:12,
    Category:'food',
    sum:12.77,
    description:'KFC'
})
const cost1 = new costs({
    id: '777',
    user_id: '123123',
    year:2022,
    month:1,
    day:12,
    Category:'food',
    sum:15.77,
    description:'KFC'
})
const cost2 = new costs({
    id: '777',
    user_id: '123123',
    year:2022,
    month:1,
    day:5,
    Category:'food',
    sum:13.77,
    description:'KFC'
})

async function createCosts(cost) {
    const currentCost = await costs.findOne({id: cost.id})
    if (currentCost === null ) {
        const newCost = costs.create(cost)
        return newCost;
    }
}


async function createUser(user) {
    const currentUser = await User.findOne({id: user.id})
    if (currentUser === null ) {
        const newUser = User.create(user)
        return newUser;
    }
}

const connectDB = async () => {
    try {
        const url = process.env.DATABASE_URL;
        console.log(url);
        mongoose.set("strictQuery",false);
        const connection = await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        createUser(user);

    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;