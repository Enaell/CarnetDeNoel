const mongoose = require('mongoose');
const auth = require('../auth');
const Gifts = mongoose.model('Gifts');
const Users = mongoose.model('Users');
const router = require('express').Router();
const formatter = require('../utils');
const { VISIBILITY, ROLES } = require('../../models/utils');
const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

router.get('/', auth.optional, async (req, res, next) => {
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
            let gifts = []
            const snapshot = await db.collection('gifts').get();
            snapshot.forEach((doc) => {
                gifts = [...gifts, doc.data()];
              });

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
            return {
                ...gift,
                owner: user.username,
                _id: gift.name,
            }});
        // const data = await Gifts.collection.insertMany(finalGifts);
        const docRef = db.collection('gifts').doc(finalGifts[0].name);
        await docRef.set(finalGifts[0]);

        return res.json({gifts: {}})
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

        const docRef = db.collection('gifts').doc(giftId);
        await docRef.update(giftUpdates);

        // const w = await Gifts.findByIdAndUpdate(giftId, giftUpdates, {new: true})
        
        return res.status(200).send({status:200, message: giftUpdates})
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

        // await Gifts.findByIdAndDelete(giftId);
        const deleteGift = await db.collection('gifts').doc(giftId).delete();
        return res.status(200).send({status: 200, message: `wordList ${giftId} deleted`});
    
    } catch (error) {
        console.log("Couldn't delete gift");
        console.log(error);
        return res.status(500).send({status: 500, message: error});
    }
})

module.exports = router;