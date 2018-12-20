require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');


const authCtrl = require('./authController');
const earthCtrl = require('./earthApiController');
const materialCtrl = require('./materialsController');
const newsCtrl = require('./newsFeed.controller');
const userCtrl = require('./userController');


const app = express();
const {PORT,CONNECTION_STRING,SECRET} = process.env

// TOP LEVEL MIDDLEWARE
app.use(express.json());
app.use(session({
    secret:SECRET,
    resave:true,
    saveUninitialized:false
}));

massive(CONNECTION_STRING).then(db =>{
    app.set('db',db);
    app.listen(PORT, ()=>{
        console.log('running on port: ' + PORT)
    })
})

//USER AUTH ENDPOINTS
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout',authCtrl.logout);

//RETREIVE MATERIAL CATEGORIES
app.get('/api/materials', materialCtrl.getAllMaterials);
app.get('/api/material', materialCtrl.getMaterial);

//USER SAVED AND RETRIEVE ENDPOINTS
app.post('/api/articles', userCtrl.saveArticle);
app.get('/api/articles', userCtrl.getArticles);
app.delete('/api/articles:id/', userCtrl.deleteArticle);

//ADMIN ENDPOINTS
app.put('/api/prices', materialCtrl.updatePrices);

//EARTH 911 API ENDPOINTS
app.get("/api/get", earthCtrl.getMaterials)

//RSS FEED ENDPOINT
app.get('/api/news',newsCtrl.getNews )
