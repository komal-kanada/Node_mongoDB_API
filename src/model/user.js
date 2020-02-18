import { Schema, model } from 'mongoose';
import { genSalt, hash as _hash, compare } from 'bcrypt';
let salt = 10;

const userSchema = Schema({
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
        genSalt(salt,function(err,salt){
            if(err) return next(err);
            _hash(user.password,salt,function(err,hash){
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
    compare(candididatePassword, this.password, function(err,isMatch){
        if(err) return checkPassword(err)
        checkPassword(null,isMatch)
    })
}


const User = model('User',userSchema);
export default { User }