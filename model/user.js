const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let salt = 10;

const userSchema = mongoose.Schema({
    email:{
        type: String,
        // required: true,
        // unique: 1,
        // trim: true
    },
    password:{
        type: String,
        // required: true,
        // minlength: 6
    }
});

userSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(salt,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }
    else{
        next();
    }
})

userSchema.methods.comparePassword = function(candididatePassword, checkPassword){
    bcrypt.compare(candididatePassword, this.password, function(err,isMatch){
        if(err) return checkPassword(err)
        checkPassword(null,isMatch)
    })
}


const User = mongoose.model('User',userSchema);
module.exports = { User }