const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../model/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public

router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route   POST api/items
// @desc    Create an item
// @access  Public

router.post('/', (req, res) => {

    // Call http request to get real-time stock price

    const https = require('https');

    const options = {
        hostname: 'financialmodelingprep.com',
        port: 443,
        path: `/api/v3/stock/real-time-price/${req.body.name}`,
        method: 'GET'
    };

    const price_req = https.request(options, (res_) => {
    let data = ""
    res_.on('data', (d) => {
        data += d;
    });
    res_.on('end', () => {
        price_val = JSON.parse(data);
        const newItem = new Item({
            name: req.body.name,
            amount: req.body.amount,
            price: price_val.price
        });
    
        newItem.save().then(item => res.json(item));
        });
    });

    price_req.on('error', (error) => {
    console.error(error)
    })

    price_req.end()
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Public

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))

});


module.exports = router