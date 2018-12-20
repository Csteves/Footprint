module.exports = {
    updatePrices: async (req,res) =>{
        // priceChange is a bool that determines if change was postitve or neg, true=pos.
        let {newPrice,name} = req.body;
        let db = req.app.get('db');
        let result = await db.get_current_price([name]);
        let currentPrice = result[0];
        let priceChange = Number(newPrice) >= Number(currentPrice.price);
        if(currentPrice){
            let result = await db.update_price([newPrice,priceChange,name]);
            let updated = result[0];
            return res.status(200).send({updatedPrice:updated.price,message:'Updated successfully'});
        }else{
            return res.status(200).send('Could not find material')
        }
    },
    getAllMaterials: async (req,res) => {
        let db = req.app.get('db');
        let results = await db.get_all_materials();
        if(results[0]){
            return res.status(200).send(results)
        }else{
            return res.status(200).send("Could not retrieve materials list")
        }
    },
    getMaterial: async (req,res) =>{
        let {id} = req.query
        let db = req.app.get('db');
        let results = await db.get_material([id]);
        let material = results[0];
        if(!material){
            return res.status(200).send("Unable to retreive material information");
        }else{
            return res.status(200).send(material)
        }
    }
}