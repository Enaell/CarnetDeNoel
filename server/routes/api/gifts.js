const mongoose = require('mongoose');
const auth = require('../auth');
const Gifts = mongoose.model('Gifts');
const Users = mongoose.model('Users');
const router = require('express').Router();
const formatter = require('../utils');
const { VISIBILITY, ROLES } = require('../../models/utils');

const db = getFirestore();

router.get('/', auth.optional, (req, res, next) => {
    const {payload} = req;

    if (payload && payload.id && payload.role === ROLES.Admin)
    {
        Gifts.find({...language})
        .then(gifts => {
            console.log('API Gifts get all Gifts as ADMIN or MODERATOR')
            console.log(gifts);
            return res.json({gifts})
        })
    }
    else if (payload && payload.id)
    {
        try {
            const gifts = await db.collection('gifts').get();
            return res.json(formatter.formatGiftByMember(gifts))
        } catch (error){
            console.log(error);
            return res.status(500).send({status: 500, message: 'Couldnt get gifts'});
        }
    }
});

router.post('/collection', auth.required, async (req, res, next) => {
    const { payload: { id, role } } = req;
    const { body: { gifts } } = req;

    const fGifts = Object.keys(gifts).map(key => gifts[key]).flat()
    console.log(fGifts);

    try {
        const finalGifts = fGifts.map(gift => {
            return new Gifts({
                ...gift,
            })
        })
        const data = await Gifts.collection.insertMany(finalGifts);
        return res.json({gifts: data})
    }
    catch(error) {
        console.log("Couldn't save Gifts");
        console.log(error);
        return res.sendStatus(400);
    };
});

router.post('/', auth.required, async (req, res, next) => {
    const { payload: { id, role } } = req;
    const { body: { gifts } } = req;

    try {
        console.log(gifts)
        const user = await Users.findById(id);        

        if(!gifts || gifts.length === 0 || !gifts[0].name) 
            return res.status(500).send({status: 500, message: 'Gift must have name'});

        const finalGifts = gifts.map(gift => {
            return new Gifts({
                ...gift,
                owner: user.username,
            })
        })
        const data = await Gifts.collection.insertMany(finalGifts);
        return res.json({gifts: data})
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
        
        if(!gift || !gift.name) 
            return res.status(500).send({status: 500, message: 'Gift must have name'});
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

router.delete('/:giftId', auth.required, async (req, res, next) => {
    try {
        const { payload: { id, role } } = req;
        const giftId = req.params.giftId;

        await Gifts.findByIdAndDelete(giftId);
        return res.status(200).send({status: 200, message: `wordList ${giftId} deleted`});
    
    } catch (error) {
        console.log("Couldn't delete gift");
        console.log(error);
        return res.status(500).send({status: 500, message: error});
    }
})

module.exports = router;