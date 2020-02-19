import User from '../model/user';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email
        })
        if (!user) {
            throw new Error('No User Found!!!');
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return res.status(500).send(err);
            };
            if (!isMatch) return res.status(400).json({
                message: 'Wrong Password'
            });
            res.status(200).send('Logged in Successfully');
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const search = async (req, res) => {
    try{
        const user = new User(
            req.body
        );
        user.save((err,response)=>{
            if(err) res.status(400).send(err)
            res.status(200).send(response)
        })
    }catch(error){
        res.status(500).send({
            message: error.message
        })
    }
}

export const find = async (req,res) => {
    try{
        console.log(User);
        User.find({}, function(err, data){
        if(err) res.send(err);
        res.send(data);
        });
    }catch(error){
        res.status(500).send({
            message: error.message
        })
    }
}
