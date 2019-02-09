const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        let { email, password, zip } = req.body;
        let { hasCompany } = req.body;
        let db = req.app.get('db');
        let results = await db.get_user([email]);
        let userExists = results[0];
        if (userExists) {
            return res.status(200).send({ message: 'Email already in use.' })
        } else {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            let results = await db.create_user([email, hash, zip, hasCompany]);
            let newUser = results[0];
            req.session.user = { email: newUser.email, id: newUser.id, isAdmin: newUser.is_admin,zip:newUser.zip_code};
            res.status(200).send({
                id: req.session.user.id,
                loggedIn: true,
                message: 'Successfully registered',
                isAdmin: req.session.user.isAdmin,
                zip_code: newUser.zip_code,
                hasCompany: newUser.has_company
            })
        }
    },
    registerCompany: async (req, res) => {
        const { id, title, address, city, state, zip, phone } = req.body;
        const mats = "todo";
        let db = req.app.get('db');
        let results = await db.get_company([id]);
        let companyExists = results[0];
        if (companyExists) {
            return res.status(200).send({ message: 'Company already listed' })
        } else {
            let results = await db.create_company([id, title, address, city, state, zip, phone, mats]);
            let company = results[0];
            res.status(200).send({ company, message: "Successfully Registered" });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const db = req.app.get('db');
        let result = await db.get_user([email]);
        let userExists = result[0];
        if (!userExists) {

            return res.status(200).send({ loggedIn: false, message: 'Email not found' });
        }
        let verified = bcrypt.compareSync(password, userExists.hash);
        if (verified) {
            req.session.user = { email: userExists.email, id: userExists.id, isAdmin: userExists.is_admin,zip:userExists.zip_code };
            if (!userExists.has_company) {
                return res.status(200).send({
                    id: req.session.user.id,
                    loggedIn: true,
                    message: 'Login Successful',
                    isAdmin: req.session.user.isAdmin,
                    zip_code: userExists.zip_code,
                    hasCompany: userExists.has_company
                });
            } else {
                let results = await db.get_company([userExists.id]);
                let company = results[0];
                return res.status(200).send({
                    id: req.session.user.id,
                    loggedIn: true,
                    message: 'Login Successful',
                    isAdmin: req.session.user.isAdmin,
                    zip_code: userExists.zip_code,
                    hasCompany: userExists.has_company,
                    company
                });
            }
        } else {
            console.log('hello')
            return res.status(200).send({ loggedIn: false, message: 'Incorrect password' });
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.status(200).send({ loggedIn: false, message: 'Logout successful' });
    },
    getUsers: async (req, res) => {
        const db = req.app.get('db');
        let result = await db.get_emails();

        if (result.length) {
            res.status(200).send(result)
        } else {
            res.status(200).send({ message: 'Unable to fetch user emails' })
        }
    },
    getUser: async (req, res) => {
        if (!req.session.user) {
            return res.status(200).send({ message: 'Not logged in!' });
        }
        const email = req.session.user.email;
        const db = req.app.get('db');
        const user = await db.get_user([email]);
        const userExists = user[0]
        if (!userExists) {
            return res.status(200).send({ message: 'Cannot find User.' });
        }
        req.session.user = { email: userExists.email, id: userExists.id, isAdmin: userExists.is_admin,zip:userExists.zip_code };
        return res.status(200).send({
            id:req.session.user.id,
            isAdmin:req.session.user.isAdmin,
            loggedIn:true,
            zip_code:req.session.user.zip
        })
    }
}