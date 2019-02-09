require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const email = require('./emailController');
const authCtrl = require('./authController');
const earthCtrl = require('./earthApiController');
const materialCtrl = require('./materialsController');
const newsCtrl = require('./newsFeed.controller');
const userCtrl = require('./userController');



const app = express();
const { PORT, CONNECTION_STRING, SECRET } = process.env

// TOP LEVEL MIDDLEWARE
app.use(express.static(`${__dirname}/../build`))
app.use(express.json());
app.use(session({
    secret: SECRET,
    resave: true,
    saveUninitialized: false
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    app.listen(PORT, () => {
        console.log('running on port: ' + PORT)
    })
})


//USER AUTH ENDPOINTS
app.post('/auth/register', authCtrl.register);
app.post('/auth/register-company', authCtrl.registerCompany);
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout);
app.get('/api/users', authCtrl.getUsers);
app.get('/auth/user', authCtrl.getUser)

//RETREIVE MATERIAL CATEGORIES
app.get('/api/materials', materialCtrl.getAllMaterials);
app.get('/api/material', materialCtrl.getMaterial);

//USER SAVED AND RETRIEVE ENDPOINTS
app.post('/api/articles', userCtrl.saveArticle);
app.get('/api/articles', userCtrl.getArticles);
app.delete('/api/articles:id/', userCtrl.deleteArticle);
app.post('/api/location', userCtrl.saveLocation);
app.delete('/api/locations:id', userCtrl.deleteLocation);
app.get('/api/locations:id', userCtrl.getLocations);
app.get('/api/collection', userCtrl.getCollection);
app.get('/api/companies', userCtrl.getCompanies);

//ADMIN ENDPOINTS
app.put('/api/prices', materialCtrl.updatePrices);

//EARTH 911 API ENDPOINTS
app.get("/api/getMaterials", earthCtrl.getMaterials)
app.get("/api/getFamilies", earthCtrl.getFamilies)
app.get("/api/getLocations", earthCtrl.getLocations)
app.get('/api/locationDetails', earthCtrl.getLocationDetails);
app.get('/api/getPrograms', earthCtrl.getPrograms);
app.get('/api/getProgramDetails', earthCtrl.getProgramDetails);

//RSS FEED ENDPOINT
app.get('/api/news', newsCtrl.getNews);
app.get('/api/newsToday', newsCtrl.getNewsToday)

//EMAIL ENDPOINTS
app.post('/api/email', email.sendEmail);

