const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { render } = require('ejs');
const env = require('../../../config/environment')
// to create the JWT token and send it back with an JSON response.
module.exports.createSession = async function(req,res){
    
    try {
        let user = await User.findOne({email :  req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422,{
                message : 'Invalid username/password'
            })
        }
        return res.json(200,{
            message : 'SignIn successfull, her is the token',
            data : {
                JwtToken : jwt.sign(user.toJSON(),env.jwt_key,{expiresIn: '100000'})
            }
        })

    } catch (error) {
        console.log('******', error);
        return res.json(500).json({
            message : 'Internal Server Error'
        })
    }

    

}