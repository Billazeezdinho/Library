const User = require('../models/user');

//register a user with email, username and password
exports.createUser = async (req, res) =>{
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({where : {email: email.toLowerCase()}});
        if(userExists){
            return res.status(400).json({
                message: 'Email already exist'
            })
        }
        const newUser = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password
        });
        res.status(201).json({
            message: 'User Created Successfully',
            data: newUser
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error'
        })
        
    }
}

//user Logins with their register email and password
exports.userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({where: {username: username.toLowerCase() }})

        //check if user is registered
        if(!user){
            return res.status(404).json({
                message: 'user not found'
            })
        }
        //check if password match
        if(!password){
            return res.status(400).json({
                message: 'password is Incorrect'
            });
        }
        // successful Logins
        res.status(200).json({
            message: 'User succesfully Logged in',
            data: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Internal Server Error'
        })
        
    }
}

//delete a user
exports.deleteUser = async (req, res) => {
    try {
         const { username } = req.body;
         const user = await User.findOne({where: {username}})
         
         //check if user does not exist
         if(!user){
            return res.status(400).json({
                message: 'User Not Found'
            });

         }else{
            await User.destroy({where: {username: username}});
            res.status(200).json({
                message: 'User Deleted Successfully',
            
            });
         }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}