const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req,res) =>{
        let {email, password, zip} = req.body;
        let db = req.app.get('db');
        let results = await db.get_user([email]);
        let userExists = results[0];
        if(userExists){
            return res.status(200).send('Email already in use.')
        }else{
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password,salt);
            console.log("hash",hash);
            let results = await db.create_user([email,hash,zip]);
            let newUser = results[0];
            req.session.user = {email: newUser.email, id: newUser.id, isAdmin:newUser.is_admin};
            console.log(req.session.user)
            res.status(200).send({
                id:req.session.user.id,
                loggedIn:true,
                message:'Successful',
                isAdmin:req.session.user.isAdmin,
                zip_code:newUser.zip_code
            })
        }
    },

    login: async (req,res) =>{
        const {email, password} = req.body;
        const db = req.app.get('db');
        let result = await db.get_user([email]);
        let userExists = result[0];
        if(!userExists){
            return res.status(200).send({loggedIn:false, message:'Email not found'});
        }
        let verified = bcrypt.compareSync(password,userExists.hash);
        if(verified){
            req.session.user = {email:userExists.email, id: userExists.id, isAdmin:userExists.is_admin};
            return res.status(200).send({
                id:req.session.user.id,
                loggedIn:true,
                message: 'Login Successful',
                isAdmin:req.session.user.isAdmin,
                zip_code:userExists.zip_code
            });
        }else{
            return res.status(401).send({loggedIn:false, message:'Incorrect password'});
        }
    },
    logout: (req,res)=>{
        req.session.destroy();
        return res.status(200).send({loggedIn:false, message:'Logout successful'});
    }
}