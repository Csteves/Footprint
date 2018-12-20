module.exports = {
    saveArticle: async (req,res)=>{
        let {id,title,link,pubDate} = req.body;
        console.log('body',req.body)
        let db = req.app.get('db');
        //pubDate wil be stored in column content
        let results = await db.save_article([id,title,link,pubDate]) ;
        if(results[0]){
            let articles = await db.get_users_articles([id]);
            return res.status(200).send({message:"Save Sucessful",usersArticles:articles});
        }else{
            return res.status(200).send('Save Unsucessful')
        }
    },
    getArticles: async (req,res) =>{
        let {id} = req.query;
        let db = req.app.get('db');
        let results = await db.get_users_articles([id]);
        if(results[0]){
            return res.status(200).send(results);
        }else{
            res.status(200).send("Could not fetch articles");
        }
    },
    deleteArticle: async (req,res) => {
        let {id} = req.params;
        let {title} = req.query;
        let db = req.app.get('db');
        let del = await db.delete_article([id,title]);
        console.log(del);
        let results = await db.get_users_articles([id]);
        if(results[0]){
            return res.status(200).send(results);
        }else{
            res.status(200).send("Could not fetch articles");
        }


    }
}