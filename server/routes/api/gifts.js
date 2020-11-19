const mongoose = require('mongoose');
const auth = require('../auth');
const Gifts = mongoose.model('Gifts');
const Users = mongoose.model('Users');
const router = require('express').Router();
const formatter = require('../utils');
const { VISIBILITY, ROLES } = require('../../models/utils');

router.get('/', auth.optional, (req, res, next) => {
    const {payload} = req;

    if (payload && payload.id && payload.role === ROLES.Admin)
    {
        Gifts.find({...language})
        .then(Gifts => {
            console.log('API Gifts get all Gifts as ADMIN or MODERATOR')
            console.log(Gifts);
            return res.json({Gifts})
        })
    }
    else if (payload && payload.id)
    {
        Gifts.find({$or:[{ visibility: VISIBILITY.LoggedIn }, {visibility: VISIBILITY.Owner }] })
        .then(Gifts => {
            console.log('API Gifts get all Gifts as CUSTOMER')
            console.log(Gifts);
            return res.json({Gifts})
         })
    }
});

router.post('/', auth.required, async (req, res, next) => {
    const { payload: { id, role } } = req;
    const { body: { Gifts } } = req;

    try {
        const finalGifts = Gifts.map(gift => {
            return new Gifts({
                ...gift,
                owner: id,
            })
        })
        const data = await Gifts.collection.insertMany(finalGifts);
        res.json({Gifts: data})
    }
    catch(error) {
        console.log("Couldn't save Gifts");
        console.log(error);
        return res.sendStatus(400);
    };
});

router.patch('/', auth.required, async (req, res, next) => {
    try {
        const { payload: { id, role } } = req;
        const { body: {gift} } = req;
        
        const owner = await Users.findOne({username: gift.owner})
        if (owner._id !== id && !(role === ROLES.Admin))
            return res.status(401).send({status: 401, message: "User is not allowed to modify other's gift"});
        
            
        const giftUpdates = formatter.formatGiftUpdates(gift);

        const w = await Gifts.findByIdAndUpdate(gift.id, giftUpdates, {new: true})

        return res.status(200).send({status:200, message: w})
    } catch (error) {
        console.log("Couldn't update gift");
        console.log(error);
        return res.status(500).send({status: 500, message: error});
    }
});

module.exports = router;