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
        Gifts.find({...language}).populate('owner')
        .then(gifts => {
            console.log('API Gifts get all Gifts as ADMIN or MODERATOR')
            console.log(gifts);
            return res.json({gifts})
        })
    }
    else if (payload && payload.id)
    {
        Gifts.find({$or:[{ visibility: VISIBILITY.LoggedIn }, {visibility: VISIBILITY.Owner }] }).populate('owner')
        .then(gifts => {
            console.log('API Gifts get all Gifts as CUSTOMER')
            return res.json(formatter.formatGiftByMember(gifts))
         })
    }
});

router.post('/', auth.required, async (req, res, next) => {
    const { payload: { id, role } } = req;
    const { body: { gifts } } = req;
    try {
        const finalGifts = gifts.map(gift => {
            return new Gifts({
                ...gift,
                owner: id,
            })
        })
        const data = await Gifts.collection.insertMany(finalGifts);
        res.json({gifts: data})
    }
    catch(error) {
        console.log("Couldn't save Gifts");
        console.log(error);
        return res.sendStatus(400);
    };
});

router.patch('/:giftId', auth.required, async (req, res, next) => {
    try {
        const { payload: { id, role } } = req;
        const { body: {gift} } = req;
        const giftId = req.params.giftId;

        // if (id !== giftId && !(role === ROLES.Admin))
        //     return res.status(401).send({status: 401, message: "User is not allowed to modify other's gift"});
            
        const giftUpdates = formatter.formatGiftUpdates(gift);

        const w = await Gifts.findByIdAndUpdate(giftId, giftUpdates, {new: true})
        return res.status(200).send({status:200, message: w})
    } catch (error) {
        console.log("Couldn't update gift");
        console.log(error);
        return res.status(500).send({status: 500, message: error});
    }
});

module.exports = router;