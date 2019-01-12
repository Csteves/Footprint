module.exports = {
    saveArticle: async (req,res)=>{
        let {id,title,link,pubDate} = req.body;
        let db = req.app.get('db');
        //pubDate wil be stored in column content
        let results = await db.save_article([id,title,link,pubDate]) ;
        if(results[0]){
            let articles = await db.get_user_articles([id]);
            return res.status(200).send({message:"Save Sucessful",usersArticles:articles});
        }else{
            return res.status(200).send({message:'Save Unsucessful'})
        }
    },
    getArticles: async (req,res) =>{
        let {id} = req.query;
        let db = req.app.get('db');
        let results = await db.get_user_articles([id]);
        return res.status(200).send(results);

    },
    deleteArticle: async (req,res) => {
        let {id} = req.params;
        let {article_id} = req.query;
        console.log('article_id',article_id);
        let db = req.app.get('db');
        let del = await db.delete_article([id,article_id]);
        console.log('delete',del);
        let results = await db.get_user_articles([id]);
         return res.status(200).send(results);
    },
    saveLocation: async(req,res)=>{
        let {description,materials,phone,city,address,province,postal_code} = req.body.details;
        let {id,distance} = req.body;
        console.log(distance)
        console.log("id",id)
        console.log(req.body.id)
        let idArr = [];
        materials.forEach(item =>{
            idArr.push(item.material_id);
        })
        let idStr = idArr.join(",")
        let db = req.app.get('db');
        let results = await db.save_location([description,idStr,phone,city,address,province,postal_code,id,distance])
        let locations = await db.get_user_locations([id]);
        console.log(locations)
        if(locations.length){
            return res.status(200).send({message:"Save Sucessful",usersLocations:locations});
        }else{
            return res.status(200).send('Save Unsucessful')
        }
    },
    deleteLocation: async (req,res)=>{
        let {id} = req.params;
        console.log(req.params)
        console.log('id',id)
        let {locationId} = req.query;
        console.log('locationId',locationId);
        let db = req.app.get('db');
        let del = await db.delete_location([id,locationId]);
        console.log('delete',del);
        let results = await db.get_user_locations([id]);
         return res.status(200).send(results);
    },
    getLocations: async (req, res)=>{
        let {id} = req.query;
        let db = req.app.get('db');
        let results = await db.get_user_locations([id]);
        return res.status(200).send(results);
    },
    getCollection: async (req,res) =>{
        let {id} = req.query;
        let db = req.app.get('db');
        let resultsArt = await db.get_user_collection_art([id]);
        let resultsLoc = await db.get_user_locations([id]);
        return res.status(200).send({articles:resultsArt,locations:resultsLoc});
    },
    getCompanies: async (req, res) =>{
        let db = req.app.get('db');
        let results = await db.getCompanies();
        return res.status(200).send(results)
    }

}