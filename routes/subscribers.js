const express = require('express');
const { successCode, clientErr, serverError } = require('../constants/constant_http_code');
const router = express.Router();
const Subscriber = require('../models/subscriber')
require('../constants/constant_http_code');


router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json({data: subscribers, total: subscribers.length});
    } catch (err) {
        res.status(errorCode).json({message: err.message});
    }
});


router.get('/:id', async(req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(clientErr).json({message: 'Cannot find subscriber'});
        }
        return res.status(successCode).json(subscriber);
    } catch (err) {
        return res.status(serverError).json({message: err.message});
    }
});

router.post('/', async (req, res) => {
    const { name, subscribedToChannel } = req.body;
    const subscriber = new Subscriber({
        name,
        subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save();
        res.status(successCode).json(newSubscriber);
    } catch (err) {
        res.status(serverError).json({message: err.message});
    }
});

router.patch('/', (req, res) => {

});

router.delete('/:id', async (req, res) => {
   
});

module.exports = router;