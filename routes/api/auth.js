const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.post('/',(req, res)=>{
    const {email, password} = req.body;
    
    if(!email || !password) 
        return res.status(400).json('Please enter all fields');
        
    User.findOne({email})
        .then(user=>{
            if(!user) return res.status(400).json('User Does not exist');

           bcrypt.compare(password, user.password)
           .then(isMatch => {
               if(!isMatch) return res.status(400).json('Invalid credentials')

               jwt.sign(
                {id:user.id}, 
                config.get('jwtSecret'), 
                {expiresIn:3600},
                (err, token) => {
                
                if(err) throw err;
                
                res.json({
                    token,
                    user:{
                        name:user.name,
                        email:user.email,
                        id: user.id
                    }
                });
            })

           })
        })
} );

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user=> res.json({
            token:user.token,
            user:{
                name:user.name,
                email:user.email,
                id: user.id
            }
        }));
});
module.exports = router;