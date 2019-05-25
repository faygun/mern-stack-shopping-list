const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Item = require('../../models/Item');

router.get('/',(req, res)=>{
    Item.find()
    .sort({date:-1})
    .then(items=> res.json(items))
    .catch(err=> res.json(err));
} );


router.post('/', auth, (req, res)=>{
    const newItem = new Item({
        name : req.body.name
    });

    newItem.save()
    .then(item => res.json(item))
    .catch(err => res.json(err));
});

router.delete('/:id',(req, res)=>{
    Item.findById(req.params.id)
    .then(item=> item.remove().then(()=> res.json({status:true})))
    .catch(err=> res.status(404).json({status:false}));
});


module.exports = router;