module.exports = {
    saveArticle: async (req, res) => {
        let { id, title, link, pubDate } = req.body;
        let db = req.app.get('db');
        //pubDate wil be stored in column content
        let results = await db.save_article([id, title, link, pubDate]);
        if (results[0]) {
            let articles = await db.get_user_articles([id]);
            return res.status(200).send({ message: "Save Sucessful", usersArticles: articles });
        } else {
            return res.status(200).send({ message: 'Save Unsucessful' })
        }
    },
    getArticles: async (req, res) => {
        let { id } = req.query;
        let db = req.app.get('db');
        let results = await db.get_user_articles([id]);
        return res.status(200).send(results);

    },
    deleteArticle: async (req, res) => {
        let { id } = req.params;
        let { article_id } = req.query;
        let db = req.app.get('db');
        let del = await db.delete_article([id, article_id]);
        let results = await db.get_user_articles([id]);
        return res.status(200).send(results);
    },
    saveLocation: async (req, res) => {
        let { description, materials, phone, city, address, province, postal_code } = req.body.details;
        let { id, distance } = req.body;
        let idArr = [];
        materials.forEach(item => {
            idArr.push(item.material_id);
        })
        let idStr = idArr.join(",")
        let db = req.app.get('db');
        let results = await db.save_location([description, idStr, phone, city, address, province, postal_code, id, distance])
        let locations = await db.get_user_locations([id]);
        if (locations.length) {
            return res.status(200).send({ message: "Save Sucessful", usersLocations: locations });
        } else {
            return res.status(200).send('Save Unsucessful')
        }
    },
    deleteLocation: async (req, res) => {
        let { id } = req.params;
        let { locationId } = req.query;
        let db = req.app.get('db');
        let del = await db.delete_location([id, locationId]);
        let results = await db.get_user_locations([id]);
        return res.status(200).send(results);
    },
    getLocations: async (req, res) => {
        let { id } = req.query;
        let db = req.app.get('db');
        let results = await db.get_user_locations([id]);
        return res.status(200).send(results);
    },
    getCollection: async (req, res) => {
        let { id } = req.query;
        let db = req.app.get('db');
        let resultsArt = await db.get_user_collection_art([id]);
        let resultsLoc = await db.get_user_locations([id]);
        return res.status(200).send({ articles: resultsArt, locations: resultsLoc });
    },
    getCompanies: async (req, res) => {
        let db = req.app.get('db');
        let results = await db.getCompanies();
        return res.status(200).send(results)
    }

}